import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

import { ArrowLink, Badge, Reveal, Title } from '../components/Bits'
import { ButtonLink } from '../components/Button'
import { Card, Section, type CardTone } from '../components/Card'
import { Accordion } from '../components/Content'
import { Holo } from '../components/Holo'
import { Drift } from '../components/Motion'
import { PageHero } from '../components/Nav'
import { FAQ, PROCESS, SERVICE_CTA, SERVICES, SITE, type Service } from '../data'
import { cx } from '../lib/cx'
import { usePageMeta } from '../lib/seo'

/*
  A tight 12-column bento: the lead panel takes half the width and both rows,
  the other four take a quarter each. Everything is deliberately short, so the
  five services fit one screen instead of running past it.
*/
const SERVICE_LAYOUT: Array<{
  className: string
  tone: CardTone
  artClassName: string
  contentClassName: string
  scrimClassName: string
  align?: 'left' | 'right'
}> = [
  {
    className: 'md:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[380px] lg:min-h-[468px]',
    tone: 'violet',
    artClassName: 'right-[-12%] top-[2%] w-[44%] max-w-[280px]',
    contentClassName: 'max-w-[26rem]',
    scrimClassName: 'from-violet via-violet/60',
  },
  {
    className: 'lg:col-span-3 min-h-[228px]',
    tone: 'white',
    artClassName: 'right-[-8%] top-[-12%] w-[34%] max-w-[118px]',
    contentClassName: 'max-w-[17rem]',
    scrimClassName: 'from-card via-card/80',
  },
  {
    className: 'lg:col-span-3 min-h-[228px]',
    tone: 'soft',
    artClassName: 'left-[-10%] top-[-12%] w-[34%] max-w-[118px]',
    contentClassName: 'max-w-[17rem]',
    scrimClassName: 'from-soft via-soft/80',
    align: 'right',
  },
  {
    className: 'lg:col-span-3 min-h-[228px]',
    tone: 'white',
    artClassName: 'right-[-10%] top-[-10%] w-[36%] max-w-[124px]',
    contentClassName: 'max-w-[17rem]',
    scrimClassName: 'from-card via-card/80',
  },
  {
    className: 'lg:col-span-3 min-h-[228px]',
    tone: 'night',
    artClassName: 'right-[-6%] top-[-12%] w-[32%] max-w-[128px]',
    contentClassName: 'max-w-[17rem]',
    scrimClassName: 'from-night via-night/80',
  },
]

function ServicePanel({
  service,
  index,
  className,
  tone,
  artClassName,
  contentClassName,
  scrimClassName,
  align = 'left',
}: {
  service: Service
  index: number
  className: string
  tone: CardTone
  artClassName: string
  contentClassName: string
  scrimClassName: string
  align?: 'left' | 'right'
}) {
  const dark = tone === 'violet' || tone === 'night'
  const lead = index === 0
  return (
    <Card
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      tone={tone}
      className={cx('group relative flex h-full flex-col overflow-hidden scroll-mt-14 p-5 sm:p-6', className)}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <p className={cx('caps tabular-nums', dark ? 'text-white/55' : 'text-muted')}>0{index + 1}</p>
        {service.tag && <Badge tone={dark ? 'light' : 'violet'}>{service.tag}</Badge>}
      </div>
      <div
        aria-hidden
        className={cx('pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[58%] bg-gradient-to-t to-transparent', scrimClassName)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42%] backdrop-blur-[3px]"
        style={{ maskImage: 'linear-gradient(to top, black 48%, transparent 100%)' }}
      />
      <div className={cx('relative z-10 mt-auto pt-10', contentClassName, align === 'right' && 'ml-auto text-right')}>
        <h2
          id={`${service.slug}-title`}
          className={cx(
            'display max-w-[16ch] leading-[0.9] text-balance',
            lead ? 'text-[clamp(1.7rem,1.1rem+1.8vw,2.5rem)]' : 'text-[clamp(1.2rem,1rem+0.7vw,1.55rem)]',
            align === 'right' && 'ml-auto',
          )}
        >
          {service.title}
        </h2>
        <p
          className={cx(
            'mt-3 max-w-md text-pretty text-[14px] leading-snug',
            dark ? 'text-white/75' : 'text-ink-2',
            align === 'right' && 'ml-auto',
          )}
        >
          {service.intro}
        </p>
        {lead && (
          <ul className={cx('mt-4 flex flex-wrap gap-1.5', align === 'right' && 'justify-end')} aria-label={`${service.title} deliverables`}>
            {service.deliverables.slice(0, 3).map((d) => (
              <li
                key={d}
                className={cx(
                  'round inline-flex h-6 items-center rounded-full border px-2.5 text-[11px] font-medium',
                  dark ? 'border-white/20 text-white/75' : 'border-line text-muted',
                )}
              >
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        aria-hidden
        className={cx(
          'pointer-events-none absolute opacity-85 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-soft)] group-hov:scale-[1.03]',
          artClassName,
        )}
      >
        <Drift distance={44}>
          <Holo kind={service.art} motion />
        </Drift>
      </div>
    </Card>
  )
}

/**
 * One step of the vertical timeline. The rail below it fills as the line
 * travels down the section with the scroll.
 */
function ProcessStep({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: (typeof PROCESS)[number]
  index: number
  total: number
  progress: MotionValue<number>
  reduce: boolean
}) {
  const dotFill = useTransform(progress, [index / total, (index + 0.5) / total], [0, 1])
  const railFill = useTransform(progress, [(index + 0.5) / total, (index + 1) / total], [0, 1])
  const last = index === total - 1

  return (
    <li className={cx('relative pl-10 sm:pl-14', !last && 'pb-14 sm:pb-20')}>
      <span
        aria-hidden
        className="absolute top-2 left-0 grid size-[15px] place-items-center rounded-full border border-line-strong bg-canvas"
      >
        <motion.span style={reduce ? undefined : { scale: dotFill }} className="size-[7px] rounded-full bg-violet" />
      </span>

      {!last && (
        <>
          <span aria-hidden className="absolute top-[23px] bottom-0 left-[7px] w-px bg-line-strong" />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY: railFill }}
            className="absolute top-[23px] bottom-0 left-[7px] w-px origin-top bg-violet"
          />
        </>
      )}

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
        <p className="text-[2rem] leading-none font-normal tracking-[-0.05em] text-violet tabular-nums">{step.step}</p>
        <div>
          <h3 className="text-2xl font-medium tracking-[-0.03em] uppercase">{step.title}</h3>
          <p className="mt-2 max-w-[26rem] text-[15px] leading-snug text-muted">{step.body}</p>
        </div>
      </div>
    </li>
  )
}

/**
 * How a project runs: no panel around it, and the line travels straight down
 * the page so the four steps read in the order they happen.
 */
function Process() {
  const reduce = useReducedMotion()
  const track = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 0.85', 'end 0.6'] as const })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <Section
      aria-labelledby="process-title"
      className="grid gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
    >
      <div className="flex flex-col gap-5 lg:sticky lg:top-[5.5rem] lg:self-start">
        <Badge tone="violet" className="self-start">
          01–04
        </Badge>
        <Title id="process-title" lines={['How a project', 'runs']} align="left" />
        <p className="max-w-sm text-muted">
          One team from the first call to thirty days after launch. Nothing gets handed off.
        </p>
      </div>
      <ol ref={track}>
        {PROCESS.map((p, i) => (
          <ProcessStep key={p.step} step={p} index={i} total={PROCESS.length} progress={smooth} reduce={!!reduce} />
        ))}
      </ol>
    </Section>
  )
}

export function Services() {
  usePageMeta({
    title: 'Services',
    description:
      'Custom web development, digital products, UI/UX and performance rebuilds. What Prime Axis builds, how a project runs, and what it costs.',
  })
  return (
    <div className="grid gap-2 p-2">
      <PageHero title={['What', 'we do']} art={<Holo kind="orbit" motion />} compact />

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-12">
        {SERVICES.map((s, i) => {
          const layout = SERVICE_LAYOUT[i]
          return (
            <Reveal key={s.slug} delay={i * 0.05} className={cx('h-full', layout.className)}>
              <ServicePanel
                service={s}
                index={i}
                tone={layout.tone}
                artClassName={layout.artClassName}
                contentClassName={layout.contentClassName}
                scrimClassName={layout.scrimClassName}
                align={layout.align}
                className="h-full"
              />
            </Reveal>
          )
        })}
      </div>

      <Process />

      <Section aria-labelledby="faq-title" className="grid gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col justify-between gap-8">
          <Title id="faq-title" lines={['Questions', 'we hear']} align="left" />
          <ArrowLink to="/contact" size="sm">
            Ask us something else
          </ArrowLink>
        </div>
        <Accordion items={FAQ} />
      </Section>

      <Card aria-labelledby="service-cta-title" tone="violet" className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="caps text-white/60">{SERVICE_CTA.eyebrow}</p>
          <h2 id="service-cta-title" className="display mt-4 max-w-2xl text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[0.92] tracking-[-0.05em]">
            {SERVICE_CTA.title}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink to="/contact" variant="light" size="md">
            {SERVICE_CTA.action}
          </ButtonLink>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 px-1 text-white underline-offset-4 hov:underline">
            {SERVICE_CTA.call}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </Card>
    </div>
  )
}
