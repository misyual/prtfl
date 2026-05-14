import './Projects.css'

const projects = [
  {
    title: 'Personal Portfolio',
    description:
      'A responsive portfolio page with project highlights, contact details, and a clean visual system.',
    tags: ['React', 'CSS', 'Vite'],
  },
  {
    title: 'Task Dashboard',
    description:
      'A compact dashboard concept for tracking daily tasks, priorities, and progress in one place.',
    tags: ['UI Design', 'JavaScript'],
  },
  {
    title: 'Product Landing Page',
    description:
      'A focused landing page layout with a strong first screen, concise copy, and mobile-friendly sections.',
    tags: ['HTML', 'CSS', 'Responsive'],
  },
]

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2>Selected work</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
