import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { getLenis } from '../lib/lenis'
import './Modal.css'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const EXIT_MS = 320

export default function Modal({ open, onClose, labelledBy, children }) {
  const panelRef = useRef(null)
  const restoreRef = useRef(null)

  const [phase, setPhase] = useState(open ? 'open' : 'closed')
  const [prevOpen, setPrevOpen] = useState(open)

  if (open !== prevOpen) {
    setPrevOpen(open)
    setPhase(open ? 'open' : 'closing')
  }

  // Fade out, then unmount on a timer. AnimatePresence is deliberately not
  // used here: it only drops the node once the exit animation finishes, and
  // that is rAF-gated, so the dialog could get stuck in the DOM.
  useEffect(() => {
    if (phase !== 'closing') return

    const timer = setTimeout(() => setPhase('closed'), EXIT_MS)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (!open) return

    restoreRef.current = document.activeElement
    const lenis = getLenis()
    const lockedScrollY = window.scrollY
    lenis?.stop()

    const root = document.documentElement
    const previousHtml = root.style.overflow
    const previousBody = document.body.style.overflow
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      root.style.overflow = previousHtml
      document.body.style.overflow = previousBody
      lenis?.start()
      lenis?.scrollTo(lockedScrollY, { immediate: true })

      const target = restoreRef.current
      if (target && typeof target.focus === 'function') {
        target.focus({ preventScroll: true })
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0,
      )

      if (!items.length) {
        event.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return

    const focusFirst = () => {
      const panel = panelRef.current
      if (!panel) return
      const target = panel.querySelector(FOCUSABLE) ?? panel
      target.focus({ preventScroll: true })
    }

    const frame = requestAnimationFrame(focusFirst)
    const retry = setTimeout(focusFirst, 90)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(retry)
    }
  }, [open])

  useEffect(() => {
    if (phase === 'closed') return

    const panel = panelRef.current
    if (!panel) return

    // Lenis listens for wheel/touch on window and calls preventDefault(), which
    // suppresses native scrolling inside this panel. stopPropagation() keeps the
    // event from reaching Lenis while still letting the browser scroll normally.
    const blockLenis = (event) => event.stopPropagation()
    panel.addEventListener('wheel', blockLenis, { passive: true })
    panel.addEventListener('touchmove', blockLenis, { passive: true })

    return () => {
      panel.removeEventListener('wheel', blockLenis)
      panel.removeEventListener('touchmove', blockLenis)
    }
  }, [phase])

  return createPortal(
    phase !== 'closed' && (
      <motion.div
        className="modal-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'closing' ? 0 : 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div className="modal-backdrop" onClick={onClose} />

        <motion.div
          ref={panelRef}
          className="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          tabIndex={-1}
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    ),
    document.body,
  )
}
