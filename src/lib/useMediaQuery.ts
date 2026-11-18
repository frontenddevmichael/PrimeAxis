import { useEffect, useState } from 'react'

/** Follows a media query as the viewport changes. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** True below the app's `md` breakpoint, where the layout is a single column. */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}
