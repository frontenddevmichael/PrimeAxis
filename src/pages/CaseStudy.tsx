import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { ArrowLink, Badge, Photo, Reveal } from '../components/Bits'
import { Card, Section } from '../components/Card'
import { Nav } from '../components/Nav'
import { PROJECTS } from '../data'
import { useDocumentTitle } from '../lib/storage'
import { NotFound } from './NotFound'

export function CaseStudy() {
  const { slug } = useParams()
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const project = PROJECTS[index]
  useDocumentTitle(project?.client ?? 'Project not found')
  if (!project) return <NotFound title="Project not found" body="That case study has moved or never existed. Have a look at the rest of our work." to="/work" action="All projects" />
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  const [, second, third] = project.gallery

  return (
    <div className="grid gap-2 p-2">
      <Section aria-labelledby="cs-title" className="px-5 pt-3 pb-6 sm:px-8 sm:pb-8">
        <Nav />
        <Link to="/work" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hov:text-ink">
          <ArrowLeft className="size-4" aria-hidden />
          All projects
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="caps text-violet">{project.client}</p>
            <h1 id="cs-title" className="display mt-4 max-w-5xl text-[clamp(2.6rem,1rem+5.2vw,6.4rem)] leading-[0.9] text-balance">
              {project.title}
            </h1>
          </div>
          <dl className="grid grid-cols-3 gap-6 text-sm lg:grid-cols-1 lg:gap-3 lg:text-right">
            <div>
              <dt className="caps text-muted">Year</dt>
              <dd className="mt-1 tabular-nums">{project.year}</dd>
            </div>
            <div>
              <dt className="caps text-muted">Client</dt>
              <dd className="mt-1">{project.client}</dd>
            </div>
            <div>
              <dt className="caps text-muted">Services</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5 lg:justify-end">
                {project.disciplines.map((d) => (
                  <Badge key={d}>{d}</Badge>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <Photo image={project.cover} ratio="16/8" parallax className="mt-8 rounded-[var(--radius-card-sm)]" loading="eager" />
      </Section>

      <div className="grid gap-2 md:grid-cols-[1fr_1fr]">
        <Card className="p-6 sm:p-8">
          <p className="caps text-muted">Overview</p>
          <p className="mt-4 text-[clamp(1.3rem,1rem+1vw,2rem)] leading-[1.15] tracking-[-0.03em] text-balance">{project.summary}</p>
        </Card>
        <Card className="grid gap-8 p-6 sm:p-8">
          <div>
            <h2 className="caps text-muted">The challenge</h2>
            <p className="mt-3 text-ink-2">{project.challenge}</p>
          </div>
          <div>
            <h2 className="caps text-muted">Our approach</h2>
            <p className="mt-3 text-ink-2">{project.approach}</p>
          </div>
        </Card>
      </div>

      <Section aria-labelledby="results-title" className="px-5 py-10 sm:px-8 sm:py-14">
        <h2 id="results-title" className="caps text-muted">
          Results
        </h2>
        <ul className="mt-6 grid gap-8 sm:grid-cols-3">
          {project.results.map((r) => (
            <li key={r.label}>
              <p className="text-[clamp(3rem,2rem+3vw,5.5rem)] leading-none font-normal tracking-[-0.06em]">{r.value}</p>
              <p className="mt-3 max-w-[16rem] text-muted">{r.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {second && (
        <div className={third ? 'grid gap-2 md:grid-cols-[1.4fr_1fr]' : ''}>
          <Reveal>
            <Photo image={second} ratio={third ? '4/3' : '16/8'} parallax className="rounded-[var(--radius-card)]" />
          </Reveal>
          {third && (
            <Reveal delay={0.08}>
              <Photo image={third} ratio="4/5" parallax className="h-full rounded-[var(--radius-card)] md:aspect-auto" />
            </Reveal>
          )}
        </div>
      )}

      {project.quote && (
        <Card as="figure" tone="violet" className="p-6 sm:p-10">
          <blockquote className="max-w-4xl text-[clamp(1.6rem,1rem+2vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-balance">“{project.quote.text}”</blockquote>
          <figcaption className="mt-8">
            <span className="block font-medium">{project.quote.name}</span>
            <span className="text-sm text-white/80">{project.quote.role}</span>
          </figcaption>
        </Card>
      )}

      <Section as="div" className="px-5 py-10 sm:px-8 sm:py-12">
        <Link to={`/work/${next.slug}`} className="group grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="caps text-muted">Next project</p>
            <p className="display mt-4 text-[clamp(2.2rem,1.4rem+2.6vw,4.4rem)] transition-colors group-hov:text-violet">{next.client}</p>
            <p className="mt-3 max-w-md text-muted">{next.title}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors group-hov:text-ink">
            View project
            <ArrowLeft className="size-4 rotate-180" aria-hidden />
          </span>
        </Link>
      </Section>
      <Card className="flex justify-end p-5 sm:p-6">
        <ArrowLink to="/contact">Start a project like this</ArrowLink>
      </Card>
    </div>
  )
}
