import { useState } from 'react'
import { motion } from 'motion/react'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [active, setActive] = useState(0)

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
      <nav className="navbar-links">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={'nav-item' + (active === i ? ' nav-item--active' : '')}
            onClick={(e) => setActive(i)}
          >
            {active === i && (
              <motion.span
                className="nav-pill"
                layoutId="nav-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="nav-label">{link.label}</span>
          </a>
        ))}
      </nav>
    </motion.header>
  )
}

export default Navbar