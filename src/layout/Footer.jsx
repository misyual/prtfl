import { EMAIL, profile } from '../data/profile'
import { scrollToId } from '../lib/motion'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell gutter flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-display text-sm font-medium tracking-tight text-cream">
            {profile.displayName}
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/56">
            © {year} — All rights reserved
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/56 transition-colors hover:text-lime"
            >
              {social.label}
            </a>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-[10px] tracking-[0.12em] text-cream/52 transition-colors hover:text-cream"
          >
            {EMAIL}
          </a>
        </div>

        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            scrollToId('top')
          }}
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/56 transition-colors hover:text-lime"
        >
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
            ↑
          </span>
        </a>
      </div>
    </footer>
  )
}
