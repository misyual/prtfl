import { useState } from 'react'
import Reveal from './Reveal'
import './Contact.css'

const EMAIL = 'clivemishall@gmail.com'

const links = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'GitHub', value: 'misyual', href: 'https://github.com/misyual' },
  {
    label: 'LinkedIn',
    value: 'mishall-clive',
    href: 'https://www.linkedin.com/in/mishall-clive-b6150a324',
  },
]

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-aurora" aria-hidden="true" />

      <div className="section-head contact-head">
        <p className="eyebrow">Contact</p>
        <h2>
          Let&apos;s craft something <em>beautiful</em>.
        </h2>
        <p className="section-lede">
          Open for creative collaborations, UI design projects, graphic design work, and
          front-end development opportunities. Drop a message and let&apos;s get to work.
        </p>
      </div>

      <div className="contact-body">
        <Reveal className="contact-links" as="ul" aria-label="Contact links" y={20}>
          {links.map((link) => (
            <li key={link.label}>
              <a
                className="contact-link"
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              >
                <span className="contact-link-label">{link.label}</span>
                <span className="contact-link-value">{link.value}</span>
                <span className="contact-link-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </li>
          ))}
        </Reveal>

        <Reveal className="contact-side" delay={0.12}>
          <p className="contact-side-title">Prefer a quick copy?</p>
          <button type="button" className="button primary copy-btn" onClick={copyEmail}>
            {copied ? 'Copied to clipboard' : `Copy ${EMAIL}`}
          </button>
          <p className="contact-side-note">
            Typical reply within 24&ndash;48 hours. Remote friendly, based in Philippines.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
