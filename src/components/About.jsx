import { motion } from 'motion/react'
import './About.css'

const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', 'Git']

function About() {
  return (
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
        <h2>A developer focused on simple, polished interfaces.</h2>
      </motion.div>
      <motion.div
        className="about-content"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
      >
        <p>
          I enjoy creating portfolio sites, landing pages, and app screens that
          are fast, accessible, and easy to understand. My work starts with clear
          structure, then adds visual detail where it helps the user.
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
  )
}

export default About
