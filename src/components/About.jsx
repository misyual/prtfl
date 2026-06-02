import './About.css'
import ScrollFloat from './ScrollFloat';
import TextType from './TextType';

const skills = ['React JS', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'HTML/CSS']

function About() {
  return (
    <section className="section about-section" id="about">
      <div>
        <p className="eyebrow">About</p>
      </div>
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
      <div className="about-content">
        <TextType 
          text={["I focus on creating high-impact visual design with a strong emphasis on clean structure, intentional details, and memorable layouts. Whether designing branding assets, landing pages, or user interfaces, I leverage my front-end development skills to seamlessly bridge the gap between creative vision and functional, accessible digital products."]}
          typingSpeed={20}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          deletingSpeed={15}
          variableSpeedEnabled={false}
          variableSpeedMin={60}
          variableSpeedMax={120}
          cursorBlinkDuration={0.5}
        />
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
