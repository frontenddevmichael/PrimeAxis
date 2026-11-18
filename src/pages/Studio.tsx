import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { ArrowLink, Badge, CountUp, Photo, Reveal, Title } from '../components/Bits'
import { ButtonLink } from '../components/Button'
import { Card, Section } from '../components/Card'
import { Marquee } from '../components/Content'
import { Holo } from '../components/Holo'
import { EASE } from '../components/Motion'
import { PageHero } from '../components/Nav'
import { CLIENTS, STUDIO } from '../data'
import { useDocumentTitle } from '../lib/storage'

export function Studio() {
  useDocumentTitle('Studio')
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

      <section aria-labelledby="team-title" className="grid gap-2">
        <Section as="div" className="grid gap-6 px-5 py-8 sm:px-8 sm:py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Title id="team-title" lines={['The people', 'behind PrimeAxis']} align="left" />
            <p className="mt-4 max-w-md text-muted">{STUDIO.teamIntro}</p>
          </div>
          <ArrowLink to="/careers">Join the team</ArrowLink>
        </Section>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIO.team.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Card className="group flex h-full flex-col p-0">
                  <Photo image={m.photo} ratio="4/5" zoom alt={`${m.name}, ${m.role}`} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg leading-tight font-medium tracking-[-0.03em] sm:text-xl">{m.name}</p>
                        <p className="mt-1 text-sm text-muted">{m.role}</p>
                      </div>
                      {m.tag && <Badge tone="violet">{m.tag}</Badge>}
                    </div>
                    <p className="mt-4 text-[15px] leading-snug text-muted">{m.bio}</p>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={`${m.name} skills`}>
                      {m.skills.map((s) => (
                        <li key={s}>
                          <Badge>{s}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

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
