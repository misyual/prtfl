import { useRef } from 'react'
import { profile } from '../data/profile'
import Object3D from '../fx/Object3D'

export default function Opening() {
  const sectionRef = useRef(null)

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cream text-ink"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <Object3D />
      </div>

      <div className="shell gutter relative z-10 w-full py-20">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink/75">
          Portfolio / 2026
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
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
          <a href="#contact" className="btn">Get in touch</a>
        </div>
      </div>
    </section>
  )
}
