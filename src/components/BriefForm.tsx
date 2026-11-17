import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type FormEvent } from 'react'

import { CONTACT } from '../data'
import { postJson } from '../lib/api'
import { KEYS, usePersistentState, type SentBrief } from '../lib/storage'
import { validateBrief, validateBriefStep, type BriefInput, type FieldErrors } from '../shared/validation'
import { Button } from './Button'
import { Stepper } from './Content'
import { ChoiceGroup, Field, FormMessage, Input, Textarea } from './Field'
import { useToast } from './Overlay'

const EMPTY: BriefInput = { services: [], message: '', budget: '', timeline: '', name: '', email: '', company: '', website: '' }

/**
 * The three-step project brief. The draft (answers and step) is kept in the
 * browser, so a reload carries on where you left off. Posts to /api/briefs.
 */
export function BriefForm({ onSent }: { onSent?: (b: SentBrief) => void }) {
  const [draft, setDraft, clearDraft] = usePersistentState<{ step: number; values: BriefInput }>(KEYS.briefDraft, { step: 0, values: EMPTY })
  const [, setBriefs] = usePersistentState<SentBrief[]>(KEYS.briefs, [])
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState<SentBrief | null>(null)
  const top = useRef<HTMLDivElement>(null)
  const toast = useToast()
  const { step, values } = draft

  const set = <K extends keyof BriefInput>(k: K, v: BriefInput[K]) => {
    setDraft((d) => ({ ...d, values: { ...d.values, [k]: v } }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }))
  }
  const goTo = (n: number) => {
    setDraft((d) => ({ ...d, step: n }))
    setFormError('')
    requestAnimationFrame(() => top.current?.focus({ preventScroll: false }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const local = validateBriefStep(step, values)
    setErrors(local)
    if (Object.keys(local).length) {
      setFormError('Please check the highlighted fields.')
      return
    }
    if (step < 2) return goTo(step + 1)
    const all = validateBrief(values)
    if (Object.keys(all).length) {
      setErrors(all)
      setFormError('Some earlier answers need a look.')
      return
    }
    setFormError('')
    setLoading(true)
    const res = await postJson<{ reference: string }>('/api/briefs', values)
    setLoading(false)
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {})
      setFormError(res.error)
      return
    }
    const brief: SentBrief = { reference: res.data.reference, sentAt: new Date().toISOString(), services: values.services, budget: values.budget, name: values.name }
    setBriefs((list) => [brief, ...list].slice(0, 10))
    clearDraft()
    setSent(brief)
    onSent?.(brief)
    toast('Brief sent. Talk soon!')
  }

  if (sent)
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <span className="round grid size-14 place-items-center rounded-full bg-violet text-white">
          <Check className="size-7" aria-hidden />
        </span>
        <p className="display text-[clamp(2.2rem,1.6rem+2vw,3.6rem)]">Brief received</p>
        <p className="max-w-md text-muted">
          Thank you, {sent.name.split(' ')[0]}. Your reference is <strong className="font-medium text-ink">{sent.reference}</strong>. We’ll respond within 24 hours with a focused plan.
        </p>
        <Button variant="outline" onClick={() => setSent(null)}>
          Send another brief
        </Button>
      </div>
    )

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8" aria-labelledby="brief-step-title">
      <Stepper steps={CONTACT.steps} current={step} />
      <div ref={top} tabIndex={-1} className="focus:outline-none">
        <h2 id="brief-step-title" className="display text-[clamp(1.8rem,1.4rem+1.4vw,2.8rem)] leading-[0.95]">
          {CONTACT.steps[step]}
        </h2>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-7"
        >
          {step === 0 && (
            <>
              <ChoiceGroup legend="What can we help with?" hint="Choose as many as you like." type="checkbox" name="services" options={CONTACT.services} value={values.services} onChange={(v) => set('services', v as string[])} error={errors.services} />
              <Field label="Tell us about the project" error={errors.message} hint={`${values.message.trim().length} / 3,000`}>
                {(p) => <Textarea {...p} rows={6} value={values.message} onChange={(e) => set('message', e.target.value)} placeholder="What are you making, who is it for and what does success look like?" />}
              </Field>
            </>
          )}
          {step === 1 && (
            <>
              <ChoiceGroup legend="Budget" type="radio" name="budget" options={CONTACT.budgets} value={values.budget} onChange={(v) => set('budget', v as string)} error={errors.budget} />
              <ChoiceGroup legend="When would you like to start?" type="radio" name="timeline" options={CONTACT.timelines} value={values.timeline} onChange={(v) => set('timeline', v as string)} error={errors.timeline} />
            </>
          )}
          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" error={errors.name}>
                {(p) => <Input {...p} autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />}
              </Field>
              <Field label="Work email" error={errors.email}>
                {(p) => <Input {...p} type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} />}
              </Field>
              <Field label="Company" optional error={errors.company}>
                {(p) => <Input {...p} autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} />}
              </Field>
              <Field label="Website" optional error={errors.website}>
                {(p) => <Input {...p} inputMode="url" placeholder="yourcompany.com" value={values.website} onChange={(e) => set('website', e.target.value)} />}
              </Field>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {formError && <FormMessage tone="error">{formError}</FormMessage>}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {step > 0 ? (
          <Button variant="ghost" icon={<ArrowLeft className="size-4" />} onClick={() => goTo(step - 1)}>
            Back
          </Button>
        ) : (
          <p className="text-[13px] text-muted">Your answers are saved in this browser as you type.</p>
        )}
        <Button type="submit" variant={step === 2 ? 'violet' : 'solid'} size="lg" loading={loading} iconRight={<ArrowRight className="size-5" />}>
          {step === 2 ? 'Send brief' : 'Continue'}
        </Button>
      </div>
    </form>
  )
}
