import { useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../lib/motion'

export default function MagneticButton({
  as: Tag = 'a',
  strength = 0.32,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const handleMove = (event) => {
    const el = ref.current
    if (!el || reduced) return
    const box = el.getBoundingClientRect()
    const x = (event.clientX - (box.left + box.width / 2)) * strength
    const y = (event.clientY - (box.top + box.height / 2)) * strength
    gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out', overwrite: true })
  }

  const handleLeave = () => {
    if (!ref.current || reduced) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      overwrite: true,
    })
  }

  return (
    <Tag
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
