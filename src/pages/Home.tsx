import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState, type PointerEvent } from 'react'

import { ArrowLink, Reveal, Stat, Title } from '../components/Bits'
import { ButtonLink } from '../components/Button'
import { Card, Section } from '../components/Card'
import { Marquee, TestimonialSlider } from '../components/Content'
import { Holo } from '../components/Holo'
import { EASE, Magnetic } from '../components/Motion'
import { ProjectCard } from '../components/ProjectCard'
import { ServiceCard } from '../components/ServiceCard'
import { APPROACH, CLIENTS, HOME, PROJECTS, SERVICES, SHOW_PROJECTS, SITE, TESTIMONIALS } from '../data'
import { cx } from '../lib/cx'
import { useDocumentTitle } from '../lib/storage'

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 70, damping: 20, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 70, damping: 20, mass: 0.6 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] as const })
  const driftY = useTransform(scrollYProgress, [0, 1], [0, 190])
  const driftRotate = useTransform(scrollYProgress, [0, 1], [0, 12])

  const move = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width - 0.5) * 48)
    py.set(((e.clientY - r.top) / r.height - 0.5) * 34)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={move}
      onPointerLeave={reset}
      // pt clears the fixed nav (old row: pt-3 + h-14 = 4.25rem)
      className="relative overflow-hidden px-5 pt-[4.25rem] pb-6 sm:px-8 lg:pb-9"
    >
      <div className="relative flex flex-col lg:block lg:h-[clamp(560px,calc(100svh-262px),860px)]">
        {/* The Prime Axis mark in chrome: drifts with the page, leans towards the pointer */}
        <motion.div
          style={reduce ? undefined : { y: driftY }}
          className="order-3 mx-auto -my-4 w-[min(92vw,480px)] lg:absolute lg:top-[3%] lg:left-[11%] lg:m-0 lg:w-[min(39vw,calc((100svh-262px)*0.86),640px)]"
        >
          <motion.div style={reduce ? undefined : { x: sx, y: sy, rotate: driftRotate }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <Holo kind="axis" motion priority />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Captions, left */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="caps relative z-10 order-2 mt-10 max-w-[11.5rem] lg:absolute lg:top-[40%] lg:left-0 lg:mt-0"
        >
          {HOME.captionTop}
        </motion.p>
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="caps relative z-10 order-5 mt-8 max-w-[14rem] self-end text-right lg:absolute lg:top-[80%] lg:left-[11%] lg:mt-0 lg:self-auto"
        >
          {HOME.captionBottom}
        </motion.p>

        {/* Reach out + headline, bottom right */}
        <div className="relative z-10 order-4 mt-6 flex flex-col items-end lg:absolute lg:right-0 lg:bottom-0 lg:mt-0">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }} className="mb-[clamp(1rem,4svh,2.6rem)]">
            <Magnetic strength={6}>
              <ArrowLink to="/contact">{HOME.reachOut}</ArrowLink>
            </Magnetic>
          </motion.div>
          <h1 id="hero-title" className="display text-right text-[clamp(2.4rem,12.6vw,6rem)] sm:text-[clamp(4rem,13vw,8rem)] lg:text-[min(10.1vw,17svh,10.6rem)]">
            {HOME.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [active, setActive] = useState(1)
  const shown = SERVICES.slice(0, 3)
  return (
    <section aria-labelledby="services-title" className="grid gap-2 md:grid-cols-2">
      <Section as="div" className="flex min-h-[340px] flex-col p-6 sm:p-8 md:min-h-0">
        <Title id="services-title" lines={HOME.servicesTitle} className="relative z-10 self-end" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-16%] left-[-6%] w-[min(78%,480px)]">
          <Holo kind="sphere" motion />
        </div>
        <ArrowLink to="/services" tone="ink" size="sm" className="relative z-10 mt-auto self-end">
          Explore services
        </ArrowLink>
      </Section>
      <ul className="grid gap-2">
        {shown.map((s, i) => (
          <li key={s.slug}>
            <Reveal delay={i * 0.06} className="h-full">
              <ServiceCard service={s} active={active === i} onActivate={() => setActive(i)} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Manifesto() {
  return (
    <Section aria-labelledby="manifesto-title" className="grid gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-14">
      <div className="flex flex-col gap-10">
        <Reveal>
          <Title id="manifesto-title" lines={HOME.manifestoTitle} align="left" size="lg" />
        </Reveal>
        <div className="grid max-w-lg grid-cols-3 gap-4">
          {HOME.stats.map((s) => (
            <Stat key={s.value} value={s.value} label={s.label} align="left" />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-6">
        <p className="max-w-[26rem] text-[clamp(1.25rem,1rem+1vw,1.9rem)] leading-[1.25] tracking-[-0.03em] text-ink-2">{HOME.manifesto}</p>
        <ArrowLink to="/studio" tone="ink" size="sm">
          More about us
        </ArrowLink>
      </div>
    </Section>
  )
}

function Approach() {
  return (
    <Section aria-labelledby="approach-title" className="grid gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
        <Title id="approach-title" lines={HOME.approachTitle} align="left" />
        <p className="max-w-sm text-muted">Four habits that shape every project, whatever its size.</p>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {APPROACH.map((a, i) => (
          <li key={a.title} className="h-full">
            <Reveal delay={i * 0.06} className="h-full">
              <Card tone={a.tone} className="flex h-full min-h-[320px] flex-col p-6 sm:p-7">
                <p className={cx('caps tabular-nums', a.tone === 'white' ? 'text-muted' : 'text-white/80')}>0{i + 1}</p>
                <h3 className="mt-2 self-end text-right text-[clamp(1.35rem,1.05rem+0.8vw,1.75rem)] leading-[1.05] tracking-[-0.03em] uppercase">
                  {a.title.split(' ').map((w) => (
                    <span key={w} className="block">
                      {w}
                    </span>
                  ))}
                </h3>
                <div className="mx-auto my-4 w-[62%] max-w-[220px]" aria-hidden>
                  <Holo kind={a.art} />
                </div>
                <p className={cx('mt-auto text-[15px] leading-snug', a.tone === 'white' ? 'text-muted' : 'text-white/85')}>{a.body}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Work() {
  return (
    <Section aria-labelledby="work-title" className="grid gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
      <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
        <Title id="work-title" lines={HOME.workTitle} align="left" />
        <ArrowLink to="/work">All projects</ArrowLink>
      </div>
      <div className="grid gap-2">
        {PROJECTS.slice(0, 4).map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <ProjectCard project={p} size="lg" className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Testimony() {
  return (
    <section id="testimony" aria-labelledby="testimony-title" className="grid scroll-mt-4 gap-2 lg:grid-cols-[1fr_1.45fr]">
      <Section as="div" className="flex min-h-[320px] flex-col justify-between gap-8 px-5 py-8 sm:px-8 sm:py-10">
        <Title id="testimony-title" lines={HOME.testimonyTitle} align="left" />
        <div className="flex items-end justify-between gap-6">
          <div className="w-28" aria-hidden>
            <Holo kind="star" motion />
          </div>
          <p className="max-w-[12rem] text-right text-muted">
            <span className="block text-4xl font-normal tracking-[-0.05em] text-ink">4.9 / 5</span>
            Average client rating.
          </p>
        </div>
      </Section>
      <Card tone="violet" className="p-6 sm:p-10">
        <TestimonialSlider items={TESTIMONIALS} />
      </Card>
    </section>
  )
}

function Clients() {
  return (
    <Section aria-label={HOME.clientsLabel} className="px-5 py-10 sm:px-8">
      <p className="caps mb-5 text-muted">{HOME.clientsLabel}</p>
      <Marquee items={CLIENTS} />
    </Section>
  )
}

function Cta() {
  const reduce = useReducedMotion()
  const reveal = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.8, delay: i * 0.1, ease: EASE },
        }

  return (
    <Section aria-labelledby="cta-title" className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-6">
        <div className="flex flex-col items-start gap-7">
          <motion.p {...reveal(0)} className="caps text-violet">
            /Let’s talk
          </motion.p>
          <motion.div {...reveal(1)}>
            <Title id="cta-title" lines={HOME.cta.title} size="lg" />
          </motion.div>
          <motion.p {...reveal(2)} className="max-w-md text-[17px] leading-relaxed text-pretty text-muted">
            {HOME.cta.body}
          </motion.p>
          <motion.div {...reveal(3)} className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic strength={6}>
              <ButtonLink to="/contact" variant="violet" size="lg" iconRight={<ArrowRight className="size-5" />}>
                {HOME.cta.action}
              </ButtonLink>
            </Magnetic>

          </motion.div>
        </div>

        <motion.div {...reveal(1)} aria-hidden className="mx-auto w-[min(60vw,320px)] md:mr-0 md:ml-auto md:w-full md:max-w-[520px]">
          <Holo kind="cloud" motion />
        </motion.div>
      </div>
    </Section>
  )
}

export function Home() {
  useDocumentTitle()
  return (
    <div className="grid gap-2 p-2">
      <Hero />
      <Services />
      <Manifesto />
      <Approach />
      {SHOW_PROJECTS && <Work />}
      <Testimony />
      <Clients />
      <Cta />
    </div>
  )
}