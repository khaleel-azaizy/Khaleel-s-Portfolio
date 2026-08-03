import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
}

/**
 * The hero illustration.
 *
 * Fetched at runtime rather than inlined with `?raw` — at ~77KB it belongs in a
 * cacheable static asset, not the entry chunk. Injected imperatively so React
 * never owns the markup and no re-render can interrupt the reveal.
 *
 * The artwork declares no fills of its own, so it takes its colour from CSS
 * (see .hero-figure in index.css) and follows the section's tokens.
 */
export function HeroFigure({ className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [markup, setMarkup] = useState<string | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${import.meta.env.BASE_URL}hero-figure.svg`, { signal: controller.signal })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then(setMarkup)
      .catch(() => {
        /* decorative — a missing illustration should never break the hero */
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const container = ref.current
    if (!container || !markup) return

    container.innerHTML = markup

    /* Commit the starting clip with a forced reflow, then flip the class in the
       same tick. Deliberately not requestAnimationFrame: the reveal controls
       whether the artwork is visible at all, and rAF does not run in a
       backgrounded tab — which would leave the figure clipped to nothing. A
       layout read always resolves. */
    void container.getBoundingClientRect()
    container.classList.add('is-revealed')
  }, [markup, reduced])

  return <div ref={ref} aria-hidden className={`hero-figure ${className}`} />
}
