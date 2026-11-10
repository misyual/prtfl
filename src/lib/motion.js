import { useEffect, useState } from 'react'
import { getLenis } from './lenis'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function scrollToId(id, offset = -72) {
  const target = document.getElementById(id)
  if (!target) return

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.25 })
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
