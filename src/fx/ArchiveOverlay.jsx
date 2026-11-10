import Modal from '../components/Modal'

export default function ArchiveOverlay({ open, items, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="archive-title">
      <div className="border-b border-line px-6 py-5 sm:px-8">
        <p className="chapter-label">Archive</p>
        <h2 id="archive-title" className="mt-3 display-md">
          Every piece, <span className="serif-em text-accent">unfiltered.</span>
        </h2>
        <p className="mt-2 max-w-lg text-sm text-cream/60">
          The full set of graphic and product work — including pieces outside the main story.
        </p>
      </div>

      <div className="archive-grid">
        {items.map((item) => (
          <figure className="archive-item" key={item.id}>
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
              width="600"
              height="800"
            />
            <figcaption className="archive-item__label">
              {item.title}
              <span className="ml-2 text-cream/56">{item.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <button type="button" className="modal-close" onClick={onClose} aria-label="Close archive">
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
    </Modal>
  )
}
