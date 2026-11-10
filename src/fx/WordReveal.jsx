import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * React-rendered word reveal for headings with mixed styling. Because the
 * words are real React nodes (not DOM mutations), it is safe to use inside
 * components that re-render, like modals and copy buttons.
 *
 * `parts` is an array of { text, className } so a heading can switch to the
 * serif italic accent mid-sentence without losing the word-by-word motion.
 */
export default function WordReveal({
  as: Tag = 'h2',
  parts = [],
  className = '',
  mode = 'reveal',
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  start = 'top 85%',
  end = 'bottom 60%',
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const words = parts.flatMap((part, partIndex) =>
    part.text
      .split(' ')
      .filter(Boolean)
      .map((word, wordIndex) => ({
        word,
        className: part.className ?? '',
        key: `${partIndex}-${wordIndex}`,
      })),
  )

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return undefined

    const targets = el.querySelectorAll('[data-word]')

    const ctx = gsap.context(() => {
      if (mode === 'scrub') {
        gsap.fromTo(
          targets,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            stagger: stagger * 0.6,
            scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
          },
        )
      } else {
        gsap.fromTo(
          targets,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start, once: true },
          },
        )
      }
    }, el)

    return () => ctx.revert()
  }, [mode, delay, stagger, duration, start, end, reduced])

  return (
    <Tag ref={ref} className={className}>
      {words.map((item) => (
        <span
          className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
          key={item.key}
        >
          <span data-word className={`inline-block ${item.className}`.trim()}>
            {item.word}
          </span>
        </span>
      )).reduce((nodes, node, index) => {
        if (index === 0) return [node]
        return [...nodes, ' ', node]
      }, [])}
    </Tag>
  )
}
