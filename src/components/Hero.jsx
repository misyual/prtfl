import heroImg from '../assets/funny-cats-2-20250212.webp'
import './Hero.css'
import BlurText from './BlurText'
import TiltedCard from './TiltedCard'


function Hero() {
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
        <TiltedCard
          imageSrc={heroImg}
          altText="My Portfolio"
          captionText="Mishall Clive B .."
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
            <p className="tilted-card-demo-text">
            My Portfolio
            </p>
          }
        />
      </div>
    </section>
  )
}

export default Hero
