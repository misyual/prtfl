import { profile } from '../data/profile'
import CountUp from '../fx/CountUp'
import SplitReveal from '../fx/SplitReveal'
import WordReveal from '../fx/WordReveal'

export default function Person() {
  return (
    <section id="about" className="section-pad gutter border-t border-line">
      <div className="shell">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter-label">01 — The person</p>
            <WordReveal
              as="h2"
              className="display-lg mt-5 max-w-[15ch]"
              stagger={0.06}
              parts={[
                { text: 'The person' },
                { text: 'behind', className: 'serif-em text-accent' },
                { text: 'the pixels.' },
              ]}
            />
          </div>
          <p className="lede md:max-w-sm">
            A graphic designer who learned to code, so the idea survives the handoff. Based in the
            Philippines, working remotely with teams everywhere.
          </p>
        </header>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <aside className="self-start lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[6px] border border-line">
              <img
                src="/me.webp"
                alt="Mishall Clive working portrait"
                className="aspect-[4/5] w-full object-cover saturate-[0.85]"
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.18em] text-cream/60">
                Clive — 2026
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/56">
              <span>{profile.location}</span>
              <span className="text-right">{profile.role}</span>
            </div>
          </aside>

          <div className="min-w-0">
            <SplitReveal
              as="p"
              mode="scrub"
              text={profile.aboutOpening}
              stagger={0.05}
              className="mb-10 font-serif text-[clamp(1.9rem,3.8vw,3.15rem)] italic leading-[1.08] tracking-tight text-cream"
              start="top 82%"
              end="bottom 62%"
            />

            {profile.about.map((paragraph) => (
              <SplitReveal
                as="p"
                key={paragraph}
                text={paragraph}
                stagger={0.025}
                className="mb-6 max-w-2xl text-[1.02rem] leading-[1.75] text-cream/55"
              />
            ))}

            <div className="stat-row mt-14">
              {profile.stats.map((stat) => (
                <div className="stat-cell" key={stat.label}>
                  <span className="stat-value">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {profile.services.map((service) => (
                <span className="chip" key={service}>
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
