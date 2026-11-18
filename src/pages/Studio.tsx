import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { ArrowLink, CountUp, Reveal, Title } from '../components/Bits'
import { ButtonLink } from '../components/Button'
import { Section } from '../components/Card'
import { Marquee } from '../components/Content'
import { Holo } from '../components/Holo'
import { EASE } from '../components/Motion'
import { PageHero } from '../components/Nav'
import { CLIENTS, IMAGES, STUDIO } from '../data'
import { usePageMeta } from '../lib/seo'

export function Studio() {
  usePageMeta({
    title: 'Studio',
    description:
      'Prime Axis is a remote-first studio of six: software engineers, product designers, brand and motion, building the systems growing companies run on.',
  })
  const reduce = useReducedMotion()
  return (
    <div className="grid gap-2 p-2">
      <PageHero title={STUDIO.title} eyebrow="About the studio" intro={STUDIO.intro} art={<Holo kind="scissors" motion />} />

      <Section aria-label="Studio in numbers" className="grid gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-4">
        {STUDIO.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div>
              <p className="text-[clamp(3.2rem,2.4rem+2.6vw,5.5rem)] leading-none font-normal tracking-[-0.06em]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="caps mt-3 text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </Section>

      <Section aria-labelledby="values-title" className="grid gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-10 lg:sticky lg:top-[5.5rem] lg:self-start">
          <Title id="values-title" lines={['What we', 'believe']} />
          <div className="w-[min(58%,280px)]" aria-hidden>
            <Holo kind="prism" motion />
          </div>
        </div>
        <ul className="grid gap-6">
          {STUDIO.values.map((v, i) => (
            <motion.li
              key={v.title}
              initial={reduce ? undefined : { opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line pt-5"
            >
              <span className="caps text-violet tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.03em] uppercase">{v.title}</h3>
                <p className="mt-1.5 text-muted">{v.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="team-title" className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="caps text-violet">/The team</p>
            <Title id="team-title" lines={['The people', 'behind PrimeAxis']} align="left" className="mt-2" />
          </div>
          <ArrowLink to="/careers" size="sm" className="shrink-0">
            Join the team
          </ArrowLink>
        </div>
        <p className="mt-4 max-w-md text-[15px] text-muted">{STUDIO.teamIntro}</p>

        <ul className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-3">
          {STUDIO.team.map((m, i) => (
            <li
              key={m.name}
              tabIndex={0}
              aria-label={`${m.name}, ${m.role}`}
              className="team-tile relative overflow-hidden bg-soft focus-visible:outline-offset-[-4px]"
            >
              <Reveal delay={(i % 3) * 0.05}>
                <img
                  src={IMAGES[m.photo].src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover sm:aspect-square"
                />
                <div className="team-tile__detail absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night/90 via-night/35 to-transparent p-4 sm:p-5">
                  {m.tag && <p className="caps text-violet-light">{m.tag}</p>}
                  <p className="mt-1 text-[17px] leading-tight font-medium tracking-[-0.03em] text-white sm:text-xl">{m.name}</p>
                  <p className="text-[13px] text-white/75">{m.role}</p>
                  <p className="mt-2 hidden text-[13px] leading-snug text-white/70 sm:block">{m.bio}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-label="Clients" className="px-5 py-10 sm:px-8">
        <p className="caps mb-5 text-muted">Clients since 2024</p>
        <Marquee items={CLIENTS} />
      </Section>

      <Section className="flex flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-end sm:px-8 sm:py-16">
        <Title lines={['Like what', 'you see?']} align="left" size="lg" as="p" />
        <ButtonLink to="/contact" variant="violet" size="lg" iconRight={<ArrowRight className="size-5" />}>
          Start a project
        </ButtonLink>
      </Section>
    </div>
  )
}
