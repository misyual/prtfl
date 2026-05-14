import './Contact.css'

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s build something good.</h2>
        <p>
          Have a project, internship opportunity, or collaboration in mind? Send
          a message and I&apos;ll get back to you.
        </p>
      </div>
      <div className="contact-links" aria-label="Contact links">
        <a href="mailto:hello@example.com">hello@example.com</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default Contact
