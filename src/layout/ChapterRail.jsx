import { useEffect, useRef, useState } from 'react'
import { chapters } from '../data/profile'
import { scrollToId } from '../lib/motion'

export default function ChapterRail({ ready = true }) {
  const [active, setActive] = useState('top')
  const fillRef = useRef(null)

  useEffect(() => {
    const sections = chapters.map((chapter) => document.getElementById(chapter.id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ready])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <aside className="chapter-rail" aria-label="Chapter progress">
      <div className="relative">
        <div className="chapter-rail__progress" aria-hidden="true">
          <div className="chapter-rail__progress-fill" ref={fillRef} />
        </div>

        <ol className="chapter-rail__list">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToId(chapter.id)
                }}
                className={`chapter-rail__item ${active === chapter.id ? 'is-active' : ''}`.trim()}
                aria-current={active === chapter.id ? 'true' : undefined}
              >
                <span className="chapter-rail__dot" aria-hidden="true" />
                <span className="chapter-rail__text">
                  {chapter.num} — {chapter.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
