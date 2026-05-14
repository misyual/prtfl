import { motion } from 'motion/react'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <a className="navbar-logo" href="#top" aria-label="Back to top">
        Portfolio
      </a>
      <nav className="navbar-links" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {link.label}
          </motion.a>
        ))}
      </nav>
    </motion.header>
  )
}

export default Navbar
