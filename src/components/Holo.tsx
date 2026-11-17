import { useId, useState, type SVGProps } from 'react'

import { IMAGES, type HoloKind } from '../data'
import { cx } from '../lib/cx'

/*
  The studio's iridescent "chrome" objects. Each one is a transparent render
  from IMAGES (`holoKnot`, `holoSphere`, ...); when that `src` is empty or
  fails to load, the SVG drawing below stands in. Decorative: hidden from
  screen readers. `motion` adds the slow spin (knot) or float (everything
  else); both stop under prefers-reduced-motion. `priority` loads the render
  eagerly (use it above the fold).
*/
const RENDER = {
  knot: IMAGES.holoKnot,
  sphere: IMAGES.holoSphere,
  cloud: IMAGES.holoCloud,
  scissors: IMAGES.holoScissors,
  star: IMAGES.holoStar,
  prism: IMAGES.holoPrism,
  axis: IMAGES.holoAxis,
} satisfies Record<HoloKind, { src: string }>
const IRI = [
  [0, '#1f0679'],
  [0.16, '#5b14f5'],
  [0.32, '#a68bff'],
  [0.43, '#ffc4ef'],
  [0.5, '#ffffff'],
  [0.58, '#93ebff'],
  [0.72, '#6a2cff'],
  [0.88, '#3a0bb8'],
  [1, '#16044d'],
] as const

function Stops({ stops }: { stops: readonly (readonly [number, string])[] }) {
  return (
    <>
      {stops.map(([o, c]) => (
        <stop key={o} offset={o} stopColor={c} />
      ))}
    </>
  )
}

type Props = { kind: HoloKind; motion?: boolean; priority?: boolean; className?: string } & Omit<SVGProps<SVGSVGElement>, 'children'>

const SHADOW = 'drop-shadow-[0_26px_28px_rgb(60_10_180/0.2)]'
const motionClass = (kind: HoloKind, motion: boolean) =>
  cx(motion && kind === 'knot' && 'animate-[spin-slow_80s_linear_infinite]', motion && kind !== 'knot' && 'animate-float')

export function Holo({ kind, motion = false, priority = false, className, ...rest }: Props) {
  const src: string = RENDER[kind].src
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      <span aria-hidden className={cx('block', className)}>
        <img
          src={src}
          alt=""
          width={880}
          height={880}
          draggable={false}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className={cx('block h-auto w-full select-none', SHADOW, motionClass(kind, motion))}
        />
      </span>
    )
  }
  return <HoloSvg kind={kind} motion={motion} className={className} {...rest} />
}

/** The SVG drawing of each object: the fallback when a render is missing. */
export function HoloSvg({ kind, motion = false, className, ...rest }: Omit<Props, 'priority'>) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = (s: string) => `${raw}-${s}`
  const url = (s: string) => `url(#${id(s)})`
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden
      focusable="false"
      className={cx('block overflow-visible', SHADOW, className)}
      {...rest}
    >
      <defs>
        <linearGradient id={id('iri')} x1="0" y1="0" x2="1" y2="1">
          <Stops stops={IRI} />
        </linearGradient>
        <linearGradient id={id('iri2')} x1="1" y1="0" x2="0" y2="1">
          <Stops stops={IRI} />
        </linearGradient>
        <linearGradient id={id('iri3')} x1="0" y1="1" x2="1" y2="0">
          <Stops stops={IRI} />
        </linearGradient>
        <linearGradient id={id('shade')} x1="1" y1="0" x2="0" y2="0.6">
          <stop offset="0" stopColor="#0a0230" stopOpacity="0" />
          <stop offset="0.3" stopColor="#0a0230" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#0a0230" stopOpacity="0" />
          <stop offset="0.78" stopColor="#0a0230" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0a0230" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('edge')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a0db8" />
          <stop offset="1" stopColor="#0e0333" />
        </linearGradient>
        <radialGradient id={id('orb')} cx="0.5" cy="0.5" r="0.55" fx="0.34" fy="0.28">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.14" stopColor="#f5edff" />
          <stop offset="0.38" stopColor="#b9a2ff" />
          <stop offset="0.66" stopColor="#5b14f5" />
          <stop offset="0.9" stopColor="#2a0790" />
          <stop offset="1" stopColor="#12033f" />
        </radialGradient>
        <radialGradient id={id('glass')} cx="0.45" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#c8b5ff" stopOpacity="0.9" />
          <stop offset="0.75" stopColor="#6a2cff" stopOpacity="0.92" />
          <stop offset="1" stopColor="#2a0790" />
        </radialGradient>
        <filter id={id('soft')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={id('blur')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <clipPath id={id('orbclip')}>
          <circle cx="300" cy="300" r="228" />
        </clipPath>
      </defs>
      <g
        className={cx('origin-center [transform-box:fill-box]', motionClass(kind, motion))}
      >
        {kind === 'knot' && <Knot url={url} />}
        {kind === 'sphere' && <Sphere url={url} />}
        {kind === 'cloud' && <Cloud url={url} />}
        {kind === 'scissors' && <Scissors url={url} />}
        {kind === 'star' && <Star url={url} />}
        {kind === 'prism' && <Prism url={url} />}
        {kind === 'axis' && <Axis url={url} />}
      </g>
    </svg>
  )
}

type Draw = { url: (s: string) => string }

/** One chrome tube along an ellipse: dark edge, iridescent body, specular line. */
function Tube({ rx, ry, rotate, grad, url, width = 30 }: Draw & { rx: number; ry: number; rotate: number; grad: string; width?: number }) {
  return (
    <g transform={`rotate(${rotate} 300 300)`}>
      <ellipse cx="300" cy="300" rx={rx} ry={ry} fill="none" stroke="#16044d" strokeOpacity="0.9" strokeWidth={width + 4} />
      <ellipse cx="300" cy="300" rx={rx} ry={ry} fill="none" stroke={url(grad)} strokeWidth={width} />
      <ellipse cx="300" cy="300" rx={rx + width * 0.2} ry={ry + width * 0.2} fill="none" stroke={url('shade')} strokeWidth={width * 0.55} />
      <ellipse cx="300" cy="300" rx={rx - width * 0.2} ry={ry - width * 0.16} fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth={width * 0.12} filter={url('soft')} />
      <ellipse cx="300" cy="300" rx={rx + width * 0.28} ry={ry + width * 0.26} fill="none" stroke="#ffd3f3" strokeOpacity="0.35" strokeWidth={width * 0.08} filter={url('soft')} />
    </g>
  )
}

function Knot({ url }: Draw) {
  return (
    <>
      <Tube url={url} rx={252} ry={70} rotate={-36} grad="iri2" width={38} />
      <Tube url={url} rx={240} ry={60} rotate={4} grad="iri3" width={32} />
      <Tube url={url} rx={256} ry={76} rotate={34} grad="iri" width={38} />
      <Tube url={url} rx={236} ry={90} rotate={92} grad="iri" width={42} />
    </>
  )
}

function Sphere({ url }: Draw) {
  return (
    <>
      <g transform="rotate(-24 300 300)">
        <path d="M 10 300 A 290 70 0 0 1 590 300" fill="none" stroke={url('edge')} strokeWidth="24" />
        <path d="M 10 300 A 290 70 0 0 1 590 300" fill="none" stroke={url('iri2')} strokeWidth="18" />
      </g>
      <circle cx="300" cy="300" r="228" fill={url('orb')} />
      <g clipPath={url('orbclip')}>
        <path d="M110 360 C 170 230, 330 190, 440 270 S 420 440, 300 450" fill="none" stroke={url('iri')} strokeWidth="46" opacity="0.85" filter={url('blur')} />
        <path d="M160 200 C 260 120, 470 170, 480 330" fill="none" stroke={url('iri3')} strokeWidth="30" opacity="0.8" filter={url('blur')} />
        <path d="M90 300 C 160 420, 360 470, 500 380" fill="none" stroke="#16044d" strokeWidth="38" opacity="0.45" filter={url('blur')} />
        <ellipse cx="225" cy="185" rx="70" ry="38" fill="#fff" opacity="0.65" filter={url('blur')} />
      </g>
      <circle cx="300" cy="300" r="227" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
      <g transform="rotate(-24 300 300)">
        <path d="M 590 300 A 290 70 0 0 1 10 300" fill="none" stroke={url('edge')} strokeWidth="24" />
        <path d="M 590 300 A 290 70 0 0 1 10 300" fill="none" stroke={url('iri')} strokeWidth="18" />
        <path d="M 580 304 A 284 64 0 0 1 20 304" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" filter={url('soft')} />
      </g>
    </>
  )
}

function Cloud({ url }: Draw) {
  const d = 'M150 440 C 70 440 62 330 150 318 C 146 226 262 196 304 262 C 340 172 486 188 476 300 C 556 302 562 440 470 440 Z'
  return (
    <>
      <path d={d} fill={url('glass')} stroke={url('edge')} strokeWidth="6" />
      <path d={d} fill="none" stroke={url('iri')} strokeWidth="14" opacity="0.9" />
      <path d="M150 330 C 160 270 230 236 290 270" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.85" filter={url('soft')} />
      <path d="M320 262 C 360 208 450 214 462 290" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7" filter={url('soft')} />
      <ellipse cx="300" cy="380" rx="150" ry="34" fill="#ffc4ef" opacity="0.45" filter={url('blur')} />
    </>
  )
}

function Scissors({ url }: Draw) {
  return (
    <g transform="rotate(-38 300 300)">
      <path d="M292 316 L 276 40 C 286 30 300 34 304 46 L 312 318 Z" fill={url('iri3')} stroke={url('edge')} strokeWidth="3" />
      <path d="M296 318 L 352 52 C 364 46 376 54 372 68 L 318 324 Z" fill={url('iri')} stroke={url('edge')} strokeWidth="3" />
      <path d="M288 300 L 282 70" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" filter={url('soft')} />
      <path d="M300 318 C 280 360 250 380 238 400" fill="none" stroke={url('edge')} strokeWidth="26" strokeLinecap="round" />
      <path d="M300 318 C 320 360 350 380 362 400" fill="none" stroke={url('edge')} strokeWidth="26" strokeLinecap="round" />
      <ellipse cx="226" cy="458" rx="52" ry="66" fill="none" stroke={url('edge')} strokeWidth="34" />
      <ellipse cx="226" cy="458" rx="52" ry="66" fill="none" stroke={url('iri2')} strokeWidth="26" />
      <ellipse cx="226" cy="458" rx="46" ry="60" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="4" filter={url('soft')} />
      <ellipse cx="374" cy="458" rx="52" ry="66" fill="none" stroke={url('edge')} strokeWidth="34" />
      <ellipse cx="374" cy="458" rx="52" ry="66" fill="none" stroke={url('iri')} strokeWidth="26" />
      <ellipse cx="374" cy="458" rx="46" ry="60" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="4" filter={url('soft')} />
      <circle cx="302" cy="318" r="13" fill={url('orb')} stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
    </g>
  )
}

function Star({ url }: Draw) {
  const d = 'M300 50 C 322 236 364 278 550 300 C 364 322 322 364 300 550 C 278 364 236 322 50 300 C 236 278 278 236 300 50 Z'
  return (
    <>
      <path d={d} fill={url('iri')} stroke={url('edge')} strokeWidth="5" />
      <path d="M300 80 C 316 230 340 270 420 290" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.8" filter={url('soft')} />
      <circle cx="300" cy="300" r="60" fill="#fff" opacity="0.55" filter={url('blur')} />
    </>
  )
}

function Prism({ url }: Draw) {
  return (
    <>
      <path d="M300 60 L 520 470 L 300 540 Z" fill={url('iri')} stroke={url('edge')} strokeWidth="5" strokeLinejoin="round" />
      <path d="M300 60 L 80 470 L 300 540 Z" fill={url('iri2')} stroke={url('edge')} strokeWidth="5" strokeLinejoin="round" />
      <path d="M300 70 L 300 530" stroke="#fff" strokeWidth="5" opacity="0.85" filter={url('soft')} />
      <path d="M110 462 L 296 70" stroke="#fff" strokeWidth="3" opacity="0.5" filter={url('soft')} />
    </>
  )
}

/**
 * The Prime Axis mark. `public/images/holo/axis.webp` is the real render; this
 * is the drawn stand-in used when that render is missing.
 */
function Axis({ url }: Draw) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d="M300 150 L184 450" stroke={url('edge')} strokeWidth="64" />
      <path d="M300 150 L184 450" stroke={url('iri2')} strokeWidth="50" />
      <path d="M300 150 L416 450" stroke={url('edge')} strokeWidth="64" />
      <path d="M300 150 L416 450" stroke={url('iri')} strokeWidth="50" />
      <path d="M300 444 L300 336" stroke={url('edge')} strokeWidth="36" />
      <path d="M300 432 L300 348" stroke={url('iri3')} strokeWidth="24" />
      <path d="M214 428 L292 440" stroke="#fff" strokeOpacity="0.7" strokeWidth="5" filter={url('soft')} />
      <path d="M388 208 L418 330" stroke="#fff" strokeOpacity="0.5" strokeWidth="6" filter={url('soft')} />
    </g>
  )
}