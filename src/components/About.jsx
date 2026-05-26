import './About.css'

const skills = ['React JS', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'HTML/CSS']

function About() {
  return (
    <section className="section about-section" id="about">
      <div>
        <p className="eyebrow">About</p>
        <h2>A Graphic Designer & Front-End Developer</h2>
      </div>
      <div className="about-content">
        <p>
          I focus on creating high-impact visual design with a strong emphasis on 
          clean structure, intentional details, and memorable layouts. 
          Whether designing branding assets, landing pages, or user interfaces, 
          I leverage my front-end development skills to seamlessly bridge the gap between 
          creative vision and functional, accessible digital products.
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
