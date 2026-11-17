// Validation shared by the forms (instant feedback) and the Worker (the
// authority). Each validator returns a map of field -> message; empty = valid.
import { CONTACT, ROLES } from '../data'

export type FieldErrors = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

function isUrl(value: string) {
  try {
    const u = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return u.hostname.includes('.')
  } catch {
    return false
  }
}

function person(input: Record<string, unknown>, errors: FieldErrors) {
  const name = str(input.name)
  if (name.length < 2) errors.name = 'Enter your name.'
  else if (name.length > 120) errors.name = 'Keep your name under 120 characters.'
  if (!EMAIL.test(str(input.email))) errors.email = 'Enter a valid email address.'
}

export type BriefInput = {
  services: string[]
  message: string
  budget: string
  timeline: string
  name: string
  email: string
  company: string
  website: string
}

export function validateBriefStep(step: number, input: Record<string, unknown>): FieldErrors {
  const errors: FieldErrors = {}
  if (step === 0) {
    const services = Array.isArray(input.services) ? input.services : []
    if (!services.length) errors.services = 'Choose at least one service.'
    else if (services.some((s) => !(CONTACT.services as readonly string[]).includes(String(s)))) errors.services = 'Choose services from the list.'
    const message = str(input.message)
    if (message.length < 20) errors.message = 'Tell us a little more (at least 20 characters).'
    else if (message.length > 3000) errors.message = 'Keep it under 3,000 characters.'
  }
  if (step === 1) {
    if (!(CONTACT.budgets as readonly string[]).includes(str(input.budget))) errors.budget = 'Choose a budget range.'
    if (!(CONTACT.timelines as readonly string[]).includes(str(input.timeline))) errors.timeline = 'Choose a timeline.'
  }
  if (step === 2) {
    person(input, errors)
    if (str(input.company).length > 120) errors.company = 'Keep the company name under 120 characters.'
    const website = str(input.website)
    if (website && !isUrl(website)) errors.website = 'Enter a valid web address, e.g. yourcompany.com.'
  }
  return errors
}

export function validateBrief(input: Record<string, unknown>): FieldErrors {
  return { ...validateBriefStep(0, input), ...validateBriefStep(1, input), ...validateBriefStep(2, input) }
}

export function validateApplication(input: Record<string, unknown>): FieldErrors {
  const errors: FieldErrors = {}
  if (!ROLES.some((r) => r.slug === str(input.role))) errors.role = 'That role is no longer open.'
  person(input, errors)
  const portfolio = str(input.portfolio)
  if (!portfolio) errors.portfolio = 'Add a link to your portfolio or reel.'
  else if (!isUrl(portfolio)) errors.portfolio = 'Enter a valid link, e.g. behance.net/you.'
  if (str(input.note).length > 1500) errors.note = 'Keep your note under 1,500 characters.'
  if (input.consent !== true) errors.consent = 'Please agree so we can keep your application.'
  return errors
}

export function validateSubscribe(input: Record<string, unknown>): FieldErrors {
  return EMAIL.test(str(input.email)) ? {} : { email: 'Enter a valid email address.' }
}
