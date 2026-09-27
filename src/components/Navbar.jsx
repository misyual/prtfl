import { useEffect, useState } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Graphic', href: '#projects' },
  { label: 'Banners', href: '#banners' },
  { label: 'UI/UX', href: '#web-designs' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = ['top', ...navLinks.map((l) => l.href.slice(1))]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`.trim()}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="#top" aria-label="Back to top">
          <span className="navbar-logo-mark" aria-hidden="true" />
          <span className="navbar-logo-text">Mishall Clive</span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-item ${active === id ? 'is-active' : ''}`.trim()}
                aria-current={active === id ? 'page' : undefined}
              >
                <span className="nav-label">{link.label}</span>
              </a>
            )
          })}
        </nav>

        <a className="navbar-cta" href="#contact">
          Let&apos;s talk
        </a>
      </div>

      <div className="navbar-progress" aria-hidden="true">
        <div className="navbar-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  )
}

export default Navbar
