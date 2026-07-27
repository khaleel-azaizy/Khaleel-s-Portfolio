import { useEffect } from 'react'
import Lenis from 'lenis'

export type LenisScrollState = {
  scroll: number
  velocity: number
}

let lenisInstance: Lenis | null = null

/* Child effects run before parent effects, so a component that subscribes
   during mount would see `getLenis() === null` and silently never receive
   anything. Subscribers register against this module-level set instead and
   get wired up as soon as the instance exists. */
const subscribers = new Set<(state: LenisScrollState) => void>()

export function getLenis() {
  return lenisInstance
}

export function onLenisScroll(cb: (state: LenisScrollState) => void) {
  subscribers.add(cb)
  return () => {
    subscribers.delete(cb)
  }
}

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })
    lenisInstance = lenis

    const emit = ({ scroll, velocity }: Lenis) => {
      for (const cb of subscribers) cb({ scroll, velocity })
    }
    lenis.on('scroll', emit)

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.off('scroll', emit)
      lenisInstance = null
      lenis.destroy()
    }
  }, [])
}
