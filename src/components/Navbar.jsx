import { motion } from 'motion/react'
import './Navbar.css'
import GooeyNav from './GooeyNav'

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
      <div className="navbar-links">
        <GooeyNav
          items={navLinks}
          particleCount={20}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
    </motion.header>
  )
}

export default Navbar