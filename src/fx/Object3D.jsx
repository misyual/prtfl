import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/motion'

// Change this to: 'knot' | 'torus' | 'cube' | 'pill'
const SHAPE = 'knot'

// Click cycles through these tints
const PALETTE = [0xf0e9dc, 0xd9a85b, 0x9cc4ff, 0xff9fd2]

const SHAPES = {
  knot: (THREE) => new THREE.TorusKnotGeometry(0.95, 0.3, 220, 48, 2, 3),
  torus: (THREE) => new THREE.TorusGeometry(1, 0.42, 64, 160),
  pill: (THREE) => new THREE.CapsuleGeometry(0.7, 1.3, 32, 64),
  cube: (THREE) => {
    const g = new THREE.BoxGeometry(1.7, 1.7, 1.7, 40, 40, 40)
    const p = g.attributes.position
    const v = new THREE.Vector3()
    const s = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i)
      s.copy(v).normalize().multiplyScalar(1.25)
      v.lerp(s, 0.55) // blend between cube and sphere = rounded cube
      p.setXYZ(i, v.x, v.y, v.z)
    }
    return g
  },
}

export default function Object3D() {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()

  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => setWide(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || reduced || !wide) return undefined

    let disposed = false
    let renderer, scene, camera, group, mesh, particles, frame, envTexture, pmrem

    const start = async () => {
      const THREE = await import('three')
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
      const { mergeVertices } = await import('three/examples/jsm/utils/BufferGeometryUtils.js')
      if (disposed) return

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
      camera.position.z = 5

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      mount.appendChild(renderer.domElement)

      // Studio reflections
      pmrem = new THREE.PMREMGenerator(renderer)
      envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      scene.environment = envTexture

      group = new THREE.Group()
      scene.add(group)

      // Build the chosen shape, merge vertices so normals stay smooth
      let geometry = (SHAPES[SHAPE] || SHAPES.knot)(THREE)
      geometry.deleteAttribute('uv')
      geometry.deleteAttribute('normal')
      geometry = mergeVertices(geometry)
      geometry.computeVertexNormals()

      const position = geometry.attributes.position
      const normal = geometry.attributes.normal
      const count = position.count
      const bx = new Float32Array(count)
      const by = new Float32Array(count)
      const bz = new Float32Array(count)
      const nx = new Float32Array(count)
      const ny = new Float32Array(count)
      const nz = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        bx[i] = position.getX(i)
        by[i] = position.getY(i)
        bz[i] = position.getZ(i)
        nx[i] = normal.getX(i)
        ny[i] = normal.getY(i)
        nz[i] = normal.getZ(i)
      }

      const material = new THREE.MeshPhysicalMaterial({
        color: PALETTE[0],
        metalness: 1,
        roughness: 0.16,
        clearcoat: 0.7,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.2,
        iridescence: 1,
        iridescenceIOR: 1.5,
        iridescenceThicknessRange: [180, 720],
      })

      mesh = new THREE.Mesh(geometry, material)
      group.add(mesh)

      // Colored rim lights
      const lightA = new THREE.DirectionalLight(0x6aa8ff, 1.4)
      lightA.position.set(-4, 2, 3)
      scene.add(lightA)
      const lightB = new THREE.DirectionalLight(0xff6ab8, 1.2)
      lightB.position.set(4, -2, 2)
      scene.add(lightB)
      const lightC = new THREE.DirectionalLight(0xffffff, 0.6)
      lightC.position.set(3, 4, 5)
      scene.add(lightC)

      // Particle halo
      const PCOUNT = 450
      const pPos = new Float32Array(PCOUNT * 3)
      for (let i = 0; i < PCOUNT; i++) {
        const r = 2.3 + Math.random() * 1.6
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pPos[i * 3 + 2] = r * Math.cos(phi)
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const pMat = new THREE.PointsMaterial({
        color: 0xf2ece1,
        size: 0.028,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      })
      particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // ---------- Interaction state ----------
      const raycaster = new THREE.Raycaster()
      const ndc = new THREE.Vector2(9, 9)
      const pointerWin = { x: 0, y: 0 }
      const hitPos = new THREE.Vector3(0, 0, 2) // smoothed hover point (local space)
      const tmp = new THREE.Vector3()
      const targetColor = new THREE.Color(PALETTE[0])

      let hovering = false
      let hover = 0
      let dragging = false
      let dragDX = 0
      let dragDY = 0
      let lastX = 0
      let lastY = 0
      let velX = 0
      let velY = 0.25
      let colorIndex = 0
      let pulse = 0
      let cursor = ''
      const ripples = []

      const setCursor = (c) => {
        if (c !== cursor) {
          cursor = c
          mount.style.cursor = c
        }
      }

      const onPointerMove = (e) => {
        const rect = mount.getBoundingClientRect()
        ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        pointerWin.x = (e.clientX / window.innerWidth - 0.5) * 2
        pointerWin.y = (e.clientY / window.innerHeight - 0.5) * 2
        if (dragging) {
          dragDX += e.clientX - lastX
          dragDY += e.clientY - lastY
        }
        lastX = e.clientX
        lastY = e.clientY
      }

      const onPointerDown = (e) => {
        onPointerMove(e)
        if (!hovering) return
        dragging = true
        dragDX = 0
        dragDY = 0
        ripples.push({ x: hitPos.x, y: hitPos.y, z: hitPos.z, age: 0, amp: 0.22 })
        if (ripples.length > 4) ripples.shift()
        pulse = 1
        colorIndex = (colorIndex + 1) % PALETTE.length
        targetColor.set(PALETTE[colorIndex])
      }

      const onPointerUp = () => {
        dragging = false
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerdown', onPointerDown)
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)

      // ---------- Render loop ----------
      const clock = new THREE.Clock()
      let last = 0

      const render = () => {
        if (disposed) return
        const now = clock.getElapsedTime()
        const dt = Math.min(now - last, 0.05)
        last = now
        const t = now

        // Hover detection: ray against the actual shape
        const wasHovering = hover > 0.01
        hovering = false
        if (Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1) {
          scene.updateMatrixWorld()
          geometry.computeBoundingSphere()
          raycaster.setFromCamera(ndc, camera)
          const hits = raycaster.intersectObject(mesh, false)
          if (hits.length) {
            tmp.copy(hits[0].point)
            mesh.worldToLocal(tmp)
            hovering = true
            if (wasHovering) hitPos.lerp(tmp, 1 - Math.exp(-dt * 14))
            else hitPos.copy(tmp)
          }
        }
        hover += ((hovering ? 1 : 0) - hover) * (1 - Math.exp(-dt * (hovering ? 6 : 3)))
        setCursor(hovering ? (dragging ? 'grabbing' : 'grab') : '')

        // Ripples age
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i]
          r.age += dt
          r.amp = 0.22 * Math.exp(-r.age * 1.1)
          if (r.age > 4) ripples.splice(i, 1)
        }

        // Morph vertices along their normals
        const hx = hitPos.x
        const hy = hitPos.y
        const hz = hitPos.z
        const hoverOn = hover > 0.001
        for (let i = 0; i < count; i++) {
          const x = bx[i]
          const y = by[i]
          const z = bz[i]

          let d =
            0.045 * Math.sin(x * 2.6 + t * 0.7) +
            0.035 * Math.sin(y * 3.4 + t * 0.55) +
            0.03 * Math.sin(z * 4.2 + t * 0.85)

          if (hoverOn) {
            const dx = x - hx
            const dy = y - hy
            const dz = z - hz
            d += hover * 0.26 * Math.exp(-(dx * dx + dy * dy + dz * dz) * 4)
          }

          for (let k = 0; k < ripples.length; k++) {
            const r = ripples[k]
            const dx = x - r.x
            const dy = y - r.y
            const dz = z - r.z
            const w = Math.sqrt(dx * dx + dy * dy + dz * dz) - r.age * 2.4
            d += r.amp * Math.exp(-w * w * 3) * Math.cos(w * 9)
          }

          position.setXYZ(i, x + nx[i] * d, y + ny[i] * d, z + nz[i] * d)
        }
        position.needsUpdate = true
        geometry.computeVertexNormals()

        // Drag + momentum
        if (dragging) {
          group.rotation.y += dragDX * 0.01
          group.rotation.x += dragDY * 0.01
          velY = Math.max(-8, Math.min(8, (dragDX * 0.01) / Math.max(dt, 0.008)))
          velX = Math.max(-8, Math.min(8, (dragDY * 0.01) / Math.max(dt, 0.008)))
          dragDX = 0
          dragDY = 0
        } else {
          velY += (0.25 - velY) * (1 - Math.exp(-dt * 0.8))
          velX += (0.12 - velX) * (1 - Math.exp(-dt * 1.5))
          group.rotation.y += velY * dt
          group.rotation.x += velX * dt
        }

        // Squish on press, swell on hover, drift toward cursor
        const targetScale = dragging ? 0.93 : 1 + hover * 0.04
        const sc = group.scale.x + (targetScale - group.scale.x) * (1 - Math.exp(-dt * 10))
        group.scale.setScalar(sc)
        group.position.x += (pointerWin.x * 0.25 - group.position.x) * (1 - Math.exp(-dt * 3))
        group.position.y += (-pointerWin.y * 0.18 - group.position.y) * (1 - Math.exp(-dt * 3))

        // Color shift
        material.color.lerp(targetColor, 1 - Math.exp(-dt * 4))

        // Moving rim lights
        lightA.position.set(Math.cos(t * 0.5) * 4, 2 + Math.sin(t * 0.4), 3)
        lightB.position.set(Math.cos(t * 0.5 + Math.PI) * 4, -2 + Math.cos(t * 0.3), 2)

        // Particle halo
        pulse *= Math.exp(-dt * 3)
        particles.rotation.y = t * 0.04 + pointerWin.x * 0.15
        particles.rotation.x = pointerWin.y * 0.1
        particles.scale.setScalar(1 + pulse * 0.18)
        pMat.opacity = 0.45 + pulse * 0.4

        renderer.render(scene, camera)
        frame = requestAnimationFrame(render)
      }
      render()
      setReady(true)

      const onResize = () => {
        if (!mount || disposed) return
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
      }
      window.addEventListener('resize', onResize)

      mount.__cleanup = () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerdown', onPointerDown)
        window.removeEventListener('pointerup', onPointerUp)
        window.removeEventListener('pointercancel', onPointerUp)
        mount.style.cursor = ''
      }
    }

    start()

    return () => {
      disposed = true
      if (frame) cancelAnimationFrame(frame)
      if (mount.__cleanup) mount.__cleanup()
      if (mesh) {
        mesh.geometry?.dispose()
        mesh.material?.dispose()
      }
      if (particles) {
        particles.geometry?.dispose()
        particles.material?.dispose()
      }
      if (envTexture) envTexture.dispose()
      if (pmrem) pmrem.dispose()
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [reduced, wide])

  return (
    <div ref={mountRef} className="relative h-full w-full">
      {!ready && !reduced ? <div className="absolute inset-0 grid place-items-center text-cream/40 text-xs">Loading…</div> : null}
    </div>
  )
}