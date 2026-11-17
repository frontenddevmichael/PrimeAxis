import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cx } from '../lib/cx'
import { IconButton } from './Button'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Traps Tab inside `ref`, closes on Escape and restores focus on close. */
export function useFocusTrap(open: boolean, ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const el = ref.current
    const first = el?.querySelector<HTMLElement>('[data-autofocus]') ?? el?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? el)?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !el) return
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null)
      if (!items.length) return
      const head = items[0]
      const tail = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === head || !el.contains(document.activeElement))) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && (document.activeElement === tail || !el.contains(document.activeElement))) {
        e.preventDefault()
        head.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.({ preventScroll: true })
    }
  }, [open, ref])
}

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/** Centred dialog (bottom sheet on phones). */
export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  return createPortal(
    <AnimatePresence>{open && <ModalPanel {...{ onClose, title, description, className }}>{children}</ModalPanel>}</AnimatePresence>,
    document.body,
  )
}

function ModalPanel({ onClose, title, description, children, className }: Omit<ModalProps, 'open'>) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  useFocusTrap(true, ref, onClose)
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div className="absolute inset-0 bg-scrim/50 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={description ? `${id}-desc` : undefined}
        tabIndex={-1}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          'relative max-h-[92svh] w-full overflow-y-auto rounded-t-[var(--radius-card)] bg-card p-6 shadow-[var(--shadow-float)] focus:outline-none sm:max-w-lg sm:rounded-[var(--radius-card)] sm:p-8',
          className,
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id={`${id}-title`} className="display text-[2rem] leading-[0.95]">
              {title}
            </h2>
            {description && (
              <p id={`${id}-desc`} className="mt-2 text-[15px] text-muted">
                {description}
              </p>
            )}
          </div>
          <IconButton aria-label="Close" size="sm" tone="outline" onClick={onClose} className="-mt-1 -mr-1">
            <X className="size-4" />
          </IconButton>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

/** Full-height panel sliding in from the right (the site menu). */
export function Drawer({ open, onClose, label, children, tone = 'night' }: { open: boolean; onClose: () => void; label: string; children: ReactNode; tone?: 'night' | 'white' }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <DrawerPanel onClose={onClose} label={label} tone={tone}>
          {children}
        </DrawerPanel>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function DrawerPanel({ onClose, label, children, tone }: { onClose: () => void; label: string; children: ReactNode; tone: 'night' | 'white' }) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(true, ref, onClose)
  return (
    <div className="fixed inset-0 z-[80]">
      <motion.div className="absolute inset-0 bg-scrim/40 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        initial={{ x: '104%' }}
        animate={{ x: 0 }}
        exit={{ x: '104%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          'absolute top-2 right-2 bottom-2 flex w-[min(560px,calc(100%-16px))] flex-col overflow-y-auto rounded-[var(--radius-card)] p-6 focus:outline-none sm:p-8',
          tone === 'night' ? 'on-dark bg-night text-white' : 'bg-card text-ink',
        )}
      >
        <div className="flex justify-end">
          <IconButton aria-label="Close menu" tone={tone === 'night' ? 'light' : 'ink'} onClick={onClose}>
            <X className="size-5" />
          </IconButton>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Toasts

type Toast = { id: number; message: ReactNode }
const ToastContext = createContext<(message: ReactNode) => void>(() => {})

/** Small status message bottom-centre, announced politely to screen readers. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const next = useRef(1)
  const push = useCallback((message: ReactNode) => {
    const id = next.current++
    setToasts((t) => [...t.slice(-2), { id, message }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400)
  }, [])
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="round rounded-full bg-violet px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-violet)]"
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
