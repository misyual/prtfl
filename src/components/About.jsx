import { motion } from 'motion/react'
import './About.css'
import ElectricBorder from './ElectricBorder'
import TextType from './TextType'

const skills = ['React JS', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'HTML/CSS']

function About() {
  return (
    <ElectricBorder
      color="#7C3AED"
      speed={1}
      chaos={0.12}
      thickness={2}
      style={{ borderRadius: 16 }}
    >
      <motion.section
        className="section about-section"
        id="about"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div>
          <p className="eyebrow">About</p>
          <TextType text="A Graphic Designer & Front-End Developer" />
        </motion.div>
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
        >
          <p>
            I focus on creating high-impact visual design with a strong emphasis on 
            clean structure, intentional details, and memorable layouts. 
            Whether designing branding assets, landing pages, or user interfaces, 
            I leverage my front-end development skills to seamlessly bridge the gap between 
            creative vision and functional, accessible digital products.
          </p>
          <div className="skill-list" aria-label="Skills">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.section>
    <div>
      <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
      </p>
  </div>
</ElectricBorder>
  )
}

export default About
