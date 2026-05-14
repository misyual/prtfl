import { motion } from 'motion/react'
import './Footer.css'

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p>Built with React and Vite.</p>
      <motion.a href="#top" whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
        Back to top
      </motion.a>
    </motion.footer>
  )
}

export default Footer
