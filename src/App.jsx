import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroll from './components/SmoothScroll'
import Stage from './fx/Stage'
import ChapterRail from './layout/ChapterRail'
import Footer from './layout/Footer'
import Intro from './layout/Intro'
import SiteNav from './layout/SiteNav'
import Campaigns from './chapters/Campaigns'
import Contact from './chapters/Contact'
import Interfaces from './chapters/Interfaces'
import Opening from './chapters/Opening'
import Person from './chapters/Person'
import Process from './chapters/Process'
import Work from './chapters/Work'

function readIntroState() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return window.sessionStorage.getItem('mc-intro') === '1'
  } catch {
    return true
  }
}

function App() {
  const [introDone, setIntroDone] = useState(readIntroState)
  // Mount everything below the opening only after the first paint, so the hero
  // portrait (the LCP element) is never stuck behind the rest of the page's
  // React work and GSAP setup. Deep links render immediately instead.
  const [chaptersReady, setChaptersReady] = useState(
    () => typeof window !== 'undefined' && window.location.hash.length > 1,
  )

  useEffect(() => {
    if (chaptersReady) return undefined

    let cancelled = false
    const show = () => {
      if (!cancelled) setChaptersReady(true)
    }
    const timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(show, { timeout: 800 })
      else show()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [chaptersReady])

  useEffect(() => {
    if (!introDone) return undefined

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)

    return () => window.clearTimeout(timer)
  }, [introDone])

  useEffect(() => {
    if (!chaptersReady) return undefined

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 160)

    return () => window.clearTimeout(timer)
  }, [chaptersReady])

  return (
    <SmoothScroll>
      <div className="portfolio-shell">
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-lime px-5 py-3 font-display text-sm font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        <Intro onDone={() => setIntroDone(true)} />
        <Stage />
        <SiteNav ready={chaptersReady} />
        <ChapterRail ready={chaptersReady} />

        <main className="page-main" id="main">
          <Opening introDone={introDone} />
          {chaptersReady ? (
            <>
              <Person />
              <Work />
              <Campaigns />
              <Interfaces />
              <Process />
              <Contact />
            </>
          ) : null}
        </main>

        <Footer />
        <div className="grain" aria-hidden="true" />
      </div>
    </SmoothScroll>
  )
}

export default App
