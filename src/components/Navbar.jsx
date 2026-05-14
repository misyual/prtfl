import './Navbar.css'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#top" aria-label="Go to top">
        Portfolio
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
