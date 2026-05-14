import { motion } from 'motion/react'
import './Contact.css'

function Contact() {
  return (
    <motion.section
      className="section contact-section"
      id="contact"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s build something good.</h2>
        <p>
          Have a project, internship opportunity, or collaboration in mind? Send
          a message and I&apos;ll get back to you.
        </p>
      </div>
      <div className="contact-links" aria-label="Contact links">
        <motion.a
          href="mailto:hello@example.com"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          hello@example.com
        </motion.a>
        <motion.a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          GitHub
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          LinkedIn
        </motion.a>
      </div>
    </motion.section>
  )
}

export default Contact
