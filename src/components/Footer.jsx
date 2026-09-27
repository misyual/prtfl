import Marquee from './Marquee'
import './Footer.css'

const socials = [
  { label: 'GitHub', href: 'https://github.com/misyual' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mishall-clive-b6150a324' },
  { label: 'Email', href: 'mailto:clivemishall@gmail.com' },
]

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <Marquee items={['Let us build something', 'Get in touch']} speed={15} separator="" />
      </div>

      <div className="footer-base">
        <p className="footer-copy">&copy; {year} Mishall Clive. All rights reserved.</p>
        <a className="footer-top" href="#top">
          Back to top
          <span aria-hidden="true">&#8593;</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer