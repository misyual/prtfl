import { motion } from 'motion/react'
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
    <motion.section
      className="projects-section"
      id="projects"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2>Selected work</h2>
      </motion.div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
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
                <motion.span key={tag} whileHover={{ scale: 1.06 }}>
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

export default Projects
