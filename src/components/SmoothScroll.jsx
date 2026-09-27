import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis, destroyLenis } from '../lib/lenis'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = getLenis()

    if (!lenis) {
      ScrollTrigger.refresh()
      return undefined
    }

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      destroyLenis()
    }
  }, [])

  return children
}
