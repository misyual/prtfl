import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/motion'

/**
 * One restrained WebGL field for the whole page: a slow shell of dust that
 * parallaxes with the pointer and drifts with scroll. Loaded lazily so three.js
 * never blocks first paint, and fully skipped for reduced motion.
 */
export default function Stage() {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )
  const reduced = useReducedMotion()

  // Phones get the CSS gradient only: it keeps the mobile payload and main
  // thread free, and the field is too subtle to matter at that size.
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
    let frame = 0
    let renderer
    let scene
    let camera
    let points
    let geometry
    let material
    let clock
    let renderFrame
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }

    const handlePointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const start = async () => {
      const THREE = await import('three')
      if (disposed) return

      try {
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
          52,
          mount.clientWidth / mount.clientHeight,
          0.1,
          120,
        )
        camera.position.z = 14

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        const isMobile = window.innerWidth < 768
        const count = isMobile ? 850 : 1800
        geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(count * 3)
        const seeds = new Float32Array(count)
        const colors = new Float32Array(count * 3)
        const cream = new THREE.Color('#f2ead8')
        const lime = new THREE.Color('#d4ff4f')

        for (let i = 0; i < count; i += 1) {
          const radius = 4.2 + Math.random() * 7.5
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i * 3 + 1] = radius * Math.cos(phi) * 0.72
          positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
          seeds[i] = Math.random() * Math.PI * 2

          const color = Math.random() > 0.9 ? lime : cream
          colors[i * 3] = color.r
          colors[i * 3 + 1] = color.g
          colors[i * 3 + 2] = color.b
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
        geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))

        material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) },
          },
          vertexShader: `
            attribute float aSeed;
            attribute vec3 aColor;
            uniform float uTime;
            uniform float uPixelRatio;
            varying vec3 vColor;
            varying float vAlpha;

            void main() {
              vec3 p = position;
              float t = uTime * 0.16;
              p.x += sin(t + aSeed) * 0.4;
              p.y += cos(t * 0.82 + aSeed * 1.3) * 0.5;
              p.z += sin(t * 0.58 + aSeed * 0.7) * 0.4;

              vColor = aColor;
              vec4 mv = modelViewMatrix * vec4(p, 1.0);
              gl_Position = projectionMatrix * mv;
              gl_PointSize = (1.4 + abs(sin(aSeed)) * 1.6) * uPixelRatio * (10.0 / -mv.z);
              vAlpha = 0.25 + 0.75 * smoothstep(0.0, 1.0, sin(aSeed + uTime * 0.35) * 0.5 + 0.5);
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;

            void main() {
              vec2 uv = gl_PointCoord - 0.5;
              float d = length(uv);
              if (d > 0.5) discard;
              float alpha = smoothstep(0.5, 0.04, d) * vAlpha;
              gl_FragColor = vec4(vColor, alpha * 0.5);
            }
          `,
        })

        points = new THREE.Points(geometry, material)
        points.rotation.x = 0.22
        scene.add(points)

        clock = new THREE.Clock()

        const render = () => {
          if (disposed) return

          const time = clock.getElapsedTime()
          eased.x += (pointer.x - eased.x) * 0.035
          eased.y += (pointer.y - eased.y) * 0.035

          material.uniforms.uTime.value = time
          points.rotation.y = time * 0.028 + eased.x * 0.28
          points.rotation.x = 0.22 + eased.y * 0.16
          points.position.y = window.scrollY * 0.00035

          renderer.render(scene, camera)
          frame = requestAnimationFrame(render)
        }

        renderFrame = render
        frame = requestAnimationFrame(render)
        setReady(true)
      } catch {
        renderer?.dispose?.()
      }
    }

    const handleResize = () => {
      if (!renderer || !camera || !mount) return
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const handleVisibility = () => {
      if (!renderer || !renderFrame) return
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(renderFrame)
    }

    const usedIdleCallback = typeof window.requestIdleCallback === 'function'
    const idle = usedIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1800 })
      : window.setTimeout(start, 900)

    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      if (usedIdleCallback) window.cancelIdleCallback?.(idle)
      else window.clearTimeout(idle)
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      geometry?.dispose()
      material?.dispose()
      renderer?.dispose()
      if (renderer?.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [reduced, wide])

  return <div ref={mountRef} className={`stage ${ready ? 'is-ready' : ''}`.trim()} aria-hidden="true" />
}
