import './About.css'

const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', 'Git']

function About() {
  return (
    <section className="section about-section" id="about">
      <div>
        <p className="eyebrow">About</p>
        <h2>A developer focused on simple, polished interfaces.</h2>
      </div>
      <div className="about-content">
        <p>
          I enjoy creating portfolio sites, landing pages, and app screens that
          are fast, accessible, and easy to understand. My work starts with clear
          structure, then adds visual detail where it helps the user.
        </p>
        <div className="skill-list" aria-label="Skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
