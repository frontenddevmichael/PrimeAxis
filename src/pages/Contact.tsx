import { ArrowUpRight } from 'lucide-react'

import { BriefForm } from '../components/BriefForm'
import { Badge } from '../components/Bits'
import { buttonClass } from '../components/Button'
import { Card } from '../components/Card'
import { Holo } from '../components/Holo'
import { PageHero } from '../components/Nav'
import { CONTACT, SITE } from '../data'
import { KEYS, useDocumentTitle, usePersistentState, type SentBrief } from '../lib/storage'

export function Contact() {
  useDocumentTitle('Start a project')
  const [briefs, setBriefs] = usePersistentState<SentBrief[]>(KEYS.briefs, [])
  return (
    <div className="grid gap-2 p-2">
      <PageHero title={CONTACT.title} eyebrow="Contact" intro={CONTACT.intro} art={<Holo kind="cloud" motion />} />
      <div className="grid gap-2 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <Card className="p-6 sm:p-10">
          <BriefForm onSent={(b) => setBriefs((list) => (list.some((x) => x.reference === b.reference) ? list : [b, ...list]))} />
        </Card>
        <div className="grid gap-2">
          <Card tone="night" className="grid gap-6 p-6 sm:p-8">
            <div>
              <p className="caps text-night-muted">New business</p>
              <a href={`mailto:${SITE.email}`} className="mt-2 inline-flex min-h-10 items-center text-[clamp(1.2rem,1rem+0.6vw,1.6rem)] tracking-[-0.03em] break-all text-white hov:text-violet-light">
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex min-h-10 items-center text-white hov:text-violet-light">
                {SITE.phone}
              </a>
            </div>
            <address className="text-white not-italic">
              <p className="caps mb-2 text-night-muted">Studio</p>
              {SITE.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <span className="mt-2 block text-sm text-night-muted">{SITE.hours}</span>
            </address>
            <div className="flex items-center justify-between gap-4 border-t border-white/12 pt-4">
              <span className="caps text-night-muted">Response time</span>
              <span className="text-white">{CONTACT.response}</span>
            </div>
          </Card>
          <Card as="section" tone="violet" aria-labelledby="consultation-title" className="grid gap-5 p-6 sm:p-8">
            <p className="caps text-white/75">{CONTACT.consultation.tag}</p>
            <h2 id="consultation-title" className="display text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] leading-[0.95]">
              {CONTACT.consultation.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-white/90">{CONTACT.consultation.body}</p>
            <div>
              <a className={buttonClass('light', 'md')} href={SITE.whatsapp} target="_blank" rel="noreferrer">
                {CONTACT.consultation.action}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <p className="mt-3 text-[13px] text-white/70">{CONTACT.consultation.note}</p>
            </div>
          </Card>
          <Card as="section" aria-labelledby="sent-title" className="p-6 sm:p-8">
            <h2 id="sent-title" className="caps text-muted">
              Your briefs
            </h2>
            {briefs.length ? (
              <ul className="mt-4 divide-y divide-line">
                {briefs.map((b) => (
                  <li key={b.reference} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div>
                      <p className="font-medium tabular-nums">{b.reference}</p>
                      <p className="text-sm text-muted">
                        {new Date(b.sentAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}, {b.budget}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {b.services.map((s) => (
                        <Badge key={s} tone="violet">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[15px] text-muted">Briefs you send from this browser appear here with their reference, so you can quote it when we reply.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
