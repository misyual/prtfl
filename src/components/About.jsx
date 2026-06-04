import './About.css'
import ScrollFloat from './ScrollFloat';
import TextType from './TextType';

const skills = ['React JS', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'HTML/CSS']

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-left">
        <p className="eyebrow">About</p>
        <ScrollFloat
          containerClassName="about-title"
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          A Graphic Designer & Front-End Developer
        </ScrollFloat>
      </div>
      <div className="about-content">
        <div className="about-text-container">
          <TextType
            text={["Hi!, I'm Mishall Clive, but you can call me Clive. I love designing by the way, I focus on creating high-impact visual designs, marketing materials, and smooth web interfaces. I treat code as an extension of my design toolkit—ensuring that the branding, typography, and layout I refine in Illustrator and Photoshop translate seamlessly into clean HTML, CSS, and modern frontend frameworks."]}
            typingSpeed={30}
            pauseDuration={4000}
            showCursor
            cursorCharacter="_"
            deletingSpeed={10}
            cursorBlinkDuration={0.5}
          />
        </div>
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
