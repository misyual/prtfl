import ScrollFloat from './ScrollFloat'
import TextType from './TextType'
import Reveal from './Reveal'
import { SiClaude, SiOpencode, SiGooglegemini } from 'react-icons/si'
import { RiOpenaiFill } from 'react-icons/ri'
import './About.css'

const skills = ['React', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'HTML/CSS', 'CapCut']

const aiTools = [
  { name: 'Claude', Icon: SiClaude },
  { name: 'opencode', Icon: SiOpencode },
  { name: 'ChatGPT', Icon: RiOpenaiFill },
  { name: 'Gemini', Icon: SiGooglegemini },
]

const stats = [
  { value: '1', label: 'Year crafting' },
  { value: '3', label: 'Projects delivered' },
  { value: '20+', label: 'Company product designs' },
]

const aboutCopy =
  "Hi, I'm Mishall Clive, but you can call me Clive. I love designing by the way — I focus on creating high-impact visual designs, marketing materials, and smooth web interfaces. I treat code as an extension of my design toolkit, ensuring that the branding, typography, and layout I refine in Illustrator and Photoshop translate seamlessly into clean HTML, CSS, and modern frontend frameworks."

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-grid">
        <div className="about-main">
          <p className="eyebrow about-eyebrow">About</p>

          <ScrollFloat
            containerClassName="about-title"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            A Graphic Designer & Front-End Developer
          </ScrollFloat>

          <div className="about-text-container">
            <TextType
              text={[aboutCopy]}
              typingSpeed={18}
              pauseDuration={6000}
              showCursor
              cursorCharacter="_"
              deletingSpeed={8}
              cursorBlinkDuration={0.5}
            />
          </div>
        </div>

        <Reveal className="about-toolkit" delay={0.1} y={20}>
          <div className="toolkit-block">
            <p className="about-toolkit-label">Software I use</p>
            <ul className="skill-list" aria-label="Skills and tools">
              {skills.map((skill) => (
                <li key={skill}>
                  <span className="tag">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="toolkit-divider" />

          <div className="toolkit-block">
            <p className="about-toolkit-label">AI I use</p>
            <ul className="ai-list" aria-label="AI tools I use">
              {aiTools.map(({ name, Icon }) => (
                <li key={name}>
                  <span className="tag ai-tag">
                    <Icon className="ai-icon" aria-hidden="true" />
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="about-stats" delay={0.15}>
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

export default About
