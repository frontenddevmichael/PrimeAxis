import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { useId, useState } from 'react'

import { cx } from '../lib/cx'
import { IconButton } from './Button'

/** Client names scrolling sideways. Pauses on hover; static with reduced motion. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useTransform(velocity, [-2000, 0, 2000], [-3, 0, 3], { clamp: true })
  const smooth = useSpring(skew, { stiffness: 160, damping: 28, mass: 0.4 })
  return (
    <div className={cx('marquee-mask group overflow-hidden', className)}>
      <motion.div style={reduce ? undefined : { skewX: smooth }} className="w-max">
        <ul className="flex w-max animate-marquee gap-14 py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none" aria-label="Clients">
          {[...items, ...items].map((c, i) => (
            <li key={`${c}-${i}`} aria-hidden={i >= items.length || undefined} className="flex items-center gap-14 text-[clamp(1.6rem,1.2rem+1.2vw,2.5rem)] font-medium tracking-[-0.045em] whitespace-nowrap uppercase">
              {c}
              <svg viewBox="0 0 20 20" className="size-4 text-violet" aria-hidden>
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="10" cy="10" r="3.6" fill="currentColor" />
              </svg>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

type Quote = { quote: string; name: string; role: string }

/** One quote at a time with previous/next buttons and a position readout. */
export function TestimonialSlider({ items, tone = 'violet' }: { items: Quote[]; tone?: 'violet' | 'white' }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const go = (d: number) => {
    setDir(d)
    setI((n) => (n + d + items.length) % items.length)
  }
  const q = items[i]
  const light = tone === 'violet'
  return (
    <div className="flex h-full flex-col" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="relative min-h-[15rem] flex-1 sm:min-h-[13rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.figure
            key={i}
            custom={dir}
            initial={{ opacity: 0, x: 30 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 * dir }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <blockquote className="text-[clamp(1.4rem,1rem+1.3vw,2.4rem)] leading-[1.08] font-normal tracking-[-0.035em] text-balance">“{q.quote}”</blockquote>
            <figcaption className="mt-6">
              <span className="block font-medium">{q.name}</span>
              <span className={cx('block text-sm', light ? 'text-white/80' : 'text-muted')}>{q.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="caps tabular-nums" aria-hidden>
          {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <div className="flex gap-2">
          <IconButton aria-label="Previous testimonial" tone={light ? 'light' : 'outline'} onClick={() => go(-1)}>
            <ArrowLeft className="size-5" />
          </IconButton>
          <IconButton aria-label="Next testimonial" tone={light ? 'light' : 'ink'} onClick={() => go(1)}>
            <ArrowRight className="size-5" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

/** Question list where one answer opens at a time. */
export function Accordion({ items, defaultOpen = 0, forceOpen }: { items: { q: string; a: string }[]; defaultOpen?: number | null; forceOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = forceOpen === i || open === i
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[clamp(1.1rem,1rem+0.4vw,1.4rem)] font-medium tracking-[-0.03em] transition-colors hov:text-violet"
              >
                {item.q}
                <span className={cx('round grid size-10 shrink-0 place-items-center rounded-full border transition-colors', isOpen ? 'border-violet bg-violet text-white' : 'border-line-strong group-hov:border-violet')}>
                  {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

/** Numbered steps for multi-step forms. */
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Progress">
      {steps.map((s, i) => (
        <li key={s} aria-current={i === current ? 'step' : undefined} className="flex flex-col gap-2">
          <span className={cx('round h-1.5 rounded-full transition-colors duration-[var(--duration-base)]', i <= current ? 'bg-violet' : 'bg-line')} />
          <span className={cx('text-[13px]', i === current ? 'font-medium text-ink' : 'text-muted')}>
            <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> <span className="hidden sm:inline">{s}</span>
            {i === current && <span className="sr-only">, current step</span>}
            {i < current && <span className="sr-only">, done</span>}
          </span>
        </li>
      ))}
    </ol>
  )
}
