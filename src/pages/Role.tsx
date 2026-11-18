import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { ApplyForm } from '../components/ApplyForm'
import { Badge } from '../components/Bits'
import { Card, Section } from '../components/Card'
import { Nav } from '../components/Nav'
import { RoleRow } from '../components/RoleRow'
import { ROLES } from '../data'
import { usePageMeta } from '../lib/seo'
import { NotFound } from './NotFound'

export function RolePage() {
  const { slug } = useParams()
  const role = ROLES.find((r) => r.slug === slug)
  usePageMeta({
    title: role?.title ?? 'Role not found',
    description: role?.summary ?? 'That role has been filled or closed. See what is open at Prime Axis now.',
    noindex: !role,
  })
  if (!role) return <NotFound title="Role not found" body="That role has been filled or closed. Have a look at what is open now." to="/careers" action="Open roles" />
  const others = ROLES.filter((r) => r.slug !== role.slug).slice(0, 2)

  return (
    <div className="grid gap-2 p-2">
      <Section aria-labelledby="role-title" className="px-5 pt-3 pb-8 sm:px-8">
        <Nav />
        <Link to="/careers" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hov:text-ink">
          <ArrowLeft className="size-4" aria-hidden />
          All roles
        </Link>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 id="role-title" className="display text-[clamp(2.8rem,1.2rem+5.4vw,7rem)]">
            {role.title}
          </h1>
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="violet">{role.team}</Badge>
            <Badge tone="outline">{role.location}</Badge>
            <Badge tone="outline">{role.type}</Badge>
          </div>
        </div>
      </Section>

      <div className="grid gap-2 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <Card className="grid gap-10 p-6 sm:p-8">
          <p className="text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-[1.2] tracking-[-0.03em] text-balance">{role.summary}</p>
          <div>
            <h2 className="caps text-muted">What you will do</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {role.responsibilities.map((r) => (
                <li key={r} className="py-3.5">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="caps text-muted">What you bring</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {role.requirements.map((r) => (
                <li key={r} className="py-3.5">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <Card as="section" aria-labelledby="apply-title" className="p-6 sm:p-8 lg:sticky lg:top-[5.5rem]">
          <h2 id="apply-title" className="display mb-6 text-[2.2rem] leading-[0.92]">
            Apply for this role
          </h2>
          <ApplyForm role={role} />
        </Card>
      </div>

      {others.length > 0 && (
        <section aria-labelledby="others-title" className="grid gap-2">
          <h2 id="others-title" className="sr-only">
            Other open roles
          </h2>
          {others.map((r) => (
            <RoleRow key={r.slug} role={r} />
          ))}
        </section>
      )}
    </div>
  )
}
