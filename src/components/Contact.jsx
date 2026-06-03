import './Contact.css'

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let's craft something beautiful.</h2>
        <p>
          Open for creative collaborations, UI design projects, Graphic design work, 
          and frontend development opportunities. Drop a message and let's get to work.
        </p>
      </div>
      <div className="contact-links" aria-label="Contact links">
        <a href="mailto:clivemishall@gmail.com">
          clivemishall@gmail.com
        </a>
        <a
          href="https://github.com/misyual"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mishall-clive-b6150a324 "
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default Contact
