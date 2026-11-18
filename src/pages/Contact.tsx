import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { BriefForm } from '../components/BriefForm'
import { Badge } from '../components/Bits'
import { buttonClass } from '../components/Button'
import { Holo } from '../components/Holo'
import { EASE } from '../components/Motion'
import { PageHero } from '../components/Nav'
import { CONTACT, SITE } from '../data'
import { cx } from '../lib/cx'
import { KEYS, useDocumentTitle, usePersistentState, type SentBrief } from '../lib/storage'

const EMAIL = 'hello@primeaxis.studio'

/** 2px dotted violet rule shared by every cell. */
const DOT = 'border-dotted border-violet/55'

/** Small crosshair drawn on each cell's bottom-right corner, like a spec sheet. */
function Plus() {
  return (
    <svg aria-hidden viewBox="0 0 13 13" className="absolute -right-[7px] -bottom-[7px] z-10 size-[13px] text-violet">
      <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Live-status dot with a soft ping. */
function StatusDot() {
  return (
    <span className="relative flex size-2.5" aria-hidden>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet opacity-60" />
      <span className="relative inline-flex size-2.5 rounded-full bg-violet" />
    </span>
  )
}

/** One cell: fades up on view (staggered by `delay`), tints on hover. */
function Cell({
  label,
  index,
  className,
  delay = 0,
  filled = false,
  children,
}: {
  label?: string
  index?: string
  className?: string
  delay?: number
  filled?: boolean
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={cx(
        'relative border-r-2 border-b-2 p-6 transition-colors duration-500 sm:p-8',
        DOT,
        filled ? 'bg-violet text-white' : 'hover:bg-violet/[0.04]',
        className,
      )}
    >
      <Plus />
      {label && (
        <p className="caps mb-5 flex items-center justify-between text-violet">
          <span>{label}</span>
          {index && <span className="tabular-nums">{index}</span>}
        </p>
      )}
      {children}
    </motion.div>
  )
}

/** Text link whose arrow slides in on hover. */
function SlideLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={cx('group/link inline-flex min-h-11 items-center gap-1.5 transition-colors hov:text-violet', className)}>
      {children}
      <ArrowUpRight
        className="size-4 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hov/link:translate-x-0 group-hov/link:opacity-100"
        strokeWidth={1.8}
        aria-hidden
      />
    </a>
  )
}

export function Contact() {
  useDocumentTitle('Start a project')
  const [briefs, setBriefs] = usePersistentState<SentBrief[]>(KEYS.briefs, [])
  return (
    <div className="grid gap-2 p-2">
      <PageHero title={CONTACT.title} art={<Holo kind="cloud" motion />} />

      {/* Container draws the top/left edge; every cell draws its own right/bottom */}
      <div className={cx('grid border-t-2 border-l-2 lg:grid-cols-4', DOT)}>
        {/* Brief form spans three columns and three rows */}
        <Cell label="Project brief" index="01" delay={0} className="lg:col-span-3 lg:row-span-3">
          <BriefForm onSent={(b) => setBriefs((list) => (list.some((x) => x.reference === b.reference) ? list : [b, ...list]))} />
        </Cell>

        <Cell label="New business" index="02" delay={0.06}>
          <SlideLink href={`mailto:${EMAIL}`} className="text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] tracking-[-0.03em] break-all">
            {EMAIL}
          </SlideLink>
          <SlideLink href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex">
            {SITE.phone}
          </SlideLink>
        </Cell>

        <Cell label="Studio" index="03" delay={0.12}>
          <p className="text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] leading-tight tracking-[-0.03em]">Prime Axis Studio</p>
          <p className="mt-3 flex items-center gap-2.5 text-[15px] text-muted">
            <StatusDot />
            Remote first
          </p>
        </Cell>

        <Cell label="Response time" index="04" delay={0.18}>
          <p className="text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] leading-tight tracking-[-0.03em]">{CONTACT.response}</p>
        </Cell>

        {/* Consultation: the one filled cell, with a drifting chrome star */}
        <Cell filled delay={0.05} className="overflow-hidden lg:col-span-2">
          <div aria-hidden className="pointer-events-none absolute -right-6 -bottom-10 w-44 opacity-90 sm:w-52">
            <Holo kind="star" motion />
          </div>
          <section aria-labelledby="consultation-title" className="relative z-10 grid gap-5">
            <p className="caps text-white/75">{CONTACT.consultation.tag}</p>
            <h2 id="consultation-title" className="display text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] leading-[0.95]">
              {CONTACT.consultation.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-sm text-white/90">{CONTACT.consultation.body}</p>
            <div>
              <a className={buttonClass('light', 'md')} href={SITE.whatsapp} target="_blank" rel="noreferrer">
                {CONTACT.consultation.action}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <p className="mt-3 text-[13px] text-white/70">{CONTACT.consultation.note}</p>
            </div>
          </section>
        </Cell>

        {/* Sent briefs */}
        <Cell label="Your briefs" index="05" delay={0.1} className="lg:col-span-2">
          {briefs.length ? (
            <ul className="divide-y-2 divide-dotted divide-violet/35">
              {briefs.map((b, i) => (
                <motion.li
                  key={b.reference}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0"
                >
                  <div>
                    <p className="font-medium tabular-nums">{b.reference}</p>
                    <p className="text-sm text-muted">
                      {new Date(b.sentAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, {b.budget}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {b.services.map((s) => (
                      <Badge key={s} tone="violet">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-muted">Briefs you send from this browser appear here with their reference, so you can quote it when we reply.</p>
          )}
        </Cell>
      </div>
    </div>
  )
}