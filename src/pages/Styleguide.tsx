import { ArrowRight, Mail, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'

import { ApplyForm } from '../components/ApplyForm'
import { ArrowLink, Avatar, Badge, Chip, CountUp, EmptyState, Logo, Photo, Stat, Title, type BadgeTone } from '../components/Bits'
import { BriefForm } from '../components/BriefForm'
import { Button, ButtonLink, IconButton, type ButtonVariant, type IconTone } from '../components/Button'
import { Card, type CardTone } from '../components/Card'
import { Accordion, Marquee, Stepper, TestimonialSlider } from '../components/Content'
import { Checkbox, ChoiceGroup, Field, FormMessage, Input, Select, Textarea } from '../components/Field'
import { NewsletterForm } from '../components/Footer'
import { Holo, HoloSvg } from '../components/Holo'
import { Modal, useToast } from '../components/Overlay'
import { PageHero } from '../components/Nav'
import { ProjectCard } from '../components/ProjectCard'
import { RoleRow } from '../components/RoleRow'
import { ServiceCard } from '../components/ServiceCard'
import { CLIENTS, CONTACT, FAQ, PROJECTS, ROLES, SERVICES, TESTIMONIALS, type HoloKind } from '../data'
import { cx } from '../lib/cx'
import { useDocumentTitle } from '../lib/storage'

// Mirrors @theme in src/styles.css.
const COLORS = [
  { name: 'Canvas', token: 'canvas', hex: '#e9e9ec', use: 'Page background, gutters between cards' },
  { name: 'Card', token: 'card', hex: '#ffffff', use: 'Panels, inputs' },
  { name: 'Soft', token: 'soft', hex: '#f3f3f5', use: 'Badges, image wells, ghost hover' },
  { name: 'Line', token: 'line', hex: '#e3e3e8', use: 'Hairlines and dividers' },
  { name: 'Line strong', token: 'line-strong', hex: '#c9c9d1', use: 'Input and chip borders' },
  { name: 'Ink', token: 'ink', hex: '#0b0b0c', use: 'Text, solid buttons' },
  { name: 'Ink 2', token: 'ink-2', hex: '#26262b', use: 'Body copy, solid hover' },
  { name: 'Muted', token: 'muted', hex: '#5c5c66', use: 'Secondary text (AA on card and canvas)' },
  { name: 'Faint', token: 'faint', hex: '#9b9ba5', use: 'Decoration only, never text' },
  { name: 'Night', token: 'night', hex: '#050505', use: 'Dark cards, footer' },
  { name: 'Night muted', token: 'night-muted', hex: '#a6a6b0', use: 'Secondary text on night' },
  { name: 'Violet', token: 'violet', hex: '#5b14f5', use: 'Brand, links, active cards' },
  { name: 'Violet deep', token: 'violet-deep', hex: '#4207c4', use: 'Violet hover and press' },
  { name: 'Violet soft', token: 'violet-soft', hex: '#ede6ff', use: 'Violet badges' },
  { name: 'Violet light', token: 'violet-light', hex: '#b9a2ff', use: 'Accents on night' },
  { name: 'Pink', token: 'pink', hex: '#ff8ad8', use: 'Iridescent highlights' },
  { name: 'Cyan', token: 'cyan', hex: '#74e3ff', use: 'Iridescent highlights' },
  { name: 'Success', token: 'success', hex: '#13764a', use: 'Confirmations' },
  { name: 'Danger', token: 'danger', hex: '#c0262d', use: 'Errors' },
]
const TYPE = [
  { label: 'Hero', spec: 'min(10.1vw, 17svh) / 0.86 / −0.055em', cls: 'display text-[clamp(3rem,8vw,8rem)]', sample: 'Limitless' },
  { label: 'Page title', spec: 'clamp(3.4rem … 10rem)', cls: 'display text-[clamp(2.6rem,6vw,6rem)] tracking-[-0.06em]', sample: 'What we do' },
  { label: 'Section title', spec: 'clamp(2rem … 3.25rem) / 0.92', cls: 'display text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[0.92]', sample: 'Explore our services' },
  { label: 'Card title', spec: '1.35–1.75rem / 1.05, caps', cls: 'text-[1.75rem] leading-[1.05] tracking-[-0.03em] uppercase', sample: 'Brand identity creation' },
  { label: 'Figure', spec: '3rem / 1, −0.05em', cls: 'text-5xl tracking-[-0.05em]', sample: '+300' },
  { label: 'Lead', spec: '17px / 1.6', cls: 'text-[17px]', sample: 'Bold, careful work built to last.' },
  { label: 'Body', spec: '16px / 1.55', cls: 'text-base', sample: 'We read every brief ourselves and reply within two working days.' },
  { label: 'Small', spec: '13–15px', cls: 'text-sm text-muted', sample: 'Your answers are saved in this browser.' },
  { label: 'Caps caption', spec: '12px / 1.18, caps', cls: 'caps', sample: 'Unleashing boundless creativity' },
]
const SPACING = [4, 8, 12, 16, 24, 32, 40, 64, 96]
const RADII = [
  { name: 'xs', value: '10px', cls: 'rounded-[var(--radius-xs)]', use: 'Small chips inside cards' },
  { name: 'control', value: '16px', cls: 'rounded-[var(--radius-control)]', use: 'Inputs, messages' },
  { name: 'card-sm', value: '22px', cls: 'rounded-[var(--radius-card-sm)]', use: 'Photos inside cards' },
  { name: 'card', value: '30px', cls: 'rounded-[var(--radius-card)]', use: 'Every panel' },
  { name: 'full', value: '9999px', cls: 'round rounded-full', use: 'Buttons, chips, icon buttons' },
]
const SHADOWS = [
  { name: 'card', token: '--shadow-card', use: 'Hovered project tiles' },
  { name: 'float', token: '--shadow-float', use: 'Dialogs' },
  { name: 'violet', token: '--shadow-violet', use: 'Violet buttons on hover, toasts' },
  { name: 'focus', token: '--shadow-focus', use: 'Focused inputs' },
]
const MOTION = [
  { name: 'fast', token: '--duration-fast', ms: 160, use: 'Colour changes on hover and press' },
  { name: 'base', token: '--duration-base', ms: 320, use: 'Arrows, underlines, card colour' },
  { name: 'slow', token: '--duration-slow', ms: 700, use: 'Reveals, art lifting into service cards' },
  { name: 'hero', token: '--duration-hero', ms: 1100, use: 'Headline lines rising in' },
]
const LOOPS = [
  { name: 'spin-slow', use: 'The hero knot, 80 s a turn' },
  { name: 'float', use: 'Other 3D objects, 8 s' },
  { name: 'marquee', use: 'Client names, 38 s' },
  { name: 'shimmer', use: 'Loading skeletons' },
]
const STATES = ['default', 'hover', 'focus', 'pressed', 'disabled'] as const
const BUTTONS: ButtonVariant[] = ['solid', 'violet', 'outline', 'ghost', 'light']
const ICON_TONES: IconTone[] = ['ink', 'outline', 'violet', 'light']
const BADGES: BadgeTone[] = ['neutral', 'violet', 'outline', 'success', 'light']
const CARDS: CardTone[] = ['white', 'soft', 'violet', 'night']
const HOLOS: HoloKind[] = ['knot', 'sphere', 'cloud', 'scissors', 'star', 'prism']

const SECTIONS = [
  ['colour', 'Colour'],
  ['type', 'Type'],
  ['space', 'Spacing, radii, shadows'],
  ['motion', 'Motion'],
  ['art', '3D objects'],
  ['buttons', 'Buttons and links'],
  ['forms', 'Form fields'],
  ['choices', 'Chips and choices'],
  ['badges', 'Badges, cards, avatars'],
  ['content', 'Content blocks'],
  ['cards', 'Service, project, role'],
  ['overlays', 'Modal, menu, toast'],
  ['states', 'Empty and loading'],
  ['flows', 'Forms in full'],
] as const

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <Card as="section" id={id} aria-labelledby={`${id}-h`} className="scroll-mt-2 p-6 sm:p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <h2 id={`${id}-h`} className="display text-[clamp(1.8rem,1.4rem+1.2vw,2.6rem)] leading-[0.95]">
          {title}
        </h2>
        {note && <p className="max-w-md text-sm text-muted">{note}</p>}
      </div>
      {children}
    </Card>
  )
}

function Label({ children }: { children: ReactNode }) {
  return <p className="caps mb-3 text-muted">{children}</p>
}

const force = (s: (typeof STATES)[number]) => (s === 'default' || s === 'disabled' ? undefined : s)

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

function MotionDemo() {
  const [run, setRun] = useState(0)
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Label>Durations (ease-out-soft)</Label>
        <Button size="sm" variant="outline" onClick={() => setRun((n) => n + 1)}>
          Replay
        </Button>
      </div>
      <ul className="grid gap-4">
        {MOTION.map((m) => (
          <li key={m.name} className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:items-center">
            <div>
              <p className="font-medium">
                {m.name} <span className="text-sm font-normal text-muted tabular-nums">{m.ms} ms</span>
              </p>
              <p className="text-[13px] text-muted">{m.use}</p>
            </div>
            <div className="round relative h-11 rounded-full bg-soft">
              <motion.span
                key={run}
                className="round absolute top-1.5 left-1.5 size-8 rounded-full bg-violet"
                initial={{ x: 0 }}
                animate={{ x: 'calc(min(60vw, 640px) - 44px)' }}
                transition={{ duration: m.ms / 1000, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px] text-muted">
        Easings: <code>--ease-out-soft</code> cubic-bezier(0.22, 1, 0.36, 1) for everything that enters; <code>--ease-in-out-soft</code> cubic-bezier(0.65, 0, 0.35, 1) for moves across. With reduced motion,
        loops stop and movement becomes instant.
      </p>
      <Label>
        <span className="mt-8 block">Loops</span>
      </Label>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LOOPS.map((l) => (
          <li key={l.name} className="rounded-[var(--radius-card-sm)] bg-soft p-4">
            <div className="mb-3 grid h-20 place-items-center overflow-hidden" aria-hidden>
              {l.name === 'spin-slow' && <Holo kind="knot" motion className="h-20 w-20 [&_g]:animate-[spin-slow_6s_linear_infinite] [&_img]:animate-[spin-slow_6s_linear_infinite]" />}
              {l.name === 'float' && <Holo kind="star" motion className="h-20 w-20" />}
              {l.name === 'marquee' && <Marquee items={['Prime Axis', 'Studio']} className="w-full [&_li]:text-lg" />}
              {l.name === 'shimmer' && <span className="skeleton round block h-4 w-3/4 rounded-full" />}
            </div>
            <p className="font-medium">{l.name}</p>
            <p className="text-[13px] text-muted">{l.use}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Styleguide() {
  useDocumentTitle('Style guide')
  const [modal, setModal] = useState(false)
  const [multi, setMulti] = useState<string[]>(['Brand identity'])
  const [single, setSingle] = useState<string>('€20k–50k')
  const [chips, setChips] = useState(true)
  const toast = useToast()

  return (
    <div className="grid gap-2 p-2">
      <PageHero title={['Style', 'guide']} eyebrow="Design system" intro="Tokens and components, drawn with the real components. Hover, focus and pressed states are pinned so you can compare them side by side." art={<Holo kind="prism" motion />}>
        <nav aria-label="Style guide sections" className="mt-10 border-t border-line pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {SECTIONS.map(([id, t]) => (
              <li key={id}>
                <a href={`#${id}`} className="round inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hov:border-violet hov:text-violet">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section id="colour" title="Colour" note="One brand colour. Ratios are against white (card) and, for light tokens, against night.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-[var(--radius-card-sm)] border border-line">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3">
                <p className="font-medium">{c.name}</p>
                <p className="text-[13px] text-muted tabular-nums">
                  {c.hex} · {c.token}
                </p>
                <p className="mt-1 text-[12px] text-muted tabular-nums">
                  {contrast(c.hex, '#ffffff').toFixed(1)}:1 on white{luminance(c.hex) > 0.3 ? `, ${contrast(c.hex, '#050505').toFixed(1)}:1 on night` : ''}
                </p>
                <p className="mt-1 text-[13px]">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="holo-fill h-24 rounded-[var(--radius-card-sm)]" />
          <p className="text-sm text-muted">
            <code>holo-fill</code>: the iridescent gradient used for avatars and placeholders, built from violet-light, violet, pink and cyan.
          </p>
        </div>
      </Section>

      <Section id="type" title="Type" note="Inter Tight 400/500/600. Display type is uppercase with tight tracking, as in the reference; body and forms stay in sentence case.">
        <ul className="divide-y divide-line">
          {TYPE.map((t) => (
            <li key={t.label} className="grid gap-2 py-5 md:grid-cols-[12rem_1fr] md:items-baseline">
              <div>
                <p className="font-medium">{t.label}</p>
                <p className="text-[13px] text-muted">{t.spec}</p>
              </div>
              <p className={cx(t.cls, 'min-w-0 break-words')}>{t.sample}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-8">
          {[400, 500, 600].map((w) => (
            <p key={w} className="text-3xl tracking-[-0.03em]" style={{ fontWeight: w }}>
              Aa {w}
            </p>
          ))}
        </div>
      </Section>

      <Section id="space" title="Spacing, radii, shadows" note="Cards sit 8px apart on the canvas. Everything rounded is a squircle; true circles use .round.">
        <Label>Spacing (px)</Label>
        <ul className="flex flex-wrap items-end gap-4">
          {SPACING.map((s) => (
            <li key={s} className="flex flex-col items-center gap-2">
              <span className="block bg-violet" style={{ width: s, height: s }} />
              <span className="text-[13px] text-muted tabular-nums">{s}</span>
            </li>
          ))}
        </ul>
        <Label>
          <span className="mt-10 block">Radii</span>
        </Label>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {RADII.map((r) => (
            <li key={r.name}>
              <div className={cx('h-24 border border-line-strong bg-soft', r.cls)} />
              <p className="mt-2 font-medium">
                {r.name} <span className="text-sm font-normal text-muted">{r.value}</span>
              </p>
              <p className="text-[13px] text-muted">{r.use}</p>
            </li>
          ))}
        </ul>
        <Label>
          <span className="mt-10 block">Shadows</span>
        </Label>
        <ul className="grid gap-4 rounded-[var(--radius-card-sm)] bg-canvas p-6 sm:grid-cols-2 lg:grid-cols-4">
          {SHADOWS.map((s) => (
            <li key={s.name} className="rounded-[var(--radius-card-sm)] bg-card p-5" style={{ boxShadow: `var(${s.token})` }}>
              <p className="font-medium">{s.name}</p>
              <p className="text-[13px] text-muted">{s.use}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="motion" title="Motion">
        <MotionDemo />
      </Section>

      <Section id="art" title="3D objects" note="Transparent renders from IMAGES (holoKnot, holoSphere, ...), with the SVG drawing below each as the fallback when a render is missing. Pass motion to spin (knot) or float.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {HOLOS.map((k) => (
            <li key={k} className="rounded-[var(--radius-card-sm)] bg-soft p-5 text-center">
              <Holo kind={k} className="mx-auto w-full max-w-[150px]" />
              <HoloSvg kind={k} className="mx-auto mt-3 w-full max-w-[64px]" />
              <p className="mt-3 text-sm font-medium">{k}</p>
              <p className="caps text-muted">Render / SVG</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Logo />
          <Logo wordmark />
          <span className="rounded-full bg-night p-3">
            <Logo light wordmark className="text-white" />
          </span>
        </div>
      </Section>

      <Section id="buttons" title="Buttons and links" note="Rows are variants, columns are states. Loading replaces the leading icon with a spinner.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
            <thead>
              <tr>
                <th scope="col" className="caps w-28 font-medium text-muted">
                  Variant
                </th>
                {[...STATES, 'loading'].map((s) => (
                  <th key={s} scope="col" className="caps font-medium text-muted">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BUTTONS.map((v) => (
                <tr key={v} className={v === 'light' ? 'on-dark' : undefined}>
                  <th scope="row" className="text-sm font-medium">
                    {v}
                  </th>
                  {STATES.map((s) => (
                    <td key={s} className={cx('py-1', v === 'light' && 'bg-night first:rounded-l-2xl', v === 'light' && s === 'default' && 'pl-3')}>
                      <Button variant={v} size="sm" data-force={force(s)} disabled={s === 'disabled'}>
                        Start
                      </Button>
                    </td>
                  ))}
                  <td className={cx('py-1', v === 'light' && 'rounded-r-2xl bg-night')}>
                    <Button variant={v} size="sm" loading>
                      Sending
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Label>
          <span className="mt-8 block">Sizes</span>
        </Label>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small 40</Button>
          <Button size="md">Medium 48</Button>
          <Button size="lg" variant="violet" iconRight={<ArrowRight className="size-5" />}>
            Large 56
          </Button>
          <ButtonLink to="/contact" variant="outline" icon={<Mail className="size-4" />}>
            ButtonLink
          </ButtonLink>
        </div>
        <Label>
          <span className="mt-8 block">Icon buttons</span>
        </Label>
        <div className="grid gap-3">
          {ICON_TONES.map((t) => (
            <div key={t} className={cx('flex flex-wrap items-center gap-4 rounded-2xl p-2', t === 'light' && 'on-dark bg-night')}>
              <span className={cx('w-20 text-sm font-medium', t === 'light' && 'text-white')}>{t}</span>
              {STATES.map((s) => (
                <IconButton key={s} tone={t} aria-label={`${t} ${s}`} data-force={force(s)} disabled={s === 'disabled'}>
                  <Plus className="size-5" />
                </IconButton>
              ))}
            </div>
          ))}
        </div>
        <Label>
          <span className="mt-8 block">Arrow links (default, hover, focus)</span>
        </Label>
        <div className="grid gap-3">
          {(['violet', 'ink', 'light'] as const).map((t) => (
            <div key={t} className={cx('flex flex-wrap items-center gap-8 rounded-2xl p-3', t === 'light' && 'bg-night')}>
              {(['default', 'hover', 'focus'] as const).map((s) => (
                <ArrowLink key={s} to="/contact" tone={t} data-force={force(s)}>
                  Reach out
                </ArrowLink>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-8 p-3">
            <ArrowLink to="/work" size="sm" tone="ink">
              Small
            </ArrowLink>
            <ArrowLink to="/work" size="lg">
              Large
            </ArrowLink>
          </div>
        </div>
      </Section>

      <Section id="forms" title="Form fields" note="Errors come from src/shared/validation.ts, the same checks the Worker runs.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Field label="Default">{(p) => <Input {...p} placeholder="you@company.com" />}</Field>
          <Field label="Hover">{(p) => <Input {...p} data-force="hover" defaultValue="Lena Vogt" />}</Field>
          <Field label="Focus">{(p) => <Input {...p} data-force="focus" defaultValue="Lena Vogt" />}</Field>
          <Field label="Disabled">{(p) => <Input {...p} disabled defaultValue="Not editable" />}</Field>
          <Field label="Error" error="Enter a valid email address.">
            {(p) => <Input {...p} defaultValue="lena@" />}
          </Field>
          <Field label="With hint" optional hint="We never share it.">
            {(p) => <Input {...p} />}
          </Field>
          <Field label="Select">
            {(p) => (
              <Select {...p} defaultValue="">
                <option value="" disabled>
                  Choose a budget
                </option>
                {CONTACT.budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Textarea" className="md:col-span-2">
            {(p) => <Textarea {...p} rows={3} placeholder="Tell us about the project" />}
          </Field>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Error" error="Please agree so we can keep your application." />
          </div>
          <div className="grid content-start gap-3">
            <FormMessage tone="error">Please check the highlighted fields.</FormMessage>
            <FormMessage tone="success">Thanks. Your brief is on its way.</FormMessage>
          </div>
        </div>
      </Section>

      <Section id="choices" title="Chips and choices">
        <Label>Chip (default, hover, focus, pressed, disabled, selected)</Label>
        <div className="flex flex-wrap gap-2">
          {STATES.map((s) => (
            <Chip key={s} data-force={force(s)} disabled={s === 'disabled'}>
              Branding
            </Chip>
          ))}
          <Chip selected={chips} onClick={() => setChips((c) => !c)}>
            Selected (toggle)
          </Chip>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ChoiceGroup legend="Checkboxes as pills" type="checkbox" name="sg-multi" options={CONTACT.services} value={multi} onChange={(v) => setMulti(v as string[])} hint="Native inputs: Tab and Space work as usual." />
          <ChoiceGroup legend="Radios as pills" type="radio" name="sg-single" options={CONTACT.budgets} value={single} onChange={(v) => setSingle(v as string)} />
          <ChoiceGroup legend="With an error" type="radio" name="sg-err" options={CONTACT.timelines} value="" onChange={() => {}} error="Choose a timeline." />
          <div>
            <Label>Stepper</Label>
            <div className="grid gap-6">
              <Stepper steps={CONTACT.steps} current={0} />
              <Stepper steps={CONTACT.steps} current={2} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="badges" title="Badges, cards, avatars">
        <div className="flex flex-wrap items-center gap-2">
          {BADGES.map((b) => (
            <span key={b} className={b === 'light' ? 'rounded-full bg-night p-1' : undefined}>
              <Badge tone={b}>{b}</Badge>
            </span>
          ))}
        </div>
        <ul className="mt-8 grid gap-2 rounded-[var(--radius-card-sm)] bg-canvas p-2 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <li key={c}>
              <Card tone={c} className="flex h-40 flex-col justify-between p-5">
                <p className="caps">{c}</p>
                <p className="text-2xl tracking-[-0.03em] uppercase">Card</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Avatar name="Lena Vogt" size="sm" />
          <Avatar name="Daniel Okafor" />
          <Avatar name="Yuki Tanaka" size="lg" />
          <Photo image="aurora" ratio="4/3" className="w-48 rounded-[var(--radius-card-sm)]" />
        </div>
      </Section>

      <Section id="content" title="Content blocks">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Label>Stat and count-up</Label>
            <div className="flex gap-8">
              {[300, 200, 100].map((n, i) => (
                <Stat key={n} value={n} label={[['Success', 'project'], ['Product', 'launches'], ['Startup', 'raised']][i]} />
              ))}
            </div>
            <p className="mt-6 text-5xl tracking-[-0.05em]">
              <CountUp value={38} suffix=" awards" />
            </p>
          </div>
          <div className="grid gap-4">
            <Label>Title sizes</Label>
            <Title lines={['Small', 'title']} size="sm" as="p" />
            <Title lines={['Section', 'title']} as="p" />
            <Title lines={['Large']} size="lg" as="p" align="left" />
          </div>
        </div>
        <div className="mt-10 grid gap-2 lg:grid-cols-2">
          <Card tone="violet" className="p-6 sm:p-8">
            <TestimonialSlider items={TESTIMONIALS} />
          </Card>
          <Card tone="soft" className="p-6 sm:p-8">
            <TestimonialSlider items={TESTIMONIALS} tone="white" />
          </Card>
        </div>
        <div className="mt-10">
          <Label>Accordion (closed, open)</Label>
          <Accordion items={FAQ.slice(0, 3)} defaultOpen={null} forceOpen={1} />
        </div>
        <div className="mt-10">
          <Label>Marquee</Label>
          <Marquee items={CLIENTS} />
        </div>
      </Section>

      <Section id="cards" title="Service, project, role" note="Service cards: default, hover (pinned), active. Project and role tiles: default and hover.">
        <ul className="grid gap-2 rounded-[var(--radius-card-sm)] bg-canvas p-2 lg:grid-cols-3">
          <li>
            <ServiceCard service={SERVICES[0]} />
          </li>
          <li>
            <ServiceCard service={SERVICES[2]} force="hover" />
          </li>
          <li>
            <ServiceCard service={SERVICES[1]} active />
          </li>
        </ul>
        <div className="mt-2 grid gap-2 rounded-[var(--radius-card-sm)] bg-canvas p-2 md:grid-cols-2">
          <ProjectCard project={PROJECTS[0]} />
          <ProjectCard project={PROJECTS[1]} force="hover" />
        </div>
        <div className="mt-2 grid gap-2 rounded-[var(--radius-card-sm)] bg-canvas p-2">
          <RoleRow role={ROLES[0]} />
          <RoleRow role={ROLES[1]} force="hover" applied />
        </div>
      </Section>

      <Section id="overlays" title="Modal, menu, toast" note="Tab is trapped inside, Esc closes, focus returns to the button that opened it. The site menu is the round button in the header above.">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModal(true)}>Open modal</Button>
          <Button variant="outline" onClick={() => toast('This is a toast.')}>
            Show toast
          </Button>
        </div>
        <Modal open={modal} onClose={() => setModal(false)} title="Book a call" description="A modal built from the same fields as the forms.">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setModal(false)
              toast('Call requested.')
            }}
          >
            <Field label="Email">{(p) => <Input {...p} type="email" data-autofocus />}</Field>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="violet">
                Request call
              </Button>
            </div>
          </form>
        </Modal>
      </Section>

      <Section id="states" title="Empty and loading">
        <div className="grid gap-2 rounded-[var(--radius-card-sm)] bg-canvas p-2 md:grid-cols-2">
          <Card>
            <EmptyState title="No projects match" body="Try another word or clear the filters." action={<Button variant="outline">Clear filters</Button>} />
          </Card>
          <Card className="grid content-start gap-3 p-2 pb-6" role="status" aria-busy="true" aria-label="Loading project">
            <span className="skeleton block aspect-[4/3] rounded-[calc(var(--radius-card)-8px)]" />
            <span className="skeleton round mx-3 block h-3 w-24 rounded-full" />
            <span className="skeleton round mx-3 block h-5 w-3/4 rounded-full" />
            <span className="skeleton round mx-3 block h-7 w-36 rounded-full" />
          </Card>
        </div>
      </Section>

      <Section id="flows" title="Forms in full" note="The real forms, posting to the Worker. The brief draft is kept in this browser.">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Label>Project brief</Label>
            <BriefForm />
          </div>
          <div className="grid content-start gap-10">
            <div>
              <Label>Job application</Label>
              <ApplyForm role={ROLES[2]} />
            </div>
            <div>
              <Label>Newsletter (light and night)</Label>
              <div className="grid gap-4">
                <NewsletterForm tone="white" />
                <div className="rounded-[var(--radius-card-sm)] bg-night p-4 text-white">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
