import heroImg from '../assets/funny-cats-2-20250212.webp'
import './Hero.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy', {
        opacity: 0,
        y: 60,
        duration: 3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          Frontend Developer + Graphic Designer
        </p>
        <h1>Designing sharp visuals and building smooth web experiences.</h1>
        <p className="hero-text">
          Passionate about graphic design and front-end development, 
          I create visually appealing designs and user-friendly web 
          experiences with attention to detail.
        </p>
        <div className="hero-highlights" aria-label="Creative services">
          {['Poster Design', 'Web UI', 'Product Cover Photo'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View work
          </a>
          <a className="button secondary" href="#contact">
            Contact me
          </a>
        </div>
      </div>
      <div className="hero-media" aria-label="Portfolio profile artwork">
        <img src={heroImg} alt="Portfolio profile artwork" />
      </div>
    </section>
  )
}

export default Hero
