import { motion } from 'motion/react'
import heroImg from '../assets/funny-cats-2-20250212.webp'
import TextPressure from './TextPressure'
import TiltedCard from './TiltedCard'
import './Hero.css'


function Hero() {
  return (
    <motion.section
      className="hero-section"
      id="top"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
    >
      <motion.div className="hero-copy">
        <motion.p
          className="eyebrow"
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
        >
          Frontend Developer + Graphic Designer
        </motion.p>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <TextPressure text="Designing sharp visuals and building smooth web experiences" />
        </motion.h1>
        <motion.p
          className="hero-text"
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0 },
          }}
        >
          I combine layout, branding, and React development to create portfolio
          pages, digital graphics, and interfaces that feel polished from the
          first click.
        </motion.p>
        <motion.div
          className="hero-highlights"
          aria-label="Creative services"
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
        >
          {['Branding', 'Web UI', 'Posters'].map((item) => (
            <motion.span key={item} whileHover={{ y: -4, scale: 1.04 }}>
              {item}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          className="hero-actions"
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <motion.a
            className="button primary"
            href="#projects"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            View work
          </motion.a>
          <motion.a
            className="button secondary"
            href="#contact"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            Contact me
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-media"
        aria-label="Portfolio profile artwork"
        variants={{
          hidden: { opacity: 0, scale: 0.92, rotate: -4 },
          show: { opacity: 1, scale: 1, rotate: 0 },
        }}
      >
        <motion.div className="design-board">
          <TiltedCard
            imageSrc={heroImg}
            altText="Portfolio profile artwork"
            containerHeight="390px"
            containerWidth="100%"
            imageHeight="390px"
            imageWidth="100%"
            rotateAmplitude={10}
            scaleOnHover={1.03}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent
            overlayContent={
              <div className="board-header" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            }
          />
          <motion.div
            className="floating-card card-one"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <strong>Visual</strong>
            <span>Identity</span>
          </motion.div>
          <motion.div
            className="floating-card card-two"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <strong>React</strong>
            <span>Build</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
    
  )
}

export default Hero
