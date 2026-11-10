import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/motion'

export default function CountUp({ value, suffix = '', duration = 1.5 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(() => (reduced ? value : 0))

  useEffect(() => {
    if (reduced) return undefined

    const el = ref.current
    if (!el) return undefined

    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const started = performance.now()
        const tick = (now) => {
          const progress = Math.min(1, (now - started) / (duration * 1000))
          const eased = 1 - (1 - progress) ** 3
          setDisplay(Math.round(eased * value))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.55 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration, reduced])

  return (
    <span ref={ref}>
      {display}
      {suffix ? <sup>{suffix}</sup> : null}
    </span>
  )
}
