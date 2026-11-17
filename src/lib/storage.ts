import { useCallback, useEffect, useState } from 'react'

import { SITE } from '../data'

/** Keys for everything the site keeps in the browser. */
export const KEYS = {
  briefDraft: 'lastwerk:brief-draft',
  briefs: 'lastwerk:briefs',
  applications: 'lastwerk:applications',
} as const

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** useState that survives a reload. Writes are best-effort (private mode may refuse). */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable */
    }
  }, [key, value])
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
    setValue(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return [value, setValue, clear] as const
}

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`
  }, [title])
}

export type SentBrief = { reference: string; sentAt: string; services: string[]; budget: string; name: string }
export type SentApplication = { reference: string; sentAt: string; role: string }
