import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { SITE } from '../data'

/*
  One place for the document head. Every page calls `usePageMeta` with its own
  title and description; the hook keeps the title, description, canonical link
  and the Open Graph / Twitter tags in step as the router moves.

  `SITE_URL` must be the production origin, not whatever host the app happens
  to be served from: a canonical pointing at a preview URL would ask search
  engines to index the preview instead of the real site. Set VITE_SITE_URL to
  override it for a staging build.
*/
export const SITE_URL = (import.meta.env.VITE_SITE_URL || SITE.url).replace(/\/+$/, '')
export const OG_IMAGE = `${SITE_URL}/og.png`

export const DEFAULT_DESCRIPTION =
  'Prime Axis helps businesses streamline operations with high-performance websites and scalable automation systems. Built for growth, speed, and long-term reliability.'

type PageMeta = {
  /** Page name without the studio suffix, e.g. `Services`. Omit on the home page. */
  title?: string
  description?: string
  /** Keep a utility page out of the index (the style guide). */
  noindex?: boolean
}

const setMeta = (key: string, content: string) => {
  const attr = key.startsWith('twitter:') || !key.includes(':') ? 'name' : 'property'
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta({ title, description = DEFAULT_DESCRIPTION, noindex = false }: PageMeta = {}) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`
    document.title = fullTitle
    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('og:type', 'website')
    setMeta('og:site_name', SITE.name)
    setMeta('og:title', fullTitle)
    setMeta('og:description', description)
    setMeta('og:url', url)
    setMeta('og:image', OG_IMAGE)
    setMeta('og:image:width', '1200')
    setMeta('og:image:height', '630')
    setMeta('og:image:alt', `${SITE.name} chrome mark on a pale background`)
    setMeta('og:locale', 'en_GB')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', OG_IMAGE)
    setCanonical(url)
  }, [pathname, title, description, noindex])
}
