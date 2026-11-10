import { useState } from 'react'
import SiteNav from './layout/SiteNav'
import Footer from './layout/Footer'
import Object3D from './fx/Object3D'
import Lightbox from './fx/Lightbox'
import { posters, banners, caseStudies } from './data/work'
import { profile as P, process } from './data/profile'

export default function App() {
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  const openLb = (i) => {
    setLbIndex(i)
    setLbOpen(true)
  }

  return (
    <div className="portfolio-shell bg-ink text-cream">
      <a
        href="#main"
        className="sr-only z-[300] rounded-full bg-accent px-5 py-3 font-sans text-sm font-medium text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <SiteNav ready />
      <main id="main" className="page-main">
        {/* Hero */}
        <section id="top" className="min-h-screen flex items-center border-b border-line">
          <div className="shell gutter w-full grid gap-10 md:grid-cols-2 items-center py-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cream/75">
                {P.role}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-tight">
                {P.displayName}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80">
                {P.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="btn btn-solid">View work</a>
                <a href="#contact" className="btn">Get in touch</a>
              </div>
            </div>
            <div className="h-[360px] md:h-[460px]">
              <Object3D />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section-pad border-b border-line">
          <div className="shell gutter grid gap-10 md:grid-cols-2">
            <div>
              <p className="chapter-label">About</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight">
                {P.aboutOpening}
              </h2>
            </div>
            <div className="space-y-4 text-cream/80 leading-relaxed">
              {P.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-line">
                {P.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl">{s.value}{s.suffix}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/75 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="projects" className="section-pad border-b border-line">
          <div className="shell gutter">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="chapter-label">Selected work</p>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-tight">
                  Posters &amp; packaging
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posters.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openLb(i)}
                  className="group text-left"
                >
                  <div className="overflow-hidden rounded-lg border border-line bg-ink-elev">
                    <img
                      src={p.src}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">{p.title}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/75">{p.category}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Banners */}
        <section id="banners" className="section-pad border-b border-line">
          <div className="shell gutter">
            <p className="chapter-label">Campaigns</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-tight mb-8">
              Campaign banners
            </h2>
            <div className="grid gap-6">
              {banners.map((b) => (
                <div key={b.id} className="overflow-hidden rounded-xl border border-line bg-ink-elev">
                  <img src={b.src} alt={b.alt} loading="lazy" decoding="async" className="w-full h-auto" />
                  <div className="p-4 flex items-center justify-between">
                    <span className="font-medium">{b.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/75">{b.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interfaces */}
        <section id="web-designs" className="section-pad border-b border-line">
          <div className="shell gutter">
            <p className="chapter-label">Interfaces</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-tight mb-8">
              Web design case studies
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((c) => (
                <article key={c.id} className="overflow-hidden rounded-xl border border-line bg-ink-elev">
                  <img src={c.cover} alt={c.title} loading="lazy" decoding="async" className="w-full aspect-video object-cover" />
                  <div className="p-5">
                    <h3 className="font-display text-xl">{c.title}</h3>
                    <p className="mt-2 text-sm text-cream/80">{c.summary}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/75">
                      {c.category} · {c.year}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="section-pad border-b border-line">
          <div className="shell gutter">
            <p className="chapter-label">Process</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-tight mb-8">
              How the work gets made
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((s) => (
                <div key={s.num} className="border-t border-line pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/75">{s.num}</p>
                  <h3 className="mt-2 font-display text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-cream/80">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-pad">
          <div className="shell gutter text-center">
            <p className="chapter-label justify-center">Contact</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-tight">
              The next chapter is yours.
            </h2>
            <a
              href={`mailto:${P.email || 'clivemishall@gmail.com'}`}
              className="mt-6 inline-block text-xl md:text-2xl font-medium text-accent hover:underline"
            >
              clivemishall@gmail.com
            </a>
            <div className="mt-8 flex justify-center gap-6 font-mono text-xs uppercase tracking-[0.18em] text-cream/75">
              <a href="https://github.com/misyual" className="hover:text-cream">GitHub</a>
              <a href="https://www.linkedin.com/in/mishall-clive-b6150a324" className="hover:text-cream">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Lightbox
        open={lbOpen}
        items={posters}
        index={lbIndex}
        onIndex={setLbIndex}
        onClose={() => setLbOpen(false)}
      />
    </div>
  )
}
