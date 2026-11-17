import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useId, useState, type CSSProperties, type FormEvent } from 'react'
import { Link } from 'react-router'

import { FOOTER, HOME, MENU, SHOW_PROJECTS, SITE } from '../data'
import { postJson } from '../lib/api'
import { cx } from '../lib/cx'
import { validateSubscribe } from '../shared/validation'
import { Logo } from './Bits'
import { IconButton } from './Button'
import { EASE } from './Motion'

/** Prime Axis mark, one colour (inherits currentColor). */
function LogoMark({ className, title }: { className?: string; title?: string }) {
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

/** Scoped overrides so every ink/muted/line token in the footer tends to #1e1e1e. */
const FOOTER_TONE = {
  '--color-ink': '#1e1e1e',
  '--color-muted': 'color-mix(in oklab, #1e1e1e 68%, transparent)',
  '--color-faint': 'color-mix(in oklab, #1e1e1e 45%, transparent)',
  '--color-line': 'color-mix(in oklab, #1e1e1e 14%, transparent)',
  '--color-line-strong': 'color-mix(in oklab, #1e1e1e 38%, transparent)',
} as CSSProperties

/** Email signup posting to /api/subscribe. */
export function NewsletterForm({ tone = 'night' }: { tone?: 'night' | 'white' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const uid = useId()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errors = validateSubscribe({ email })
    if (errors.email) return setError(errors.email)
    setError('')
    setState('loading')
    const res = await postJson('/api/subscribe', { email })
    if (!res.ok) {
      setState('idle')
      return setError(res.fieldErrors?.email ?? res.error)
    }
    setState('done')
  }
  const dark = tone === 'night'
  if (state === 'done')
    return (
      <p role="status" className={cx('flex h-14 items-center text-[15px]', dark ? 'text-violet-light' : 'text-violet')}>
        Thanks. The next studio notes land in your inbox next month.
      </p>
    )
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={uid} className="sr-only">
        Email address
      </label>
      <div
        className={cx(
          'round flex h-14 items-center gap-2 rounded-full border pr-1.5 pl-5 transition-colors has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-3',
          dark ? 'border-white/25 bg-white/6 has-[input:focus-visible]:outline-white' : 'border-line-strong bg-card has-[input:focus-visible]:outline-violet',
          error && 'border-danger',
        )}
      >
        <input
          id={uid}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${uid}-error` : undefined}
          className={cx('h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none focus-visible:outline-none', dark ? 'placeholder:text-night-muted' : 'placeholder:text-muted')}
        />
        <IconButton type="submit" aria-label="Subscribe" tone="violet" disabled={state === 'loading'} aria-busy={state === 'loading' || undefined}>
          <ArrowRight className={cx('size-5', state === 'loading' && 'animate-pulse')} />
        </IconButton>
      </div>
      {error && (
        <p id={`${uid}-error`} role="alert" className={cx('mt-2 pl-5 text-[13px]', dark ? 'text-[#ff9a9f]' : 'text-danger')}>
          {error}
        </p>
      )}
    </form>
  )
}

export function Footer() {
  const reduce = useReducedMotion()
  const links = [...MENU.filter((m) => SHOW_PROJECTS || m.to !== '/work'), { label: 'Style guide', to: '/styleguide' }]

  /** Fade-up on view. Skipped when the user prefers reduced motion. */
  const reveal = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
        }

  return (
    <footer className="px-2 pb-2 text-ink" style={FOOTER_TONE}>
      <div className="px-5 pt-10 pb-6 sm:px-8 sm:pt-14">
        {/* Logo, a short line and the one action */}
        <motion.div
          {...reveal()}
          className="grid gap-8 border-b border-line pb-10 sm:pb-12 lg:grid-cols-[1.45fr_0.55fr] lg:items-end lg:gap-16"
        >
          <h2>
            <LogoMark title="Prime Axis" className="h-[clamp(4.5rem,2rem+9vw,9rem)] w-auto" />
          </h2>
          <div className="flex flex-col gap-7 lg:items-end">
            <p className="max-w-[19rem] text-[15px] leading-snug text-muted lg:text-right">{HOME.cta.body}</p>
            <Link
              to="/contact"
              className="group round inline-flex items-center gap-4 rounded-full border border-line-strong py-1.5 pr-1.5 pl-6 text-[15px] font-medium transition-colors hov:border-ink"
            >
              Start a project
              <span className="round grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] group-hov:rotate-45">
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Four hairline columns instead of panels */}
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          <motion.nav {...reveal(0)} aria-label="Footer" className="lg:pr-8">
            <p className="caps flex items-center justify-between text-muted">
              <span>/Explore</span>
              <span className="text-faint tabular-nums">01</span>
            </p>
            <ul className="mt-4">
              {links.map((m) => (
                <li key={m.to}>
                  <Link to={m.to} className="inline-flex min-h-9 items-center text-[15px] transition-colors hov:text-violet">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div {...reveal(1)} className="lg:px-8">
            <p className="caps flex items-center justify-between text-muted">
              <span>/Studio</span>
              <span className="text-faint tabular-nums">02</span>
            </p>
            <address className="mt-4 text-[15px] not-italic">
              {SITE.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <span className="mt-2 block text-muted">{SITE.hours}</span>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-9 items-center gap-1 underline-offset-4 transition-colors hov:text-violet hov:underline"
              >
                Book a free call
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
              </a>
            </address>
          </motion.div>

          <motion.div {...reveal(2)} className="lg:px-8">
            <p className="caps flex items-center justify-between text-muted">
              <span>/Contact</span>
              <span className="text-faint tabular-nums">03</span>
            </p>
            <div className="mt-4 flex flex-col text-[15px]">
              <a href={`mailto:${SITE.email}`} className="inline-flex min-h-9 items-center break-all transition-colors hov:text-violet">
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="inline-flex min-h-9 items-center transition-colors hov:text-violet">
                {SITE.phone}
              </a>
              <ul className="mt-2 flex flex-wrap gap-x-4">
                {SITE.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 items-center text-muted transition-colors hov:text-violet"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...reveal(3)} className="lg:pl-8">
            <p className="caps flex items-center justify-between text-muted">
              <span>/Notes</span>
              <span className="text-faint tabular-nums">04</span>
            </p>
            <p className="mt-4 mb-5 max-w-[16rem] text-[15px] leading-snug text-muted">{FOOTER.newsletter.body}</p>
            <NewsletterForm tone="white" />
          </motion.div>
        </div>

        <motion.p
          aria-hidden
          initial={reduce ? undefined : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-14 -mb-[0.12em] text-center text-[clamp(3.4rem,-0.6rem+16vw,17rem)] leading-[0.8] font-medium tracking-[-0.06em] text-ink select-none"
        >
          Prime <LogoMark className="mx-[0.02em] inline-block h-[0.7em] w-auto align-baseline" />xis
        </motion.p>

        <motion.div
          {...reveal()}
          className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-line pt-5 text-[13px] text-muted sm:flex-row sm:items-center"
        >
          <span className="flex items-center gap-2">
            <Logo className="[&_svg]:size-5" />
            {FOOTER.legal}
          </span>
          <a href="#top" className="inline-flex min-h-9 items-center transition-colors hov:text-violet">
            Back to top
          </a>
        </motion.div>
      </div>
    </footer>
  )
}