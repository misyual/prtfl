import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { chapters, EMAIL } from '../data/profile'
import { scrollToId } from '../lib/motion'
import { getLenis } from '../lib/lenis'

export default function SiteNav({ ready = true }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('top')
  const barRef = useRef(null)
  const lastYRef = useRef(0)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(y > 24)
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
        }

        const delta = y - lastYRef.current
        if (Math.abs(delta) > 6) {
          setHidden(y > 240 && delta > 0)
          lastYRef.current = y
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

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
    const lenis = getLenis()

    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const go = (event, id) => {
    event.preventDefault()
    const wasOpen = open
    setOpen(false)
    window.setTimeout(() => scrollToId(id), wasOpen ? 120 : 0)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? '-105%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <div
          className={`border-b transition-colors duration-500 ${
            scrolled || open
              ? 'border-line bg-ink/80 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="shell gutter flex h-[72px] items-center justify-between gap-6">
            <a
              href="#top"
              onClick={(event) => go(event, 'top')}
              className="group inline-flex shrink-0 items-center gap-2.5"
              aria-label="Mishall Clive — back to top"
            >
              <span className="h-2 w-2 rounded-[2px] bg-accent shadow-[0_0_12px_rgba(240,103,63,0.45)] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
              <span className="font-display text-[15px] tracking-tight text-cream">
                Mishall Clive
              </span>
            </a>

            <nav className="hidden items-center gap-7 md:flex" aria-label="Chapters">
              {chapters.slice(1).map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  onClick={(event) => go(event, chapter.id)}
                  aria-current={active === chapter.id ? 'true' : undefined}
                  className={`relative py-2 font-sans text-[13px] font-medium tracking-tight transition-colors duration-300 ${
                    active === chapter.id ? 'text-cream' : 'text-cream/58 hover:text-cream'
                  }`}
                >
                  {chapter.nav}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ${
                      active === chapter.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(event) => go(event, 'contact')}
                className="btn btn-sm hidden sm:inline-flex"
              >
                Let&apos;s talk
              </a>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-cream md:hidden"
              >
                <span className="sr-only">Menu</span>
                <span
                  className={`absolute h-px w-4 bg-current transition-transform duration-300 ${
                    open ? 'rotate-45' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`absolute h-px w-4 bg-current transition-transform duration-300 ${
                    open ? '-rotate-45' : 'translate-y-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent/25"
            />
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-ink/97 px-6 pb-8 pt-28 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Chapters" className="grid gap-1">
              {chapters.map((chapter) => (
                <motion.a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  onClick={(event) => go(event, chapter.id)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + chapters.indexOf(chapter) * 0.045 }}
                  className="group flex items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">{chapter.num}</span>
                  <span className="font-display text-[clamp(1.8rem,7vw,2.6rem)] tracking-tight text-cream">
                    {chapter.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="font-mono text-[11px] tracking-[0.16em] text-cream/60"
              >
                {EMAIL}
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/52">
                Graphic design · Front-end · Philippines
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
