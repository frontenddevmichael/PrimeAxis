import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, type PointerEvent, type ReactNode } from 'react'

import { cx } from '../lib/cx'

/*
  The house motion system. One easing curve, one spring, one rule: scripted
  moves use transform and opacity only, run at most once, and switch off when
  the visitor asks for reduced motion. The library is Motion (Framer Motion),
  already the site's animation engine, so there is no second runtime.
*/

/** The shared easing for entrances and reveals. */
export const EASE = [0.22, 1, 0.36, 1] as const
/** Symmetric easing for loops and scroll-linked movement. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

/**
 * A hairline reading-progress bar pinned to the top of the viewport.
 * Decorative; the real position is already in the scrollbar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.25 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-violet shadow-[0_0_14px_rgb(91_20_245/0.55)]"
    />
  )
}

/**
 * Pulls its child a few pixels towards the pointer. Mouse only: on touch and
 * with reduced motion it is a plain wrapper, so nothing moves under a finger.
 */
export function Magnetic({
  children,
  strength = 8,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 240, damping: 20, mass: 0.4 })

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2)
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={cx('inline-flex', className)}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scroll-linked vertical drift: content travels from `distance` to
 * `-distance` pixels as the block crosses the viewport. Use it on decorative
 * objects and single images, never on text the reader is tracking.
 */
export function Drift({
  children,
  distance = 56,
  className,
}: {
  children: ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] as const })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  )
}
