import { ArrowRight } from 'lucide-react'

import { ArrowLink } from '../components/Bits'
import { ButtonLink } from '../components/Button'
import { Section } from '../components/Card'
import { Holo } from '../components/Holo'
import { Nav } from '../components/Nav'
import { SHOW_PROJECTS } from '../data'
import { usePageMeta } from '../lib/seo'

export function NotFound({
  title = 'Page not found',
  body = 'The page you are looking for has moved, or the link has a typo. Everything else is still here.',
  to = '/',
  action = 'Back to home',
}: {
  title?: string
  body?: string
  to?: string
  action?: string
}) {
  usePageMeta({ title, description: body, noindex: true })
  return (
    <div className="p-2">
      <Section aria-labelledby="nf-title" className="relative overflow-hidden px-5 pt-3 pb-8 sm:px-8">
        <Nav />
        <div className="relative grid min-h-[min(72svh,720px)] items-end gap-8 pt-10 lg:grid-cols-[1fr_1fr]">
          <div className="mx-auto w-[min(80vw,480px)] lg:mx-0" aria-hidden>
            <Holo kind="prism" motion />
          </div>
          <div className="flex flex-col items-end gap-6 text-right">
            <p className="display text-[clamp(7rem,3rem+16vw,18rem)] leading-[0.78] text-violet" aria-hidden>
              404
            </p>
            <h1 id="nf-title" className="display text-[clamp(2rem,1.4rem+2vw,3.4rem)]">
              {title}
            </h1>
            <p className="max-w-md text-muted">{body}</p>
            <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-3">
              <ArrowLink to={SHOW_PROJECTS ? '/work' : '/services'} tone="ink" size="sm">
                {SHOW_PROJECTS ? 'See our work' : 'See our services'}
              </ArrowLink>
              <ButtonLink to={to} variant="solid" iconRight={<ArrowRight className="size-4" />}>
                {action}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
