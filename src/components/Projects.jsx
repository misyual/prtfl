import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const excludedImages = new Set([
  'me.jpg',
  'Pencil Case Eva Banner-Recovered.jpg',
  'Lazada Cover.jpg',
  'Shopee Banner.jpg',
  'Blossom-Cover3-scaled.png',
  'Journaling-Cover-Recovered-scaled (1).jpg',
  'Medal-and-Certificate-Banner-scaled.jpg',
  'photo_2025-12-18_16-34-14.jpg',
  'design2.jpg',
  'design1.jpg',
])

// Case-study screenshots live in their own folders and are shown in the
// UI/UX modal instead, so keep them out of this poster/product gallery.
const excludedFolders = new Set(['API', 'starbright'])

const titleCase = (file) =>
  file
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\bscaled\b/gi, '')
    .replace(/\brecovered\b/gi, '')
    .replace(/\(\d+\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const projectImages = Object.entries(
  import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
  }),
)
  .filter(([path]) => {
    const segments = path.split('/')
    if (segments.slice(2, -1).some((folder) => excludedFolders.has(folder))) return false
    return !excludedImages.has(segments[segments.length - 1])
  })
  .map(([path, image], i) => ({
    image,
    id: `${path}-${i}`,
    index: String(i + 1).padStart(2, '0'),
    title: titleCase(path.split('/').pop()),
  }))

function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const projectsWithImages = useMemo(() => projectImages, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track || projectsWithImages.length < 4) {
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
          onUpdate: (self) => setProgress(self.progress),
        },
      })
    }, section)

    return () => ctx.revert()
  }, [projectsWithImages.length])

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="section-head projects-head">
        <p className="eyebrow">Projects</p>
        <div className="projects-head__row">
          <h2>Product &amp; Poster Designs</h2>
          <p className="section-lede">
            Brand collateral, packaging artwork and campaign pieces — built to read clearly at
            thumbnail size and hold up in print.
          </p>
        </div>
      </div>

      <div className="project-gallery" ref={trackRef}>
        {projectsWithImages.map((project) => (
          <Reveal className="project-image" as="figure" key={project.id} y={40} amount={0.1}>
            {project.image ? (
              <div className="project-frame">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className="project-meta">
                  <span className="project-index">{project.index}</span>
                  <figcaption className="project-caption">{project.title}</figcaption>
                </div>
                <span className="project-sheen" aria-hidden="true" />
              </div>
            ) : (
              <div className="project-placeholder" aria-hidden="true" />
            )}
          </Reveal>
        ))}
      </div>

      <div className="projects-progress" ref={progressRef} aria-hidden="true">
        <span className="projects-progress-count">
          {String(projectsWithImages.length).padStart(2, '0')} works
        </span>
        <span className="projects-progress-track">
          <span className="projects-progress-bar" style={{ transform: `scaleX(${progress})` }} />
        </span>
      </div>
    </section>
  )
}

export default Projects
