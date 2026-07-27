import { useEffect, useState } from 'react'

/* Replaces the previous `window.screen.width < 768` check, which read the
   physical screen rather than the viewport and was never re-evaluated on
   resize. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useHasFinePointer = () => useMediaQuery('(pointer: fine)')
