import { useCallback, useState } from 'react'
import apiOverview from '../assets/API/design1.jpg'
import apiDashboard from '../assets/API/Dashboard.jpg'
import apiProduct from '../assets/API/Product.jpg'
import apiOrder from '../assets/API/Order.jpg'
import apiReports from '../assets/API/Reports.jpg'
import apiComponents from '../assets/API/Components.jpg'
import apiModal from '../assets/API/Modal.jpg'
import apiUser from '../assets/API/User.jpg'
import apiBranch from '../assets/API/Branch.jpg'
import starOverview from '../assets/starbright/design2.jpg'
import starCover from '../assets/starbright/Cover.jpg'
import starAbout from '../assets/starbright/About.jpg'
import starProduct from '../assets/starbright/product.jpg'
import starFaq from '../assets/starbright/FAQ.jpg'
import starLocation from '../assets/starbright/location.jpg'
import starFullPage from '../assets/starbright/Screenshot 2026-09-27 220337.jpg'
import Reveal from './Reveal'
import Modal from './Modal'
import './WebDesigns.css'

/*
 * To add more images to a case study, drop the files in src/assets,
 * import them here, and append to that project's `gallery` array.
 */
const designs = [
  {
    id: 1,
    title: 'E-commerce API UI',
    category: 'Dashboard',
    cover: apiOverview,
    year: '2025',
    role: 'UI Design · Front-End',
    client: 'E-commerce Team',
    tools: ['Figma', 'Laravel/Inertia', 'React', 'Tailwind'],
    summary:
      'Built the internal multi-channel order management dashboard from scratch, designing a unified component system across order, branch, and user management screens.',
    challenge:
      'The team needed a single tool to manage orders synced from Shopee, TikTok, and Lazada, along with branches and user accounts — with no existing dashboard to build on, every screen, component, and interaction pattern had to be designed and built from zero.',
    approach:
      'Designed the UI in Figma around a consistent visual language — amber/orange gradient table headers, icon-only action buttons, and pill-style search bars — then built it in a Laravel/Inertia + React + Tailwind stack across the Branches, User Management, and Orders/Waybills pages.',
    outcome:
      'Delivered a working dashboard with a defined button hierarchy and hover/active state system, plus a Reports section concept (per-channel revenue breakdowns and period-over-period comparisons) built on the same design foundation.',
    gallery: [
      { src: apiOverview, label: 'Overview' },
      { src: apiDashboard, label: 'Dashboard' },
      { src: apiProduct, label: 'Product' },
      { src: apiOrder, label: 'Order' },
      { src: apiReports, label: 'Reports' },
      { src: apiComponents, label: 'Components' },
      { src: apiModal, label: 'Modal' },
      { src: apiUser, label: 'User' },
      { src: apiBranch, label: 'Branch' },
    ],
  },
  {
    id: 2,
    title: 'starbright.com.ph UI Redesign',
    category: 'Whole Site',
    cover: starOverview,
    year: '2025',
    role: 'Art Direction · UI Design',
    client: 'Starbright',
    tools: ['Figma', 'WordPress', 'WooCommerce'],
    summary:
      'Redesigned every page of the Starbright Office Depot WordPress/WooCommerce site, refreshing the visual direction and rebuilding UI elements site-wide.',
    challenge:
      'The existing site had an outdated look and inconsistent UI across pages, with issues like unreliable asset hosting affecting things as basic as footer icons rendering properly.',
    approach:
      'Redesigned the site page by page in Figma and Illustrator, then implemented the new direction directly in WordPress/WooCommerce — including rebuilding the footer\'s social and payment icon row and fixing asset delivery by moving icons into the WordPress Media Library with full file URLs.',
    outcome:
      'A consistently redesigned site across all pages, with resolved asset-hosting issues ensuring UI elements like footer icons render reliably.',
    gallery: [
      { src: starOverview, label: 'Overview' },
      { src: starCover, label: 'Cover' },
      { src: starAbout, label: 'About' },
      { src: starProduct, label: 'Products' },
      { src: starFaq, label: 'FAQ' },
      { src: starLocation, label: 'Location' },
      { src: starFullPage, label: 'Full page' },
    ],
  },
]

function WebDesigns() {
  const [activeId, setActiveId] = useState(null)
  const active = designs.find((design) => design.id === activeId) ?? null
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openCase = (id) => {
    setGalleryIndex(0)
    setActiveId(id)
  }

  const closeCase = useCallback(() => setActiveId(null), [])

  return (
    <section className="section web-designs-section" id="web-designs">
      <div className="section-head web-designs-head">
        <p className="eyebrow">UI/UX</p>
        <div className="web-designs-head__row">
          <h2>Interface &amp; Experience Design</h2>
          <p className="section-lede">
            Wireframes through handoff — layouts built on a real grid, with type scales and
            spacing systems that survive contact with code.
          </p>
        </div>
      </div>

      <div className="web-designs-grid">
        {designs.map((design, i) => (
          <Reveal
            as="article"
            key={design.id}
            className="web-design-card"
            delay={i * 0.08}
            y={34}
          >
            <button
              type="button"
              className="web-design-toggle"
              aria-haspopup="dialog"
              onClick={() => openCase(design.id)}
            >
              <span className="web-design-media">
                <img
                  src={design.cover}
                  alt={design.title}
                  className="web-design-image"
                  loading="lazy"
                  decoding="async"
                />
                <span className="web-design-media-sheen" aria-hidden="true" />
                <span className="web-design-index">
                  {String(design.id).padStart(2, '0')}
                </span>
              </span>

              <span className="web-design-info">
                <span className="web-design-category">{design.category}</span>
                <h3 className="web-design-title">{design.title}</h3>
                <span className="web-design-tools">
                  {design.tools.map((tool) => (
                    <span className="web-design-tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </span>
                <span className="web-design-hint" aria-hidden="true">
                  More Details
                  <span className="web-design-hint-arrow">&#8594;</span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={closeCase}
        labelledBy="web-design-modal-title"
      >
        {active && (
          <>
            <div className="case-gallery">
              <div className="case-gallery-stage">
                <img
                  className="case-gallery-image"
                  src={active.gallery[galleryIndex]?.src ?? active.cover}
                  alt={`${active.title} — ${active.gallery[galleryIndex]?.label ?? 'overview'}`}
                  decoding="async"
                />
              </div>

              <div className="case-gallery-bar">
                <span className="case-gallery-label">
                  {active.gallery[galleryIndex]?.label ?? 'Overview'}
                </span>
                <span className="case-gallery-count">
                  {galleryIndex + 1} / {active.gallery.length}
                </span>
              </div>

              <div className="case-gallery-thumbs">
                {active.gallery.map((item, index) => (
                  <button
                    type="button"
                    key={item.src}
                    className={`case-thumb ${index === galleryIndex ? 'is-active' : ''}`.trim()}
                    aria-label={`Show ${item.label}`}
                    aria-current={index === galleryIndex}
                    onClick={() => setGalleryIndex(index)}
                  >
                    <img src={item.src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>

            <div className="case-body">
              <p className="case-category">{active.category}</p>
              <h2 className="case-title" id="web-design-modal-title">
                {active.title}
              </h2>

              <dl className="case-meta">
                <div>
                  <dt>Year</dt>
                  <dd>{active.year}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{active.role}</dd>
                </div>
                <div>
                  <dt>Client</dt>
                  <dd>{active.client}</dd>
                </div>
              </dl>

              <p className="case-summary">{active.summary}</p>

              <div className="case-details">
                <div>
                  <h3>Challenge</h3>
                  <p>{active.challenge}</p>
                </div>
                <div>
                  <h3>Approach</h3>
                  <p>{active.approach}</p>
                </div>
                <div>
                  <h3>Outcome</h3>
                  <p>{active.outcome}</p>
                </div>
              </div>

              <div className="web-design-tools case-tools">
                {active.tools.map((tool) => (
                  <span className="web-design-tag" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <button type="button" className="modal-close" onClick={closeCase} aria-label="Close case study">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          </>
        )}
      </Modal>
    </section>
  )
}

export default WebDesigns
