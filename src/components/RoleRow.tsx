import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Role } from '../data'
import { Badge } from './Bits'

/** One open role as a full-width row. */
export function RoleRow({ role, applied, force }: { role: Role; applied?: boolean; force?: string }) {
  return (
    <Link
      to={`/careers/${role.slug}`}
      data-force={force}
      className="group grid gap-3 rounded-[var(--radius-card)] bg-card p-6 transition-colors duration-[var(--duration-base)] hov:bg-violet hov:text-white sm:grid-cols-[1.4fr_1fr_auto] sm:items-center sm:p-7"
    >
      <div>
        <p className="text-[clamp(1.35rem,1.05rem+0.8vw,1.9rem)] leading-[1.05] font-normal tracking-[-0.035em] uppercase">{role.title}</p>
        <p className="mt-2 text-[15px] text-muted transition-colors group-hov:text-white/85">{role.summary}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:justify-end">
        <Badge className="group-hov:bg-white/15 group-hov:text-white">{role.team}</Badge>
        <Badge tone="outline" className="group-hov:border-white/40 group-hov:text-white">
          {role.location}
        </Badge>
        {applied && (
          <Badge tone="violet" className="group-hov:bg-white group-hov:text-violet">
            Applied
          </Badge>
        )}
      </div>
      <ArrowUpRight className="hidden size-8 justify-self-end transition-transform group-hov:translate-x-0.5 group-hov:-translate-y-0.5 sm:block" strokeWidth={1.4} aria-hidden />
    </Link>
  )
}

