import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'

import { cx } from '../lib/cx'

export type ButtonVariant = 'solid' | 'violet' | 'outline' | 'ghost' | 'light'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'round relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] prs:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45'

const variants: Record<ButtonVariant, string> = {
  solid: 'bg-ink text-white hov:bg-ink-2 prs:bg-black',
  violet: 'bg-violet text-white hov:bg-violet-deep hov:shadow-[var(--shadow-violet)] prs:bg-violet-deep',
  outline: 'border border-ink/85 text-ink hov:bg-ink hov:text-white prs:bg-black prs:text-white',
  ghost: 'text-ink hov:bg-soft prs:bg-line',
  light: 'on-dark bg-white text-ink hov:bg-violet hov:text-white prs:bg-violet-deep prs:text-white',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

export function buttonClass(variant: ButtonVariant = 'solid', size: ButtonSize = 'md', className?: string) {
  return cx(base, variants[variant], sizes[size], className)
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; icon?: ReactNode; iconRight?: ReactNode }

export function Button({
  variant = 'solid',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; 'data-force'?: string }) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : icon}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  )
}

export function ButtonLink({ variant = 'solid', size = 'md', icon, iconRight, className, children, ...rest }: Common & LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
      {iconRight}
    </Link>
  )
}

export type IconTone = 'ink' | 'outline' | 'violet' | 'light'

/** Round icon-only button (the black menu button in the header). Always pass an aria-label. */
export function IconButton({
  className,
  tone = 'ink',
  size = 'md',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: IconTone; size?: 'sm' | 'md'; 'aria-label': string; 'data-force'?: string }) {
  return (
    <button
      type="button"
      className={cx(
        'round inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform,border-color] duration-[var(--duration-fast)] prs:scale-95 disabled:pointer-events-none disabled:opacity-40',
        size === 'md' ? 'size-11' : 'size-10',
        tone === 'ink' && 'bg-ink text-white hov:bg-violet',
        tone === 'outline' && 'border border-line-strong bg-card text-ink hov:border-ink hov:bg-ink hov:text-white',
        tone === 'violet' && 'bg-violet text-white hov:bg-violet-deep',
        tone === 'light' && 'on-dark bg-white text-ink hov:bg-violet hov:text-white',
        className,
      )}
      {...rest}
    />
  )
}
