import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Service } from '../data'
import { cx } from '../lib/cx'
import { Holo } from './Holo'

/**
 * A service row from the home grid. It turns violet and lifts its 3D object in
 * when hovered, focused or `active` (the home page keeps one active).
 */
export function ServiceCard({
  service,
  active = false,
  onActivate,
  className,
  force,
}: {
  service: Service
  active?: boolean
  onActivate?: () => void
  className?: string
  force?: string
}) {
  const words = service.title.split(' ')
  const first = words.slice(0, Math.ceil(words.length / 2)).join(' ')
  const rest = words.slice(Math.ceil(words.length / 2)).join(' ')
  return (
    <Link
      to={`/services#${service.slug}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      data-active={active || undefined}
      data-force={force}
      className={cx(
        'group relative flex min-h-[184px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-6 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-soft)] sm:p-7',
        'bg-card text-ink hov:bg-violet hov:text-white data-[active]:bg-violet data-[active]:text-white focus-visible:bg-violet focus-visible:text-white focus-visible:outline-offset-[-6px] focus-visible:outline-white',
        className,
      )}
    >
      <h3 className="relative z-10 text-[clamp(1.35rem,1.05rem+0.8vw,1.75rem)] leading-[1.05] font-normal tracking-[-0.03em] uppercase">
        <span className="block">{first}</span>
        {rest && <span className="block">{rest}</span>}
      </h3>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-60%] left-[16%] w-[44%] max-w-[250px] translate-y-10 opacity-0 transition-[transform,opacity] duration-[var(--duration-slow)] ease-[var(--ease-out-soft)] group-hov:translate-y-0 group-hov:opacity-100"
      >
        <Holo kind={service.art} />
      </div>
      <div className="relative z-10 mt-6 flex items-end justify-end gap-5">
        <p className="caps max-w-[15rem] text-right text-[11.5px] sm:text-xs">{service.short}</p>
        <ArrowUpRight className="size-7 shrink-0 transition-transform duration-[var(--duration-base)] group-hov:translate-x-0.5 group-hov:-translate-y-0.5" strokeWidth={1.4} aria-hidden />
      </div>
    </Link>
  )
}
