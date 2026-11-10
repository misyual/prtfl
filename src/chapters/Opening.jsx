import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { profile } from '../data/profile'
import { scrollToId, useReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Opening({ introDone }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const portraitRef = useRef(null)
  const imageRef = useRef(null)
  const eyebrowRef = useRef(null)
  const signatureRef = useRef(null)
  const footRef = useRef(null)
  const splitRef = useRef(null)
  const reduced = useReducedMotion()

  // Hide everything up front (before first paint), then split only once the
  // webfonts have settled so the line masks match the final line breaks.
  useLayoutEffect(() => {
    const title = titleRef.current
    if (!title || reduced) return undefined

    let cancelled = false
    let split
    let fallback

    gsap.set(title, { opacity: 0 })
    gsap.set([eyebrowRef.current, signatureRef.current, footRef.current], { opacity: 0, y: 18 })
    // The portrait stays painted from the first frame (good for LCP); it only
    // settles from a slight zoom once the intro lifts.
    gsap.set(imageRef.current, { scale: 1.12 })

    const build = () => {
      if (cancelled || split) return
      split = new SplitText(title, {
        type: 'lines',
        mask: 'lines',
        aria: 'none',
        linesClass: 'split-line',
      })
      gsap.set(split.lines, { yPercent: 110, opacity: 0 })
      splitRef.current = split
    }

    const fonts = document.fonts
    if (fonts?.status === 'loaded') {
      build()
    } else if (fonts) {
      fallback = window.setTimeout(build, 700)
      fonts.ready.then(build).catch(() => {})
    } else {
      build()
    }

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      split?.revert()
      splitRef.current = null
    }
  }, [reduced])

  useEffect(() => {
    if (!introDone || reduced) return undefined

    let cancelled = false
    let timeline

    const start = () => {
      if (cancelled || timeline) return

      const split = splitRef.current
      gsap.set(titleRef.current, { opacity: 1 })

      timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })
      if (split) {
        timeline.to(split.lines, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 0)
      }
      timeline
        .to(imageRef.current, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
        .to(
          [eyebrowRef.current, signatureRef.current, footRef.current],
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.35,
        )
    }

    const fonts = document.fonts
    let fallback
    if (fonts?.status === 'loaded') {
      start()
    } else if (fonts) {
      fallback = window.setTimeout(start, 900)
      fonts.ready.then(start).catch(() => {})
    } else {
      start()
    }

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      timeline?.kill()
    }
  }, [introDone, reduced])

  useEffect(() => {
    if (reduced) return undefined
    const section = sectionRef.current
    const image = imageRef.current
    if (!section || !image) return undefined

    const xTo = gsap.quickTo(image, 'x', { duration: 1, ease: 'power3' })
    const yTo = gsap.quickTo(image, 'y', { duration: 1, ease: 'power3' })

    const handleMove = (event) => {
      const box = section.getBoundingClientRect()
      const nx = (event.clientX - box.left) / box.width - 0.5
      const ny = (event.clientY - box.top) / box.height - 0.5
      xTo(nx * 20)
      yTo(ny * 16)
    }

    const handleLeave = () => {
      xTo(0)
      yTo(0)
    }

    section.addEventListener('pointermove', handleMove)
    section.addEventListener('pointerleave', handleLeave)

    return () => {
      section.removeEventListener('pointermove', handleMove)
      section.removeEventListener('pointerleave', handleLeave)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      gsap.to(portraitRef.current, {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="top" ref={sectionRef} className="opening gutter">
      <div className="shell w-full">
        <div className="flex items-center justify-between gap-4">
          <p ref={eyebrowRef} className="chapter-label">
            Portfolio / 2026
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-cream/56">
            {profile.location} — {profile.timezone}
          </p>
        </div>

        <div className="opening__grid">
          <div className="min-w-0">
            <h1 ref={titleRef} className="display-xl opening__title">
              Designing <em>sharp</em> visuals, building <em>smooth</em> experiences.
            </h1>

            <p
              ref={signatureRef}
              className="mt-8 max-w-sm font-serif text-[clamp(1.2rem,2.1vw,1.65rem)] italic leading-snug text-cream/55"
            >
              {profile.signature}
            </p>
          </div>

          <div ref={portraitRef} className="opening__portrait">
            <img
              ref={imageRef}
              src="/me.webp"
              alt="Portrait of Mishall Clive"
              width="800"
              height="800"
              fetchPriority="high"
              decoding="async"
            />
            <div className="opening__caption">
              <span>{profile.displayName}</span>
              <span>{profile.role}</span>
            </div>
          </div>
        </div>

        <div ref={footRef} className="opening__foot">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/58">
              {profile.availability}
            </span>
          </div>

          <a
            href="#about"
            onClick={(event) => {
              event.preventDefault()
              scrollToId('about')
            }}
            className="scroll-cue"
          >
            <span>Scroll to begin</span>
            <span className="scroll-cue__line" aria-hidden="true" />
          </a>

          <div className="hidden items-center gap-5 sm:flex">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/56 transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
