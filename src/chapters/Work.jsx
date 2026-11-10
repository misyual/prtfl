import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { archive, posters } from '../data/work'
import ArchiveOverlay from '../fx/ArchiveOverlay'
import Lightbox from '../fx/Lightbox'
import { useReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const archiveItems = [...posters, ...archive]

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const barRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || reduced) return undefined

    const media = gsap.matchMedia()

    media.add('(min-width: 901px)', () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${progress})`
            }
            const index = Math.round(progress * (posters.length - 1))
            if (index !== activeRef.current) {
              activeRef.current = index
              setActive(index)
            }
          },
        },
      })

      return () => tween.kill()
    })

    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 350)
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      media.revert()
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
    }
  }, [reduced])

  const handleViewportScroll = (event) => {
    const viewport = event.currentTarget
    const max = viewport.scrollWidth - viewport.clientWidth
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${max > 0 ? viewport.scrollLeft / max : 0})`
    }

    const center = viewport.scrollLeft + viewport.clientWidth / 2
    const cards = [...viewport.querySelectorAll('.filmstrip__card')]
    let best = 0
    let bestDistance = Infinity

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - center)
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    })

    if (best !== activeRef.current) {
      activeRef.current = best
      setActive(best)
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="filmstrip flex min-h-svh flex-col justify-center overflow-hidden border-t border-line py-24"
      style={{ '--gutter-x': 'clamp(20px, 5vw, 84px)' }}
    >
      <div className="shell gutter w-full">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter-label">02 — Selected work</p>
            <h2 className="display-md mt-4 max-w-[20ch]">
              Pieces made to <span className="serif-em text-lime">stop the scroll.</span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end">
            <p className="max-w-sm text-sm leading-relaxed text-cream/60">
              Posters, packaging and product covers — built to read at thumbnail size and hold up
              in print.
            </p>
            <button
              type="button"
              onClick={() => setArchiveOpen(true)}
              className="group mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/58 transition-colors hover:text-lime"
            >
              View archive — {archiveItems.length} pieces
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </header>
      </div>

      <div
        className="filmstrip__viewport mt-7 w-full"
        ref={viewportRef}
        onScroll={handleViewportScroll}
      >
        <div className="filmstrip__track" ref={trackRef}>
          {posters.map((poster, index) => (
            <figure
              className={`filmstrip__card ${active === index ? 'is-active' : ''}`.trim()}
              key={poster.id}
            >
              <button
                type="button"
                className="filmstrip__frame"
                onClick={() => setLightbox(index)}
              >
                <img
                  src={poster.src}
                  alt={poster.title}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="1000"
                />
                <span className="filmstrip__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="sr-only">Open {poster.title}</span>
              </button>

              <figcaption className="filmstrip__meta">
                <span className="filmstrip__title">{poster.title}</span>
                <span className="filmstrip__cat">{poster.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="shell gutter mt-auto w-full">
        <div className="filmstrip__foot" style={{ paddingInline: 0 }}>
          <span className="filmstrip__count">
            {String(active + 1).padStart(2, '0')} / {String(posters.length).padStart(2, '0')}
          </span>
          <div className="filmstrip__bar" aria-hidden="true">
            <span className="filmstrip__bar-fill" ref={barRef} />
          </div>
          <span className="filmstrip__count hidden sm:block">Scroll to explore</span>
        </div>
      </div>

      <Lightbox
        open={lightbox !== null}
        items={posters}
        index={lightbox ?? 0}
        onIndex={setLightbox}
        onClose={() => setLightbox(null)}
      />

      <ArchiveOverlay
        open={archiveOpen}
        items={archiveItems}
        onClose={() => setArchiveOpen(false)}
      />
    </section>
  )
}
