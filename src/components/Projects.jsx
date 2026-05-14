import './Projects.css'

const projects = [
  {
    title: 'Brand Identity Design',
    description:
      'Logo concepts, color palettes, typography choices, and visual guidelines for a clear brand look.',
    tags: ['Logo', 'Branding', 'Typography'],
    preview: 'brand',
  },
  {
    title: 'Social Media Graphics',
    description:
      'Scroll-stopping post layouts, campaign graphics, and story templates made for digital platforms.',
    tags: ['Canva', 'Layout', 'Content'],
    preview: 'social',
  },
  {
    title: 'Poster and Print Design',
    description:
      'Event posters, promotional flyers, and print-ready designs with strong visual hierarchy.',
    tags: ['Poster', 'Flyer', 'Print'],
    preview: 'poster',
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
            <div
              className={`project-preview ${project.preview}`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
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
