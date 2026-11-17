import { ArrowRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import type { Role } from '../data'
import { postJson } from '../lib/api'
import { KEYS, usePersistentState, type SentApplication } from '../lib/storage'
import { validateApplication, type FieldErrors } from '../shared/validation'
import { Button } from './Button'
import { Checkbox, Field, FormMessage, Input, Textarea } from './Field'
import { useToast } from './Overlay'

const EMPTY = { name: '', email: '', portfolio: '', note: '', consent: false }

/** Application for one role. Posts to /api/applications; remembers the reference in the browser. */
export function ApplyForm({ role }: { role: Role }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [applications, setApplications] = usePersistentState<SentApplication[]>(KEYS.applications, [])
  const [again, setAgain] = useState(false)
  const toast = useToast()
  const sent = applications.find((a) => a.role === role.slug)

  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload = { ...values, role: role.slug }
    const local = validateApplication(payload)
    setErrors(local)
    if (Object.values(local).some(Boolean)) {
      setFormError('Please check the highlighted fields.')
      return
    }
    setFormError('')
    setLoading(true)
    const res = await postJson<{ reference: string }>('/api/applications', payload)
    setLoading(false)
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {})
      setFormError(res.error)
      return
    }
    setApplications((list) => [{ reference: res.data.reference, sentAt: new Date().toISOString(), role: role.slug }, ...list.filter((a) => a.role !== role.slug)])
    setValues(EMPTY)
    setAgain(false)
    toast('Application sent. Thank you!')
  }

  if (sent && !again)
    return (
      <div role="status" className="flex flex-col gap-4">
        <p className="display text-3xl">Application received</p>
        <p className="text-muted">
          You applied on {new Date(sent.sentAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. Your reference is{' '}
          <strong className="font-medium text-ink">{sent.reference}</strong>. We reply to every application within ten working days.
        </p>
        <Button variant="outline" className="self-start" onClick={() => setAgain(true)}>
          Send an updated application
        </Button>
      </div>
    )

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <Field label="Full name" error={errors.name}>
        {(p) => <Input {...p} autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />}
      </Field>
      <Field label="Email" error={errors.email}>
        {(p) => <Input {...p} type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} />}
      </Field>
      <Field label="Portfolio or reel" hint="A link to Behance, a PDF, your site or a reel." error={errors.portfolio}>
        {(p) => <Input {...p} inputMode="url" placeholder="behance.net/you" value={values.portfolio} onChange={(e) => set('portfolio', e.target.value)} />}
      </Field>
      <Field label="A short note" optional error={errors.note} hint={`${values.note.length} / 1,500`}>
        {(p) => <Textarea {...p} rows={4} value={values.note} onChange={(e) => set('note', e.target.value)} placeholder="What would you like to make with us?" />}
      </Field>
      <Checkbox
        label="Keep my application for 12 months in case another role fits."
        checked={values.consent}
        onChange={(e) => set('consent', e.target.checked)}
        error={errors.consent}
      />
      {formError && <FormMessage tone="error">{formError}</FormMessage>}
      <Button type="submit" variant="violet" size="lg" loading={loading} iconRight={<ArrowRight className="size-5" />}>
        Send application
      </Button>
    </form>
  )
}
