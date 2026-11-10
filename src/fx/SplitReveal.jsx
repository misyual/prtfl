import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * Scroll-linked line reveal for plain-text paragraphs. `autoSplit` re-splits
 * when webfonts load or the element resizes, so line masks stay correct.
 */
export default function SplitReveal({
  as: Tag = 'p',
  text,
  className = '',
  mode = 'reveal',
  type = 'lines',
  delay = 0,
  stagger = 0.09,
  duration = 0.95,
  start = 'top 84%',
  end = 'bottom 55%',
  once = true,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return undefined

    const split = new SplitText(el, {
      type,
      mask: type === 'lines' ? 'lines' : undefined,
      aria: 'none',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: (self) => {
        const targets =
          type === 'chars' ? self.chars : type === 'words' ? self.words : self.lines

        if (mode === 'scrub') {
          return gsap.fromTo(
            targets,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration,
              stagger,
              ease: 'none',
              scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
            },
          )
        }

        return gsap.fromTo(
          targets,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start, once },
          },
        )
      },
    })

    return () => split.revert()
  }, [text, className, mode, type, delay, stagger, duration, start, end, once, reduced])

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
