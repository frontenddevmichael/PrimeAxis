import { ArrowUpRight } from 'lucide-react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from 'motion/react'
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

import { IMAGES, type ImageKey } from '../data'
import { cx } from '../lib/cx'
import { EASE } from './Motion'

/** The violet "Reach out ↗" link: caps text with an arrow that nudges on hover. */
export function ArrowLink({
  className,
  tone = 'violet',
  size = 'md',
  children,
  ...rest
}: LinkProps & { tone?: 'violet' | 'ink' | 'light'; size?: 'sm' | 'md' | 'lg'; 'data-force'?: string }) {
  return (
    <Link
      className={cx(
        'group inline-flex min-h-11 items-center gap-1.5 font-medium uppercase tracking-[-0.02em] transition-colors duration-[var(--duration-fast)]',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-[clamp(1.1rem,0.9rem+0.6vw,1.6rem)]',
        size === 'lg' && 'text-[clamp(1.4rem,1rem+1.2vw,2.25rem)]',
        tone === 'violet' && 'text-violet hov:text-violet-deep',
        tone === 'ink' && 'text-ink hov:text-violet',
        tone === 'light' && 'on-dark text-white hov:text-violet-light',
        className,
      )}
      {...rest}
    >
      {children}
      <ArrowUpRight
        className="size-[1.15em] shrink-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hov:translate-x-0.5 group-hov:-translate-y-0.5"
        strokeWidth={1.6}
        aria-hidden
      />
    </Link>
  )
}

/** The circle-in-a-ring mark and wordmark. */
export function Logo({ wordmark = false, className, light = false }: { wordmark?: boolean; className?: string; light?: boolean }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="13" fill="none" stroke={light ? '#fff' : 'var(--color-violet)'} strokeWidth="2.4" />
        <circle cx="16" cy="16" r="6.5" fill={light ? '#fff' : 'var(--color-violet)'} />
      </svg>
      {wordmark && <span className="text-lg font-semibold tracking-[-0.04em]">Prime Axis</span>}
    </span>
  )
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ delay = 0, y = 44, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      {...rest}
    />
  )
}

/** A photo from IMAGES in a frame. `zoom` scales it on parent hover (add `group`). `parallax` drifts it as the page scrolls. */
export function Photo({
  image,
  ratio,
  zoom = false,
  parallax = false,
  className,
  imgClassName,
  alt,
  ...rest
}: { image: ImageKey; ratio?: string; zoom?: boolean; parallax?: boolean; imgClassName?: string } & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>) {
  const p = IMAGES[image]
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] as const })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const moving = parallax && !reduce
  const img = (
    <img
      src={p.src}
      alt={alt ?? p.alt}
      loading="lazy"
      decoding="async"
      className={cx(
        'size-full object-cover',
        !moving && 'absolute inset-0',
        zoom && !moving && 'transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hov:scale-[1.04]',
        imgClassName,
      )}
      {...rest}
    />
  )
  return (
    <div ref={ref} className={cx('relative overflow-hidden bg-soft', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      {moving ? (
        <motion.div style={{ y, scale: 1.18 }} className="absolute inset-0">
          {img}
        </motion.div>
      ) : (
        img
      )}
    </div>
  )
}

/** Counts up to `value` the first time it is seen. */
export function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!seen) return
    if (reduce) {
      setN(value)
      return
    }
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, value, reduce])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

/** "+300 / Success project": the figure with a small violet plus and a two-line caps label. */
export function Stat({ value, label, align = 'center', tone = 'ink' }: { value: number; label: string[]; align?: 'center' | 'left'; tone?: 'ink' | 'light' }) {
  return (
    <div className={cx('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start text-left')}>
      <p className="flex items-start text-[clamp(2rem,1.4rem+1.6vw,3rem)] leading-none font-normal tracking-[-0.05em]">
        <span className={cx('mt-[0.08em] mr-0.5 text-[0.45em] leading-none', tone === 'ink' ? 'text-violet' : 'text-violet-light')} aria-hidden>
          +
        </span>
        <span className="sr-only">More than </span>
        <CountUp value={value} />
      </p>
      <p className={cx('caps mt-2', tone === 'light' && 'text-night-muted')}>
        {label.map((l, i) => (
          <span key={l} className="block">
            {l}
            {i < label.length - 1 && <span className="sr-only"> </span>}
          </span>
        ))}
      </p>
    </div>
  )
}

/** Big right-or-left aligned uppercase title, one line per entry. */
export function Title({
  lines,
  as: Tag = 'h2',
  align = 'right',
  size = 'md',
  className,
  id,
}: {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  align?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  id?: string
}) {
  const reduce = useReducedMotion()
  return (
    <Tag
      id={id}
      className={cx(
        'display',
        align === 'right' ? 'text-right' : 'text-left',
        size === 'sm' && 'text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-[0.95]',
        size === 'md' && 'text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[0.92] tracking-[-0.05em]',
        size === 'lg' && 'text-[clamp(2.8rem,1.4rem+4.6vw,6.5rem)]',
        size === 'xl' && 'text-[clamp(3.4rem,0.6rem+9.6vw,10.5rem)] tracking-[-0.06em]',
        className,
      )}
    >
      {lines.map((l, i) => (
        <span key={l} className="block">
          <motion.span
            className="block"
            initial={reduce ? undefined : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.85, delay: i * 0.07, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export type BadgeTone = 'neutral' | 'violet' | 'outline' | 'success' | 'light'

export function Badge({ tone = 'neutral', children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'round inline-flex h-7 items-center rounded-full px-3 text-[13px] font-medium whitespace-nowrap',
        tone === 'neutral' && 'bg-soft text-ink',
        tone === 'violet' && 'bg-violet-soft text-violet-deep',
        tone === 'outline' && 'border border-line-strong text-ink',
        tone === 'success' && 'bg-success/10 text-success',
        tone === 'light' && 'bg-white/14 text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A toggleable pill (filters, multi-choice form answers). */
export function Chip({
  selected = false,
  className,
  children,
  role,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; 'data-force'?: string }) {
  return (
    <button
      type="button"
      role={role}
      aria-pressed={role ? undefined : selected}
      aria-checked={role === 'radio' || role === 'checkbox' ? selected : undefined}
      className={cx(
        'round inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-[background-color,color,border-color] duration-[var(--duration-fast)] prs:scale-[0.98] disabled:pointer-events-none disabled:opacity-45',
        selected ? 'border-violet bg-violet text-white hov:bg-violet-deep' : 'border-line-strong bg-card text-ink hov:border-ink',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/** Empty, loading-free placeholder: art, title, body and an action. */
export function EmptyState({ title, body, action, className }: { title: string; body: string; action?: ReactNode; className?: string }) {
  return (
    <div className={cx('flex flex-col items-center px-6 py-16 text-center', className)}>
      <div className="mb-4 size-24 opacity-90" aria-hidden>
        <svg viewBox="0 0 96 96" className="size-full">
          <circle cx="48" cy="48" r="38" fill="none" stroke="var(--color-violet)" strokeWidth="2" strokeDasharray="4 6" />
          <circle cx="48" cy="48" r="12" fill="var(--color-violet)" opacity="0.85" />
        </svg>
      </div>
      <p className="display text-3xl">{title}</p>
      <p className="mt-3 max-w-sm text-muted">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

/** Initials on an iridescent disc, until the owner adds team photos. */
export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <span
      aria-hidden
      className={`round holo-fill grid shrink-0 place-items-center rounded-full font-medium tracking-[-0.04em] text-white ${size === 'lg' ? 'size-28 text-3xl' : size === 'md' ? 'size-16 text-xl' : 'size-10 text-sm'}`}
    >
      {initials}
    </span>
  )
}



/** Prime Axis mark, one colour (inherits currentColor). */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="4 8 382 320"
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      <path d="M186 8L4 328H156L190 172L120 290H72L186 106Z" />
      <path d="M208 8L386 328H294L208 160Z" />
    </svg>
  )
}