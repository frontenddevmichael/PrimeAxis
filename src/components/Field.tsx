import { Check, ChevronDown } from 'lucide-react'
import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

import { cx } from '../lib/cx'

const control =
  'w-full rounded-[var(--radius-control)] border border-line-strong bg-card px-4 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-[var(--duration-fast)] hov:border-ink/50 focus:border-violet focus:shadow-[var(--shadow-focus)] focus:outline-none focus-visible:outline-none data-[force~=focus]:border-violet data-[force~=focus]:shadow-[var(--shadow-focus)] data-[force~=focus]:outline-none disabled:cursor-not-allowed disabled:bg-soft disabled:text-muted aria-[invalid=true]:border-danger aria-[invalid=true]:focus:shadow-[0_0_0_3px_rgb(192_38_45/0.2)]'

type FieldProps = {
  label: string
  hint?: string
  error?: string
  optional?: boolean
  className?: string
  children: (props: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) => ReactNode
}

/** Label + control + hint/error, wired for screen readers. */
export function Field({ label, hint, error, optional, className, children }: FieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-[13px] font-normal text-muted">Optional</span>}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

type Force = { 'data-force'?: string }

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement> & Force) {
  return <input className={cx(control, 'h-12', className)} {...rest} />
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & Force) {
  return <textarea className={cx(control, 'min-h-36 resize-y py-3 leading-relaxed', className)} {...rest} />
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & Force) {
  return (
    <div className="relative">
      <select className={cx(control, 'h-12 appearance-none pr-11', className)} {...rest}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
    </div>
  )
}

/** A checkbox with its label; the box is drawn, the input stays native. */
export function Checkbox({
  label,
  error,
  className,
  ...rest
}: { label: ReactNode; error?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & Force) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="group flex min-h-10 cursor-pointer items-start gap-3 text-[15px] text-ink">
        <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer absolute -inset-2.5 size-10 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
            {...rest}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[6px] border border-line-strong bg-card transition-colors group-hover:border-ink peer-checked:border-violet peer-checked:bg-violet peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet peer-disabled:opacity-50 peer-aria-[invalid=true]:border-danger"
          />
          <Check className="pointer-events-none relative size-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} aria-hidden />
        </span>
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 pl-8 text-[13px] text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

/** Form-level status line: error summary or success. */
export function FormMessage({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cx(
        'rounded-[var(--radius-control)] px-4 py-3 text-sm',
        tone === 'error' ? 'bg-danger/8 text-danger' : 'bg-success/8 text-success',
      )}
    >
      {children}
    </p>
  )
}

/**
 * A fieldset of native radios or checkboxes drawn as pills. Keyboard and
 * screen-reader behaviour is the browser's own.
 */
export function ChoiceGroup({
  legend,
  type,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  force,
}: {
  legend: string
  type: 'radio' | 'checkbox'
  name: string
  options: readonly string[]
  value: string | string[]
  onChange: (next: string | string[]) => void
  error?: string
  hint?: string
  force?: Record<string, string>
}) {
  const id = useId()
  const selected = (o: string) => (Array.isArray(value) ? value.includes(o) : value === o)
  const toggle = (o: string) => {
    if (type === 'radio') return onChange(o)
    const list = Array.isArray(value) ? value : []
    onChange(list.includes(o) ? list.filter((x) => x !== o) : [...list, o])
  }
  return (
    <fieldset aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} aria-invalid={error ? true : undefined}>
      <legend className="mb-3 text-sm font-medium text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            data-force={force?.[o]}
            className={cx(
              'round relative inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-[background-color,color,border-color] duration-[var(--duration-fast)] select-none prs:scale-[0.98]',
              'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-violet has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45',
              selected(o) ? 'border-violet bg-violet text-white hov:bg-violet-deep' : 'border-line-strong bg-card text-ink hov:border-ink',
              error && !selected(o) && 'border-danger/60',
            )}
          >
            <input type={type} name={name} value={o} checked={selected(o)} onChange={() => toggle(o)} className="sr-only" />
            {type === 'checkbox' && selected(o) && <Check className="size-4" strokeWidth={2.5} aria-hidden />}
            {o}
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </fieldset>
  )
}
