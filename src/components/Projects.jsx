import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
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
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={() => setActiveProject(null)}
      >
        <div
          className="project-modal-panel"
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
        </div>
      </div>,
      document.body,
    )

  return (
    <>
      <section className="projects-section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>Selected work</h2>
        </div>
        <div className="project-grid">
          {projectsWithImages.map((project, index) => (
            <button
              type="button"
              className="project-card"
              key={project.title}
              onClick={() => openProject(index)}
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
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {projectModal}
    </>
  )
}

export default Projects
