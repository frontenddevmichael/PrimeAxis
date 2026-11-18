import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { MENU, NAV, SHOW_PROJECTS, SITE } from '../data'
import { cx } from '../lib/cx'
import { IconButton } from './Button'
import { Section } from './Card'
import { EASE } from './Motion'
import { Drawer } from './Overlay'

/** In dev, play entrances even if the OS has reduced motion on. Production always respects it. */
const FORCE_MOTION_IN_DEV = import.meta.env.DEV

const MARK_PATHS = ['M186 8L4 328H156L190 172L120 290H72L186 106Z', 'M208 8L386 328H294L208 160Z']

/**
 * Brand entrance in pure CSS, so it plays on every load regardless of Motion config.
 * Base styles are the FINAL state; keyframes supply the start state (fill-mode: both).
 */
const BRAND_CSS = `
@keyframes pa-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes pa-fill{from{fill-opacity:0}to{fill-opacity:1}}
@keyframes pa-ink{from{stroke-opacity:1}to{stroke-opacity:0}}
@keyframes pa-rise{from{opacity:0;transform:translateY(.4em);filter:blur(6px)}to{opacity:1;transform:none;filter:blur(0)}}
.pa-path{stroke-dasharray:1;stroke-dashoffset:0;fill-opacity:1;stroke-opacity:0;
  animation:
    pa-draw .8s cubic-bezier(.76,0,.24,1) var(--d,0s) both,
    pa-fill .45s ease-out calc(var(--d,0s) + .55s) both,
    pa-ink .35s ease-out calc(var(--d,0s) + .65s) both}
.pa-rise{display:inline-block;animation:pa-rise .8s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
${
  FORCE_MOTION_IN_DEV
    ? ''
    : '@media (prefers-reduced-motion:reduce){.pa-path,.pa-rise{animation:none}}'
}
`

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/** Fixed, backgroundless nav with a blur. Mounted once in App, outside the page transition. */
export function Nav() {
  const osReduce = useReducedMotion()
  const reduce = !!osReduce && !FORCE_MOTION_IN_DEV
  const { pathname, hash } = useLocation()
  const { scrollY } = useScroll()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hover, setHover] = useState<string | null>(null)

  useEffect(() => {
    if (import.meta.env.DEV && osReduce)
      console.info('[Nav] OS "reduce motion" is ON. Entrances are forced in dev only; production will skip them.')
  }, [osReduce])

  // Hide on scroll down, show on scroll up. Never hide while the menu is open.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(!open && y > prev && y > 160)
  })

  const items = NAV.filter((item) => SHOW_PROJECTS || item.to !== '/work')
  const isActive = (to: string) => (to.includes('#') ? pathname === '/' && hash === to.slice(1) : pathname.startsWith(to))
  const lit = hover ?? items.find((item) => isActive(item.to))?.to

  /** Fade up with a touch of blur. `d` is the absolute delay in seconds. */
  const enter = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as const },
        }
  const linksStart = 0.45
  const ctaDelay = linksStart + items.length * 0.05 + 0.05

  return (
    <motion.header
      animate={{ y: hidden ? '-130%' : 0 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      onFocusCapture={() => setHidden(false)}
      className="fixed inset-x-0 top-0 z-40 px-2 pt-2 sm:px-4 sm:pt-4"
    >
      <style>{BRAND_CSS}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,#000_45%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
      />
      <div className="relative mx-auto flex h-14 max-w-[88rem] items-center justify-between gap-4 rounded-full pr-1.5 pl-5 text-ink">   
        <Link to="/" aria-label={`${SITE.name} home`} className="round -m-1 inline-flex min-h-11 items-center rounded-full p-1">
          <span
            aria-hidden
            className="inline-flex items-baseline text-[clamp(1.9rem,1.5rem+1.2vw,2.6rem)] leading-none font-medium tracking-[-0.05em]"
          >
            <span className="pa-rise" style={delay(0)}>
              Prime
            </span>
            <svg viewBox="4 8 382 320" fill="none" className="mr-[0.02em] ml-[0.06em] inline-block h-[0.74em] w-auto overflow-visible">
              {MARK_PATHS.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  pathLength="1"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={16}
                  strokeLinejoin="miter"
                  className="pa-path"
                  style={delay(0.1 + i * 0.14)}
                />
              ))}
            </svg>
            <span className="pa-rise" style={delay(0.14)}>
              xis
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
            {items.map((item, i) => {
              const active = isActive(item.to)
              return (
                <motion.li key={item.to} {...enter(linksStart + i * 0.05)} className="relative" onMouseEnter={() => setHover(item.to)}>
                  {lit === item.to && (
                    <motion.span
                      layoutId={reduce ? undefined : 'nav-pill'}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-ink/8"
                      aria-hidden
                    />
                  )}
                  <NavLink
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      'caps round relative inline-flex min-h-11 items-center rounded-full px-4 text-[13px] transition-colors',
                      active || hover === item.to ? 'text-ink' : 'text-ink/60',
                    )}
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <motion.div {...enter(ctaDelay)} className="hidden md:block">
            {/* Concentric radii: outer h-11 = inner size-9 + 2 x p-1, both rounded-full */}
            <Link
              to="/contact"
              className="group round inline-flex h-11 items-center gap-3 rounded-full bg-ink p-1 pl-5 text-[13px] font-medium text-white"
            >
              Start a project
              <span className="grid size-9 place-items-center rounded-full bg-white text-ink transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hov:rotate-45">
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
              </span>
            </Link>
          </motion.div>
          <motion.div {...enter(ctaDelay)} className="md:hidden">
            <IconButton aria-label="Open menu" aria-expanded={open} aria-haspopup="dialog" tone="ink" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden>
                <path d="M5 6.5h10M5 10h10M5 13.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </IconButton>
          </motion.div>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} label="Site menu">
        <nav aria-label="Menu" className="mt-6 flex-1">
          <ul className="flex flex-col">
            {/* The drawer only opens on phones, where careers is not offered. */}
            {MENU.filter((item) => item.to !== '/careers' && (SHOW_PROJECTS || item.to !== '/work')).map((item, i) => (
              <motion.li
                key={item.to}
                initial={reduce ? undefined : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
              >
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="group display flex items-baseline gap-4 border-b border-white/12 py-4 text-[clamp(2.2rem,1.6rem+2.4vw,3.6rem)] transition-colors hov:text-violet-light"
                >
                  <span className="caps w-6 text-[12px] text-night-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight className="size-8 self-center opacity-0 transition-opacity duration-[var(--duration-base)] group-hov:opacity-100" strokeWidth={1.4} aria-hidden />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <Link
          to="/contact"
          onClick={() => setOpen(false)}
          className="round mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white text-[15px] font-medium text-ink"
        >
          Start a project
        </Link>
        <div className="mt-10 grid gap-6 text-sm text-night-muted sm:grid-cols-2">
          <div>
            <p className="caps mb-2 text-white">Say hello</p>
            <a className="block min-h-11 py-2 text-white underline-offset-4 hov:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            <a className="block min-h-11 py-2 text-white underline-offset-4 hov:underline" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="caps mb-2 text-white">Follow</p>
            <ul className="grid grid-cols-2">
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a className="block min-h-11 py-2 text-white underline-offset-4 hov:underline" href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
    </motion.header>
  )
}

/** The first card of an inner page: a big title and an optional intro/aside. */
export function PageHero({
  title,
  eyebrow,
  intro,
  aside,
  art,
  children,
  compact = false,
}: {
  title: string[]
  eyebrow?: string
  intro?: string
  aside?: React.ReactNode
  art?: React.ReactNode
  children?: React.ReactNode
  /** Drops the copy column and places the art beside the title. */
  compact?: boolean
}) {
  const reduce = useReducedMotion()
  const hasCopy = !compact && Boolean(eyebrow || intro || aside)
  return (
    // pt clears the fixed nav (h-14 + top offset)
    <Section className="relative overflow-hidden px-5 pt-20 pb-8 sm:px-8 sm:pt-24 sm:pb-10">
      <div className={cx('relative grid gap-8 md:mt-8 lg:items-end lg:gap-6', hasCopy ? 'lg:grid-cols-[minmax(0,20rem)_1fr_auto]' : 'lg:grid-cols-[1fr_auto]')}>
        {hasCopy && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="order-2 max-w-sm lg:order-1"
          >
            {eyebrow && <p className="caps mb-3 text-violet">{eyebrow}</p>}
            {intro && <p className="text-[17px] leading-relaxed text-pretty text-ink-2">{intro}</p>}
            {aside}
          </motion.div>
        )}
        {art ? (
          <div
            className={cx(
              'pointer-events-none mx-auto w-[min(62vw,300px)] self-center lg:w-[min(22vw,340px)]',
              hasCopy ? 'order-3 lg:order-2 lg:-translate-x-[8%]' : 'order-2 lg:order-1 lg:justify-self-center',
            )}
            aria-hidden
          >
            {art}
          </div>
        ) : (
          <div className={cx('hidden lg:block', hasCopy ? 'lg:order-2' : 'lg:order-1')} />
        )}
        <h1 className={cx('display text-right text-[clamp(3.4rem,0.8rem+9.2vw,10rem)] tracking-[-0.06em]', hasCopy ? 'order-1 lg:order-3' : 'order-1 lg:order-2')}>
          {title.map((l, i) => (
            <motion.span
              key={l}
              className="block"
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
            >
              {l}
            </motion.span>
          ))}
        </h1>
      </div>
      {children}
    </Section>
  )
}