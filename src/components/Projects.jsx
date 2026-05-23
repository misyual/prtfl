import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import './Projects.css'

const uploadedImages = Object.values(
  import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
  }),
)

const projects = [
  {
    title: 'Product Ecommerce Cover Design',
    description:
      'Custom product cover designs for Shopee, Tiktok, and Lazada of Starbright, featuring clean layouts, product highlights, and branding elements to make listings more appealing and professional.',
    tags: ['Product Design', 'Ecommerce'],
    preview: 'brand',
    imageIndexes: [0],
  },
  {
    title: 'Ecommerce Banners Design',
    description:
      'Modern ecommerce banner designs for promotions, sales, and social media marketing, created to attract customers and improve online engagement.',
    tags: ['Banners', 'Ecommerce'],
    preview: 'social',
    imageIndexes: [1, 0],
  },
  {
    title: 'Online FlipBook Catalog',
    description:
      'Event posters, promotional flyers, and print-ready designs with strong visual hierarchy.Interactive digital catalog designs for showcasing products, services, or collections in a clean and organized flipbook presentation.',
    tags: ['System', 'Catalog'],
    preview: 'poster',
    imageIndexes: [0, 1],
  },
]

function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const projectsWithImages = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        images: uploadedImages,
        previewImage: uploadedImages[project.imageIndexes[0]],
      })),
    [],
  )

  const selectedProject =
    activeProject === null ? null : projectsWithImages[activeProject]
  const selectedImage = selectedProject?.images[activeImageIndex]

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
      }

      if (event.key === 'ArrowRight' && selectedProject.images.length > 1) {
        setActiveImageIndex((current) =>
          current === selectedProject.images.length - 1 ? 0 : current + 1,
        )
      }

      if (event.key === 'ArrowLeft' && selectedProject.images.length > 1) {
        setActiveImageIndex((current) =>
          current === 0 ? selectedProject.images.length - 1 : current - 1,
        )
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [selectedProject])

  const openProject = (index) => {
    setActiveProject(index)
    setActiveImageIndex(0)
  }

  const projectModal =
    selectedProject &&
    createPortal(
      <motion.div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveProject(null)}
      >
        <motion.div
          className="project-modal-panel"
          initial={{ y: 32, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="modal-close"
            aria-label="Close project images"
            onClick={() => setActiveProject(null)}
          >
            x
          </button>
          <div className="modal-copy">
            <p className="eyebrow">Project preview</p>
            <h3 id="project-modal-title">{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>
          </div>
          <div className="modal-image-stage">
            {selectedImage ? (
              <img src={selectedImage} alt={selectedProject.title} />
            ) : (
              <div className={`project-preview ${selectedProject.preview}`}>
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
          {selectedProject.images.length > 1 && (
            <div className="modal-thumbnails">
              {selectedProject.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={index === activeImageIndex ? 'active' : ''}
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>,
      document.body,
    )

  return (
    <>
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
          {projectsWithImages.map((project, index) => (
            <motion.button
              type="button"
              className="project-card"
              key={project.title}
              onClick={() => openProject(index)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className={`project-preview ${project.preview}`}>
                {project.previewImage ? (
                  <img src={project.previewImage} alt="" loading="lazy" />
                ) : (
                  <>
                    <span />
                    <span />
                    <span />
                  </>
                )}
                <small className="view-label">View images</small>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list" aria-hidden="true">
                {project.tags.map((tag) => (
                  <motion.span key={tag} whileHover={{ scale: 1.06 }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {projectModal}
    </>
  )
}

export default Projects
