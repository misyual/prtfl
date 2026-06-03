import { useRef } from 'react'
import heroImg from '../assets/me.jpg'
import './Hero.css'
import BlurText from './BlurText'
import TiltedCard from './TiltedCard'
import { gsap } from 'gsap'

function Hero() {
  const wrapperRef = useRef(null)
  const overlayRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to(pos.current, {
      x,
      y,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: () => {
        wrapperRef.current?.style.setProperty('--x', `${pos.current.x}px`)
        wrapperRef.current?.style.setProperty('--y', `${pos.current.y}px`)
      }
    })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.6, overwrite: true })
  }

  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <BlurText
          as="h1"
          text="Designing sharp visuals and building smooth web experiences."
          delay={120}
          direction="bottom"
        />
        <BlurText
          className="hero-text"
          text="Passionate about graphic design and front-end development, I create visually appealing designs and user-friendly web experiences with attention to detail."
          delay={40}
          direction="bottom"
        />
        <div className="hero-highlights" aria-label="Creative services"></div>
      </div>
      <div className="hero-media" aria-label="Portfolio profile artwork">
        <div
          className="hero-card-wrapper"
          ref={wrapperRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
        >
          <TiltedCard
            imageSrc={heroImg}
            altText="My Portfolio"
            captionText="Mishall Clive B."
            containerHeight="clamp(360px, 42vw, 620px)"
            containerWidth="100%"
            imageHeight="clamp(360px, 42vw, 620px)"
            imageWidth="min(100%, clamp(360px, 42vw, 620px))"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text">Hover me!</p>
            }
          />
          <div ref={overlayRef} className="chroma-spotlight-overlay" />
        </div>
      </div>
    </section>
  )
}

export default Hero