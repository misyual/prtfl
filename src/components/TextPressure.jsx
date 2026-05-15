import { memo, useEffect, useMemo, useRef } from 'react'

import './TextPressure.css'

const TextPressure = memo(({
  text,
  className = '',
  minScale = 1,
  maxScale = 1.32,
  influence = 180,
}) => {
  const rootRef = useRef(null)
  const charRefs = useRef([])
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })
  const frameRef = useRef(null)

  const chars = useMemo(() => Array.from(text), [text])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    function updateChars() {
      const pointer = pointerRef.current

      charRefs.current.forEach((char) => {
        if (!char) return

        if (!pointer.active) {
          char.style.transform = 'scaleX(1) scaleY(1)'
          char.style.fontVariationSettings = '"wght" 500, "wdth" 100'
          return
        }

        const rect = char.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = pointer.x - cx
        const dy = pointer.y - cy
        const distance = Math.sqrt(dx * dx + dy * dy)
        const pressure = Math.max(0, 1 - distance / influence)
        const scale = minScale + (maxScale - minScale) * pressure
        const weight = 500 + 350 * pressure
        const width = 100 + 45 * pressure

        char.style.transform = `scaleX(${scale}) scaleY(${1 + pressure * 0.08})`
        char.style.fontVariationSettings = `"wght" ${weight}, "wdth" ${width}`
      })

      frameRef.current = requestAnimationFrame(updateChars)
    }

    function onPointerMove(event) {
      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY
      pointerRef.current.active = true
    }

    function onPointerLeave() {
      pointerRef.current.active = false
    }

    root.addEventListener('pointermove', onPointerMove, { passive: true })
    root.addEventListener('pointerleave', onPointerLeave)
    frameRef.current = requestAnimationFrame(updateChars)

    return () => {
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(frameRef.current)
    }
  }, [influence, maxScale, minScale])

  return (
    <span ref={rootRef} className={`text-pressure ${className}`}>
      {chars.map((char, index) => (
        <span
          // The text is static, so index keeps the split characters stable.
          key={`${char}-${index}`}
          ref={(node) => {
            charRefs.current[index] = node
          }}
          className="text-pressure-char"
        >
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </span>
  )
})

TextPressure.displayName = 'TextPressure'

export default TextPressure
