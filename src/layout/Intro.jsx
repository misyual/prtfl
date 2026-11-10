import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { getLenis } from '../lib/lenis'

const WORDS = ['Mishall', 'Clive.']

function readSeen() {
  try {
    return window.sessionStorage.getItem('mc-intro') === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem('mc-intro', '1')
  } catch {
    /* storage can be unavailable; the intro simply plays again */
  }
}

export default function Intro({ onDone }) {
  const rootRef = useRef(null)
  const curtainRef = useRef(null)
  const countRef = useRef(null)
  const fillRef = useRef(null)
  const tlRef = useRef(null)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !readSeen()
  })

  useEffect(() => {
    if (!visible) {
      doneRef.current?.()
      return undefined
    }

    markSeen()
    const lenis = getLenis()
    lenis?.stop()
    window.scrollTo(0, 0)

    const counter = { value: 0 }
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        lenis?.start()
        setVisible(false)
        doneRef.current?.()
      },
    })
    tlRef.current = tl

    tl.to('.intro__word', { y: 0, duration: 0.55, stagger: 0.04 }, 0.06)
      .to(
        counter,
        {
          value: 100,
          duration: 0.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.value)).padStart(2, '0')
            }
            if (fillRef.current) {
              fillRef.current.style.transform = `scaleX(${counter.value / 100})`
            }
          },
        },
        0.04,
      )
      .to(curtainRef.current, { yPercent: -100, duration: 0.58, ease: 'expo.inOut' }, '+=0')
      .to(rootRef.current, { autoAlpha: 0, duration: 0.16 }, '-=0.24')

    return () => {
      tl.kill()
      lenis?.start()
    }
  }, [visible])

  const finish = () => {
    tlRef.current?.kill()
    getLenis()?.start()
    setVisible(false)
    doneRef.current?.()
  }

  if (!visible) return null

  return (
    <div className="intro" ref={rootRef} role="presentation">
      <div className="intro__inner">
        <p className="intro__meta">
          <span>Portfolio</span>
          <span className="h-px w-6 bg-cream/20" aria-hidden="true" />
          <span>2026</span>
        </p>

        <h1 className="intro__name" aria-label="Mishall Clive">
          {WORDS.map((word) => (
            <span className="intro__word" key={word}>
              {word}
            </span>
          ))}
        </h1>

        <div className="intro__meta mt-2">
          <span className="intro__count" ref={countRef}>
            00
          </span>
          <div className="intro__bar" aria-hidden="true">
            <div className="intro__bar-fill" ref={fillRef} />
          </div>
          <span>Loading</span>
        </div>
      </div>

      <div className="intro__curtain" ref={curtainRef} />

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-7 right-7 z-[3] font-mono text-[10px] uppercase tracking-[0.22em] text-cream/56 transition-colors hover:text-accent"
      >
        Skip
      </button>
    </div>
  )
}
