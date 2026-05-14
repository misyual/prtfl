import heroImg from '../assets/hero.png'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Frontend Developer</p>
        <h1>Hi, I build clean and useful web experiences.</h1>
        <p className="hero-text">
          I turn ideas into responsive interfaces with React, thoughtful layouts,
          and the kind of details that make a site feel easy to use.
        </p>
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
        <img src={heroImg} alt="" />
      </div>
    </section>
  )
}

export default Hero
