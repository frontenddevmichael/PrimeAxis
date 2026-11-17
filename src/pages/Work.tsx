import { Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { Chip, EmptyState } from '../components/Bits'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Holo } from '../components/Holo'
import { EASE } from '../components/Motion'
import { PageHero } from '../components/Nav'
import { ProjectCard } from '../components/ProjectCard'
import { DISCIPLINES, PROJECTS } from '../data'
import { useDocumentTitle } from '../lib/storage'

export function Work() {
  useDocumentTitle('Work')
  const [params, setParams] = useSearchParams()
  const discipline = params.get('d') ?? ''
  const query = params.get('q') ?? ''

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter(
      (p) =>
        (!discipline || p.disciplines.includes(discipline)) &&
        (!q || `${p.client} ${p.title} ${p.summary}`.toLowerCase().includes(q)),
    )
  }, [discipline, query])

  return (
    <div className="grid gap-2 p-2">
      <PageHero
        title={['Selected', 'projects']}
        eyebrow={`${PROJECTS.length} case studies`}
        intro="Identities, products and campaigns we made with brave clients, from first workshop to launch day."
        art={<Holo kind="knot" motion className="opacity-90" />}
      />
      <Card className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-2">
          <Chip selected={!discipline} onClick={() => update('d', '')}>
            All
          </Chip>
          {DISCIPLINES.map((d) => (
            <Chip key={d} selected={discipline === d} onClick={() => update('d', discipline === d ? '' : d)}>
              {d}
              <span className="text-[13px] opacity-70 tabular-nums">{PROJECTS.filter((p) => p.disciplines.includes(d)).length}</span>
            </Chip>
          ))}
        </div>
        <div className="round relative w-full rounded-full lg:w-80">
          <label htmlFor="work-search" className="sr-only">
            Search projects
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="work-search"
            type="search"
            value={query}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Search clients or projects"
            className="round h-11 w-full rounded-full border border-line-strong bg-card pr-11 pl-11 text-[15px] placeholder:text-muted transition-[border-color,box-shadow] focus:border-violet focus:shadow-[var(--shadow-focus)] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => update('q', '')}
              className="round absolute top-1/2 right-0.5 grid size-10 -translate-y-1/2 place-items-center rounded-full text-muted hov:text-ink"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </Card>
      <p className="sr-only" role="status">
        {results.length} {results.length === 1 ? 'project' : 'projects'} shown
      </p>
      {results.length ? (
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ProjectCard project={p} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card>
          <EmptyState
            title="No projects match"
            body={`Nothing in ${discipline || 'our work'} matches “${query}”. Try another word or clear the filters.`}
            action={
              <Button variant="outline" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
                Clear filters
              </Button>
            }
          />
        </Card>
      )}
    </div>
  )
}
