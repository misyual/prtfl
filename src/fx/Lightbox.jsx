import { useEffect } from 'react'
import Modal from '../components/Modal'

export default function Lightbox({ open, items, index, onIndex, onClose }) {
  const item = items[index]

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onIndex((index + 1) % items.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onIndex((index - 1 + items.length) % items.length)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, index, items.length, onIndex])

  return (
    <Modal open={open} onClose={onClose} labelledBy="lightbox-title">
      {item ? (
        <figure className="lightbox-figure">
          <img src={item.src} alt={item.title} decoding="async" />
          <div className="lightbox-bar">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/56">
                {item.category}
              </p>
              <h2
                id="lightbox-title"
                className="mt-1 font-display text-lg font-medium tracking-tight text-cream"
              >
                {item.title}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-cream/56 tabular-nums">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <div className="lightbox-nav">
                <button
                  type="button"
                  className="lightbox-btn"
                  aria-label="Previous work"
                  onClick={() => onIndex((index - 1 + items.length) % items.length)}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M10 3 5 8l5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="lightbox-btn"
                  aria-label="Next work"
                  onClick={() => onIndex((index + 1) % items.length)}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="m6 3 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </figure>
      ) : null}

      <button type="button" className="modal-close" onClick={onClose} aria-label="Close lightbox">
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
