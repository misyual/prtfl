import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const excludedImages = new Set([
  'funny-cats-2-20250212.webp',
  'Pencil Case Eva Banner-Recovered.jpg',
  'Lazada Cover.jpg',
  'Shopee Banner.jpg',
])

const projectImages = Object.entries(
  import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
  }),
)
  .filter(([path]) => !excludedImages.has(path.split('/').pop()))
  .map(([path, image]) => ({
    image,
    title: path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, ''),
  }))

function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const projectsWithImages = useMemo(() => projectImages, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const getDistance = () => {
        const trackBox = track.getBoundingClientRect()
        const sectionBox = section.getBoundingClientRect()
        const rightPadding = window.innerWidth - sectionBox.right
        const visibleWidth = window.innerWidth - trackBox.left - rightPadding
        const endPadding = parseFloat(getComputedStyle(track).paddingRight) || 0

        return Math.max(0, track.scrollWidth - visibleWidth + endPadding)
      }

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2>Graphic Designs</h2>
      </div>
      <div className="project-gallery" ref={trackRef}>
        {projectsWithImages.map((project) => (
          <figure className="project-image" key={project.title}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                decoding="async"
                onLoad={() => ScrollTrigger.refresh()}
              />
            ) : (
              <div className="project-placeholder" aria-hidden="true" />
            )}
            <figcaption>{project.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Projects
