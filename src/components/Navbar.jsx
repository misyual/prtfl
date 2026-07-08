import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Graphic', href: '#projects' },
  { label: 'Banners', href: '#banners' },
  { label: 'UI/UX', href: '#web-designs' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar-logo" href="#top" aria-label="Back to top">
        Portfolio
      </a>
      <nav className="navbar-links">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-item"
          >
            <span className="nav-label">{link.label}</span>
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
