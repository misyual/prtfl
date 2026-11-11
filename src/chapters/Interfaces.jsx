import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import { caseStudies } from '../data/work'
import WordReveal from '../fx/WordReveal'

const DETAILS = ['challenge', 'approach', 'outcome']

function VisitLink({ url }) {
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/80 transition-colors hover:border-accent hover:text-accent"
    >
      Visit site
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path
          d="M3 9l6-6M4 3h5v5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </a>
  )
}

function CaseStudy({ study, index, onOpen }) {
  const [active, setActive] = useState(0)
  const detailRefs = useRef([])
  const gallery = study.gallery
  const current = Math.min(active, gallery.length - 1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(Number(visible.target.dataset.index) + 1)
      },
      { rootMargin: '-25% 0px -48% 0px', threshold: [0, 0.3, 0.6, 1] },
    )

    detailRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <article className="case-block py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-24">
          <div className="case-cover relative aspect-[4/3]">
            {gallery.map((item, galleryIndex) => (
              <img
                key={item.label}
                src={item.src}
                alt={`${study.title} — ${item.label}`}
                className={galleryIndex === current ? 'opacity-100' : 'opacity-0'}
                width="1400"
                height="1050"
                loading="lazy"
                decoding="async"
                aria-hidden={galleryIndex !== current}
              />
            ))}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink/90 to-transparent p-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/70">
                {gallery[current]?.label}
              </span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-cream/56">
                {String(current + 1).padStart(2, '0')} /{' '}
                {String(gallery.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="case-thumbs">
            {gallery.map((item, galleryIndex) => (
              <button
                type="button"
                key={item.label}
                className={`case-thumb ${galleryIndex === current ? 'is-active' : ''}`.trim()}
                aria-label={`Show ${item.label}`}
                aria-current={galleryIndex === current}
                onClick={() => setActive(galleryIndex)}
              >
                <img src={item.src} alt="" width="48" height="34" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="chapter-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/56">
              {study.category} — {study.year}
            </span>
          </div>

          <h3 className="display-md mt-5">{study.title}</h3>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-cream/55">
            {study.summary}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
            {[
              ['Role', study.role],
              ['Client', study.client],
              ['Year', study.year],
              ['Category', study.category],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/56">
                  {label}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-cream/70">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            {DETAILS.map((key) => (
              <div key={key} className="case-detail">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                  {key}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">{study[key]}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {study.tools.map((tool) => (
              <span className="chip" key={tool}>
                {tool}
              </span>
            ))}
          </div>

          <VisitLink url={study.url} />
        </div>
      </div>
    </article>
  )
}

function CaseModal({ study, onClose }) {
  const [index, setIndex] = useState(0)
  if (!study) return null

  const item = study.gallery[index] ?? study.gallery[0]

  return (
    <Modal open onClose={onClose} labelledBy="case-modal-title">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="relative aspect-[4/3] bg-[#0b0b09]">
            <img
              src={item.src}
              alt={`${study.title} — ${item.label}`}
              className="h-full w-full object-contain"
              width="1400"
              height="1050"
              decoding="async"
            />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/60">
              {item.label}
            </span>
            <span className="font-mono text-[9px] tracking-[0.16em] text-cream/56">
              {index + 1} / {study.gallery.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 px-5 pb-5">
            {study.gallery.map((galleryItem, galleryIndex) => (
              <button
                type="button"
                key={galleryItem.label}
                className={`case-thumb ${galleryIndex === index ? 'is-active' : ''}`.trim()}
                aria-label={`Show ${galleryItem.label}`}
                aria-current={galleryIndex === index}
                onClick={() => setIndex(galleryIndex)}
              >
                <img src={galleryItem.src} alt="" width="48" height="34" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="chapter-label">{study.category}</p>
          <h2 id="case-modal-title" className="display-md mt-4">
            {study.title}
          </h2>

          <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-line py-5">
            {[
              ['Year', study.year],
              ['Role', study.role],
              ['Client', study.client],
              ['Gallery', `${study.gallery.length} screens`],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-cream/56">
                  {label}
                </dt>
                <dd className="mt-1 text-[12.5px] text-cream/70">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm leading-relaxed text-cream/55">{study.summary}</p>

          <div className="mt-6 grid gap-5">
            {DETAILS.map((key) => (
              <div key={key}>
                <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                  {key}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-cream/55">{study[key]}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tools.map((tool) => (
              <span className="chip" key={tool}>
                {tool}
              </span>
            ))}
          </div>

          <VisitLink url={study.url} />
        </div>
      </div>

      <button type="button" className="modal-close" onClick={onClose} aria-label="Close case study">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            d="M3 3l10 10M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
    </Modal>
  )
}

export default function Interfaces() {
  const [activeId, setActiveId] = useState(null)
  const activeStudy = caseStudies.find((study) => study.id === activeId) ?? null

  return (
    <section id="web-designs" className="section-pad gutter border-t border-line">
      <div className="shell">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter-label">04 — Interfaces</p>
            <WordReveal
              as="h2"
              className="display-md mt-4 max-w-[18ch]"
              parts={[
                { text: 'Interfaces built like' },
                { text: 'systems.', className: 'serif-em text-accent' },
              ]}
            />
          </div>
          <p className="lede md:max-w-sm">
            Wireframes through handoff — layouts on a real grid, with type scales and spacing
            systems that survive contact with code.
          </p>
        </header>

        <div className="mt-8">
          {caseStudies.map((study, index) => (
            <CaseStudy
              key={study.id}
              study={study}
              index={index}
              onOpen={(id) => setActiveId(id)}
            />
          ))}
        </div>
      </div>

      <CaseModal study={activeStudy} onClose={() => setActiveId(null)} />
    </section>
  )
}