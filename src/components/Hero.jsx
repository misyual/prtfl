import heroImg from '../assets/hero.png'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Frontend Developer + Graphic Designer</p>
        <h1>
          Designing sharp visuals and building smooth web experiences.
        </h1>
        <p className="hero-text">
          I combine layout, branding, and React development to create portfolio
          pages, digital graphics, and interfaces that feel polished from the
          first click.
        </p>
        <div className="hero-highlights" aria-label="Creative services">
          <span>Branding</span>
          <span>Web UI</span>
          <span>Posters</span>
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
        <div className="design-board">
          <div className="board-header">
            <span />
            <span />
            <span />
          </div>
          <img src={heroImg} alt="" />
          <div className="floating-card card-one">
            <strong>Visual</strong>
            <span>Identity</span>
          </div>
          <div className="floating-card card-two">
            <strong>React</strong>
            <span>Build</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
