import Lenis from 'lenis'

let instance = null

const shouldSkip = () => {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getLenis() {
  if (instance) return instance
  if (shouldSkip()) return null

  instance = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    infinite: false,
  })

  return instance
}

export function destroyLenis() {
  if (!instance) return
  instance.destroy()
  instance = null
}
