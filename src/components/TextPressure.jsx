import { memo, useEffect, useMemo, useRef } from 'react'
import './TextPressure.css'

const TextPressure = memo(({
  text,
  className = '',
  fontFamily = 'Compressa VF',
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  textColor = 'inherit',
  minFontSize = 36,
  minScale = 1,
  maxScale = 1.32,
  influence = 180,
  width = true,
  weight = true,
  italic = false,
}) => {
  const rootRef = useRef(null)
  const charRefs = useRef([])
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })
  const frameRef = useRef(null)

  const words = useMemo(() => text.trim().split(/\s+/), [text])

  useEffect(() => {
    if (!fontUrl || document.getElementById(`text-pressure-font-${fontFamily.replace(/\s+/g, '-')}`)) {
      return undefined
    }

    const style = document.createElement('style')
    style.id = `text-pressure-font-${fontFamily.replace(/\s+/g, '-')}`
    style.textContent = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontUrl}') format('woff2');
        font-weight: 50 2000;
        font-stretch: 30% 300%;
        font-style: normal;
        font-display: swap;
      }
    `
    document.head.appendChild(style)
    return () => { style.remove() }
  }, [fontFamily, fontUrl])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    function updateChars() {
      const pointer = pointerRef.current

      charRefs.current.forEach((char) => {
        if (!char) return

        if (!pointer.active) {
          char.style.transform = 'scaleX(1) scaleY(1)'
          char.style.fontVariationSettings = `"wght" 500, "wdth" 100`
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
        const pressureWeight = 500 + 350 * pressure
        const pressureWidth = 100 + 45 * pressure

        char.style.transform = `scaleY(${scale}) scaleX(1)`
        char.style.fontVariationSettings = `"wght" ${weight ? pressureWeight : 500}, "wdth" ${width ? pressureWidth : 100}`
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
  }, [influence, maxScale, minScale, weight, width])

  return (
    <span
      ref={rootRef}
      className={`text-pressure ${className}`}
      style={{
        color: textColor,
        fontFamily: `'${fontFamily}', Impact, 'Arial Narrow', system-ui, sans-serif`,
        fontSize: `clamp(${minFontSize}px, 8vw, 104px)`,
        fontStyle: italic ? 'italic' : 'normal',
      }}
    >
      {words.map((word, wordIndex) => (
        <span className="text-pressure-word" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((char, charIndex) => {
            const refIndex = words
              .slice(0, wordIndex)
              .reduce((total, currentWord) => total + currentWord.length, 0) + charIndex
            return (
              <span
                key={`${char}-${wordIndex}-${charIndex}`}
                ref={(node) => { charRefs.current[refIndex] = node }}
                className="text-pressure-char"
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
})

TextPressure.displayName = 'TextPressure'
export default TextPressure