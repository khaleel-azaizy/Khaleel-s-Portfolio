import { useEffect, type RefObject } from 'react'
import { useMotionValue, useReducedMotion } from 'framer-motion'
import { onLenisScroll } from './useSmoothScroll'

/** Document-space top of an element, walking the offsetParent chain.
 *  `offsetTop` reflects static layout position, so this stays correct even
 *  while the element is sticky-pinned — which is exactly why we can't use
 *  getBoundingClientRect() here. */
function documentTop(el: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

/**
 * How far a pinned stage has been covered by the content rising over it,
 * from 0 (just reached the top) to 1 (fully covered).
 *
 * framer-motion's `useScroll` can't do this: it derives progress from
 * getBoundingClientRect(), and a sticky element pinned at top:0 reports a
 * constant rect for the whole time it's pinned, so progress would freeze at 0.
 *
 * Returns a MotionValue so the transform runs off the main React render path.
 */
export function useStageProgress(ref: RefObject<HTMLElement>, enabled = true) {
  const progress = useMotionValue(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || reduced) {
      progress.set(0)
      return
    }

    let top = 0
    let height = 1

    const measure = () => {
      top = documentTop(el)
      height = Math.max(1, el.offsetHeight)
      update(window.scrollY)
    }

    const update = (scroll: number) => {
      progress.set(Math.max(0, Math.min(1, (scroll - top) / height)))
    }

    measure()
    const unsubscribe = onLenisScroll(({ scroll }) => update(scroll))

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(document.body)

    return () => {
      unsubscribe()
      ro.disconnect()
    }
  }, [ref, enabled, reduced, progress])

  return progress
}
