import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RiOpenaiFill } from 'react-icons/ri'
import { SiClaude, SiGooglegemini, SiOpencode } from 'react-icons/si'
import { process, profile } from '../data/profile'
import WordReveal from '../fx/WordReveal'
import { useReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const aiIcons = {
  Claude: SiClaude,
  opencode: SiOpencode,
  ChatGPT: RiOpenaiFill,
  Gemini: SiGooglegemini,
}

export default function Process() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const fillRef = useRef(null)
  const stepsRef = useRef([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 58%',
            scrub: true,
          },
        },
      )

      stepsRef.current.forEach((el) => {
        if (!el) return

        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          },
        )

        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          end: 'bottom 25%',
          toggleClass: { targets: el, className: 'is-active' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="process" ref={sectionRef} className="section-pad gutter border-t border-line">
      <div className="shell">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter-label">05 — Process</p>
            <WordReveal
              as="h2"
              className="display-md mt-4 max-w-[18ch]"
              stagger={0.05}
              parts={[
                { text: 'How the work' },
                { text: 'actually', className: 'serif-em text-accent' },
                { text: 'gets made.' },
              ]}
            />
          </div>
          <p className="lede md:max-w-sm">
            No mystery, no drama. Four passes from first conversation to final pixel — each one
            making the work a little more inevitable.
          </p>
        </header>

        <div className="relative mt-16">
          <div ref={lineRef} className="process-line absolute inset-x-0 top-0 hidden lg:block">
            <div className="process-line__fill" ref={fillRef} />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((step, index) => (
              <div
                key={step.num}
                ref={(el) => {
                  stepsRef.current[index] = el
                }}
                className="process-step"
              >
                <span className="process-step__dot" aria-hidden="true" />
                <p className="chapter-num">{step.num}</p>
                <h3 className="mt-3 font-sans text-[clamp(1.4rem,2vw,1.8rem)] font-semibold tracking-tight text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/56">
              Services
            </p>
            <ul className="mt-4">
              {profile.services.map((service, index) => (
                <li
                  key={service}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <span className="font-sans text-[clamp(1rem,1.5vw,1.25rem)] font-medium tracking-tight text-cream/85">
                    {service}
                  </span>
                  <span className="chapter-num shrink-0">{String(index + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/56">
              Toolkit
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li className="chip" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>

            <p className="mt-9 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/56">
              AI toolkit
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.aiTools.map((tool) => {
                const Icon = aiIcons[tool]
                return (
                  <li className="chip" key={tool}>
                    {Icon ? <Icon className="h-3.5 w-3.5 opacity-70" aria-hidden="true" /> : null}
                    {tool}
                  </li>
                )
              })}
            </ul>

            <p className="mt-9 max-w-sm text-sm leading-relaxed text-cream/58">
              Design tools for the idea, code for the execution, AI for the busywork. The thinking
              stays human.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
