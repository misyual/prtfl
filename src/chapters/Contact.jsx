import { useEffect, useState } from 'react'
import { EMAIL, profile } from '../data/profile'
import MagneticButton from '../fx/MagneticButton'
import Marquee from '../fx/Marquee'
import WordReveal from '../fx/WordReveal'

function LocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const value = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
      setTime(value)
    }

    update()
    const timer = window.setInterval(update, 30000)
    return () => window.clearInterval(timer)
  }, [])

  return <span>{time || '—'}</span>
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      id="contact"
      className="section-pad gutter relative isolate overflow-hidden border-t border-line"
    >
      <div className="contact-glow" aria-hidden="true" />

      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="chapter-label">06 — Next chapter</p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/56">
            {profile.location} — <LocalTime />
          </p>
        </div>

        <WordReveal
          as="h2"
          className="display-xl mt-7 max-w-[14ch]"
          stagger={0.07}
          parts={[
            { text: 'The next chapter is' },
            { text: 'yours.', className: 'serif-em text-lime' },
          ]}
        />

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="lede max-w-xl">
            Open for creative collaborations, UI design work, graphic design, and front-end
            opportunities. Tell me what you are making — I will tell you how I can help.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href={`mailto:${EMAIL}`} className="btn btn-solid">
              Start a project
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <button type="button" className="btn" onClick={copyEmail}>
              {copied ? 'Copied to clipboard' : 'Copy email'}
            </button>
          </div>
        </div>

        <a className="contact-email mt-16" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>

        <div className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="group flex items-start justify-between gap-4 border-b border-line pb-4 sm:border-b-0 sm:pb-0"
            >
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-cream/56">
                  {social.label}
                </span>
                <span className="mt-1.5 block font-display text-base font-medium tracking-tight text-cream/80 transition-colors group-hover:text-lime">
                  {social.value}
                </span>
              </span>
              <span
                className="text-cream/52 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="mt-20 border-y border-line py-4">
          <Marquee
            items={['Let us build something', 'Get in touch', 'Available for freelance']}
            separator="✦"
            speed={24}
          />
        </div>

        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-cream/52">
          Based in the Philippines — working worldwide
        </p>
      </div>
    </section>
  )
}
