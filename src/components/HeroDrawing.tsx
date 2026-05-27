import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import drawingMarkup from '../public/drawing.svg?raw'

const SVG_NS = 'http://www.w3.org/2000/svg'
const FILTER_ID = 'hero-distort'

// Wait for the Intro loader (count 1.6s + hold 0.35s + slide-up 1.0s ≈ 2.95s)
// to fully clear before starting the draw animation, so it isn't hidden.
const DRAW_START_DELAY_MS = 3000

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
    let scaleAnim: AnimationPlaybackControls | null = null
    let freqAnim: AnimationPlaybackControls | null = null
    let cleanupHover: (() => void) | null = null

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return

        const svg = container.querySelector<SVGSVGElement>('svg')
        const path = container.querySelector<SVGPathElement>('path')
        if (!svg || !path) return

        // ── 1. compute the path's total length ────────────────────────
        try {
          const length = path.getTotalLength()
          if (length > 0 && Number.isFinite(length)) {
            container.style.setProperty('--draw-length', String(length))
          }
        } catch {
          /* getTotalLength can throw on very complex paths */
        }

        // ── 2. inject turbulence + displacement filter for hover ──────
        let defs = svg.querySelector<SVGDefsElement>('defs')
        if (!defs) {
          defs = document.createElementNS(SVG_NS, 'defs') as SVGDefsElement
          svg.insertBefore(defs, svg.firstChild)
        }

        const filter = document.createElementNS(SVG_NS, 'filter')
        filter.setAttribute('id', FILTER_ID)
        filter.setAttribute('x', '-15%')
        filter.setAttribute('y', '-15%')
        filter.setAttribute('width', '130%')
        filter.setAttribute('height', '130%')
        filter.setAttribute('color-interpolation-filters', 'sRGB')

        const turbulence = document.createElementNS(SVG_NS, 'feTurbulence')
        turbulence.setAttribute('type', 'fractalNoise')
        turbulence.setAttribute('baseFrequency', '0.014 0.02')
        turbulence.setAttribute('numOctaves', '2')
        turbulence.setAttribute('seed', '4')
        turbulence.setAttribute('result', 'noise')

        const displace = document.createElementNS(SVG_NS, 'feDisplacementMap')
        displace.setAttribute('in', 'SourceGraphic')
        displace.setAttribute('in2', 'noise')
        displace.setAttribute('scale', '0')
        displace.setAttribute('xChannelSelector', 'R')
        displace.setAttribute('yChannelSelector', 'G')

        filter.appendChild(turbulence)
        filter.appendChild(displace)
        defs.appendChild(filter)
        path.setAttribute('filter', `url(#${FILTER_ID})`)

        // ── 3. defer the draw trigger until after the Intro loader ────
        drawTimer = window.setTimeout(() => {
          void container.getBoundingClientRect()
          setDrawn(true)
        }, DRAW_START_DELAY_MS)

        // ── 4. hover handlers — distort on enter, settle on leave ─────
        const readScale = () => parseFloat(displace.getAttribute('scale') ?? '0')

        const onEnter = () => {
          scaleAnim?.stop()
          scaleAnim = animate(readScale(), 7, {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => displace.setAttribute('scale', String(v)),
          })
          freqAnim?.stop()
          freqAnim = animate(0.014, 0.024, {
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            onUpdate: (v) =>
              turbulence.setAttribute(
                'baseFrequency',
                `${v.toFixed(4)} ${(v + 0.006).toFixed(4)}`,
              ),
          })
        }

        const onLeave = () => {
          scaleAnim?.stop()
          scaleAnim = animate(readScale(), 0, {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => displace.setAttribute('scale', String(v)),
          })
          freqAnim?.stop()
          freqAnim = null
        }

        path.addEventListener('mouseenter', onEnter)
        path.addEventListener('mouseleave', onLeave)
        cleanupHover = () => {
          path.removeEventListener('mouseenter', onEnter)
          path.removeEventListener('mouseleave', onLeave)
        }
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      if (drawTimer) clearTimeout(drawTimer)
      scaleAnim?.stop()
      freqAnim?.stop()
      cleanupHover?.()
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
