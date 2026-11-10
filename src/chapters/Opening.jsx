import { useRef } from 'react'
import { profile } from '../data/profile'
import Object3D from '../fx/Object3D'

export default function Opening() {
  const sectionRef = useRef(null)

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero relative flex min-h-svh flex-col justify-center overflow-hidden bg-cream text-ink"
    >
      <div className="shell gutter relative z-10 w-full pb-2 pt-[calc(var(--nav-h,72px)+clamp(18px,5vw,40px))] md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink/75">
          Portfolio / 2026
        </p>
        <h1
          className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight"
          style={{ color: '#1f1d1d' }}
        >
          Mishall Clive
        </h1>
        <p className="mt-4 max-w-xl text-lg md:text-2xl font-sans text-ink/80">
          {profile.role}
        </p>
        <p className="mt-2 max-w-xl text-base text-ink/75">
          {profile.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-solid">View work</a>
          <a href="#contact" className="btn btn-solid">Get in touch</a>
        </div>
      </div>

      {/* Desktop: object sits to the right of the copy. Mobile: it gets its
          own band below the copy so it is never hidden behind the text. */}
      <div
        className="relative z-0 h-[36svh] min-h-[210px] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[60%] md:opacity-60"
        aria-hidden="true"
      >
        <Object3D />
      </div>
    </section>
  )
}