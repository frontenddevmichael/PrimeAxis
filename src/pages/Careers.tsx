import { Reveal, Title } from '../components/Bits'
import { Card, Section } from '../components/Card'
import { Holo } from '../components/Holo'
import { PageHero } from '../components/Nav'
import { RoleRow } from '../components/RoleRow'
import { CAREERS, ROLES } from '../data'
import { KEYS, useDocumentTitle, usePersistentState, type SentApplication } from '../lib/storage'

export function Careers() {
  useDocumentTitle('Careers')
  const [applications] = usePersistentState<SentApplication[]>(KEYS.applications, [])
  return (
    <div className="grid gap-2 p-2">
      <PageHero title={CAREERS.title} eyebrow={`${ROLES.length} open roles`} intro={CAREERS.intro} art={<Holo kind="star" motion />} />

      <section aria-labelledby="roles-title" className="grid gap-2">
        <Section as="div" className="p-6 sm:p-8">
          <Title id="roles-title" lines={['Open', 'roles']} align="left" />
        </Section>
        <ul className="grid gap-2">
          {ROLES.map((r, i) => (
            <li key={r.slug}>
              <Reveal delay={i * 0.05}>
                <RoleRow role={r} applied={applications.some((a) => a.role === r.slug)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="perks-title" className="grid gap-2">
        <Section as="div" className="p-6 sm:p-8">
          <Title id="perks-title" lines={['Life at', 'Prime Axis']} />
        </Section>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CAREERS.perks.map((p, i) => (
            <li key={p.title}>
              <Card tone={i === 0 ? 'violet' : 'white'} className="flex h-full min-h-[220px] flex-col justify-between gap-8 p-6 sm:p-7">
                <span className={i === 0 ? 'caps text-white/80' : 'caps text-muted'}>0{i + 1}</span>
                <div>
                  <h3 className="text-xl leading-tight font-medium tracking-[-0.03em] uppercase">{p.title}</h3>
                  <p className={i === 0 ? 'mt-2 text-white/85' : 'mt-2 text-muted'}>{p.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
