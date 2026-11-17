import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Project } from '../data'
import { cx } from '../lib/cx'
import { Badge, Photo } from './Bits'

/** A case study tile: photo, client, title and disciplines. */
export function ProjectCard({ project, size = 'md', className, force }: { project: Project; size?: 'md' | 'lg'; className?: string; force?: string }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      data-force={force}
      className={cx('group flex flex-col rounded-[var(--radius-card)] bg-card p-2 pb-5 transition-shadow duration-[var(--duration-base)] hov:shadow-[var(--shadow-card)]', className)}
    >
      <div className="relative">
        <Photo image={project.cover} ratio={size === 'lg' ? '16/10' : '4/3'} zoom className="rounded-[calc(var(--radius-card)-8px)]" alt="" />
        <span className="round absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white text-ink opacity-0 transition-[opacity,transform,background-color,color] duration-[var(--duration-base)] group-hov:opacity-100 group-hov:bg-violet group-hov:text-white">
          <ArrowUpRight className="size-5" strokeWidth={1.6} aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-3 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="caps text-muted">{project.client}</p>
          <p className="caps text-muted tabular-nums">{project.year}</p>
        </div>
        <h3 className={cx('mt-2 leading-[1.1] font-medium tracking-[-0.03em] text-balance transition-colors group-hov:text-violet', size === 'lg' ? 'text-[clamp(1.4rem,1.1rem+0.8vw,1.9rem)]' : 'text-xl')}>
          {project.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.disciplines.map((d) => (
            <Badge key={d} tone="neutral">
              {d}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
