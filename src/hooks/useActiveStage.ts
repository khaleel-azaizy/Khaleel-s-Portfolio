import { useEffect, useRef, useState } from 'react'
import { onLenisScroll } from './useSmoothScroll'

export type StageMetrics = {
  id: string
  top: number
  height: number
  invert: boolean
}

/** Document-space top of an element. Uses the offsetParent chain because
 *  getBoundingClientRect() lies about sticky-pinned stages. */
export function documentTop(el: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

export function readStages(): StageMetrics[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.stack-section, .stack-flow'))
    .map((stage) => {
      const section = stage.querySelector<HTMLElement>('section[id]')
      return section
        ? {
            id: section.id,
            top: documentTop(stage),
            height: stage.offsetHeight,
            invert: stage.classList.contains('stage-invert'),
          }
        : null
    })
    .filter((s): s is StageMetrics => s !== null)
}

/**
 * Which stage currently owns the viewport.
 *
 * Geometry is cached and only re-measured on layout change; the previous
 * implementation re-queried the DOM and read offsetHeight on every scroll
 * event, which under Lenis means a full layout pass every frame.
 *
 * This deliberately does not report what the floating chrome is sitting over.
 * That was tried — by stage geometry, then by hit testing — and both were
 * fragile against sticky pinning and against elements tall enough to straddle
 * two sections at once. The chrome carries its own background instead.
 */
export function useActiveStage() {
  const [active, setActive] = useState<string>('home')
  const stagesRef = useRef<StageMetrics[]>([])

  useEffect(() => {
    /** Last stage whose top has passed the given viewport offset. */
    const stageAt = (offset: number, stages: StageMetrics[]) => {
      let found = stages[0]
      for (const stage of stages) {
        if (stage.top <= offset) found = stage
      }
      return found
    }

    const resolve = (scroll: number) => {
      const stages = stagesRef.current
      if (!stages.length) return
      setActive(stageAt(scroll + window.innerHeight * 0.4, stages).id)
    }

    const measure = () => {
      stagesRef.current = readStages()
      resolve(window.scrollY)
    }

    measure()
    const unsubscribe = onLenisScroll(({ scroll }) => resolve(scroll))

    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)

    return () => {
      unsubscribe()
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return { active, stagesRef }
}
