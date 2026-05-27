import { useEffect, useRef, useState } from 'react'
import drawingMarkup from '../public/drawing.svg?raw'

// Wait for the Intro loader (count 1.6s + hold 0.35s + slide-up 1.0s ≈ 2.95s)
// to fully clear before starting the draw animation, so it isn't hidden.
const DRAW_START_DELAY_MS = 2500

type Props = {
  className?: string
}

export function HeroDrawing({ className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    let raf1 = 0
    let raf2 = 0
    let drawTimer = 0
    let cancelled = false

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return

        const path = container.querySelector<SVGPathElement>('path')
        if (!path) return

        try {
          const length = path.getTotalLength()
          if (length > 0 && Number.isFinite(length)) {
            container.style.setProperty('--draw-length', String(length))
          }
        } catch {
          /* getTotalLength can throw on very complex paths */
        }

        // Insert a duplicate of the path beneath the original. The clone gets
        // the fill (via .is-fill-clone CSS) and "paints itself in" via a
        // clip-path wipe; the original on top keeps drawing as outline strokes.
        if (!path.parentNode?.querySelector('path.is-fill-clone')) {
          const fillClone = path.cloneNode(false) as SVGPathElement
          fillClone.removeAttribute('id')
          fillClone.removeAttribute('filter')
          fillClone.removeAttribute('style')
          fillClone.classList.add('is-fill-clone')
          path.parentNode?.insertBefore(fillClone, path)
        }

        drawTimer = window.setTimeout(() => {
          void container.getBoundingClientRect()
          setDrawn(true)
        }, DRAW_START_DELAY_MS)
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      if (drawTimer) clearTimeout(drawTimer)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`hero-drawing ${drawn ? 'is-drawn' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: drawingMarkup }}
    />
  )
}
