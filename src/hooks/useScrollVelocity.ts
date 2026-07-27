import { useEffect } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { onLenisScroll } from './useSmoothScroll'

/* Lenis reports velocity in px/frame. Around 30 is a hard flick, so that's
   the normalisation ceiling. */
const VELOCITY_CEILING = 30

/**
 * Signed, spring-smoothed scroll velocity in the range [-1, 1].
 *
 * Returns a MotionValue, so consumers can bind it straight to `style` and
 * animate every frame without triggering a React render. Pinned at 0 when
 * the visitor prefers reduced motion.
 */
export function useScrollVelocity() {
  const raw = useMotionValue(0)
  const reduced = useReducedMotion()

  const velocity = useSpring(raw, {
    stiffness: 220,
    damping: 34,
    mass: 0.4,
  })

  useEffect(() => {
    if (reduced) {
      raw.set(0)
      return
    }

    let idle = 0
    const unsubscribe = onLenisScroll(({ velocity: v }) => {
      raw.set(Math.max(-1, Math.min(1, v / VELOCITY_CEILING)))

      // Lenis stops emitting once scrolling settles, which would otherwise
      // leave the spring parked at the last non-zero value.
      window.clearTimeout(idle)
      idle = window.setTimeout(() => raw.set(0), 90)
    })

    return () => {
      window.clearTimeout(idle)
      unsubscribe()
    }
  }, [raw, reduced])

  return velocity
}
