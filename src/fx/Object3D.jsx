import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/motion'

export default function Object3D() {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || reduced) return undefined

    let disposed = false
    let renderer, scene, camera, mesh, frame

    const start = async () => {
      const THREE = await import('three')
      if (disposed) return

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
      camera.position.z = 4.5

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      mount.appendChild(renderer.domElement)

      const geometry = new THREE.TorusKnotGeometry(1, 0.32, 128, 16)
      const material = new THREE.MeshStandardMaterial({
        color: 0x6f7f6a,
        metalness: 0.15,
        roughness: 0.55,
        flatShading: false,
      })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const light = new THREE.DirectionalLight(0xffffff, 1.1)
      light.position.set(3, 4, 5)
      scene.add(light)
      scene.add(new THREE.AmbientLight(0xffffff, 0.55))

      const clock = new THREE.Clock()
      const render = () => {
        if (disposed) return
        const t = clock.getElapsedTime()
        mesh.rotation.x = t * 0.25
        mesh.rotation.y = t * 0.35
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
      mount.__cleanup = () => window.removeEventListener('resize', onResize)
    }

    start()

    return () => {
      disposed = true
      if (frame) cancelAnimationFrame(frame)
      if (mount.__cleanup) mount.__cleanup()
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
      if (mesh) {
        mesh.geometry?.dispose()
        mesh.material?.dispose()
      }
    }
  }, [reduced])

  return (
    <div ref={mountRef} className="relative h-full w-full">
      {!ready && !reduced ? <div className="absolute inset-0 grid place-items-center text-cream/40 text-xs">Loading…</div> : null}
    </div>
  )
}
