import { useEffect, useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useScrollVelocity } from '../hooks/useScrollVelocity'

const PULSE_IDLE = 2.6
const PULSE_FAST = 1.1

const delayOf = (d: string) => ({ '--flow-delay': d }) as CSSProperties

const reveal = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
      }

/**
 * The product architecture, drawn.
 *
 * Replaces the traced self-portrait that used to sit here. The hero sentence
 * claims full-stack ownership, so the visual beside it states the same thing
 * rather than decorating around it — at the resolution the claim deserves: four
 * tiers, branching, with traffic running left to right.
 *
 * Built from DOM text rather than SVG on purpose: inside an <svg>, font-size is
 * in viewBox units, so labels shrink with the container and the utility type
 * landed around 6px in the hero column. Real text holds its size, stays
 * selectable, and is read in order by a screen reader.
 *
 * All connector geometry lives in CSS custom properties (see .dg-wide in
 * index.css) rather than px literals here. Row centres are derived from node
 * height and row gap, so a media query can rescale the whole schematic for
 * short viewports and every stub still lands where it should.
 *
 * The branching layout needs roughly 200px per column to keep labels intact, so
 * it runs from lg up; below that the same four tiers collapse to compact rows.
 */
export function StackDiagram({ className = '' }: { className?: string }) {
  // useReducedMotion resolves as boolean | null; collapse it once here so every
  // child can take a plain boolean.
  const reduced = !!useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const velocity = useScrollVelocity()

  // Flow rate tracks scroll speed. Written to the container as a custom
  // property off a MotionValue subscription — cascades to every connector and
  // never triggers a React render.
  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const apply = (v: number) => {
      const speed = Math.min(1, Math.abs(v))
      root.style.setProperty(
        '--flow-dur',
        `${(PULSE_IDLE - (PULSE_IDLE - PULSE_FAST) * speed).toFixed(2)}s`
      )
    }

    apply(velocity.get())
    return velocity.on('change', apply)
  }, [velocity, reduced])

  return (
    <div ref={rootRef} className={className}>
      <div className="dg-wide hidden lg:flex items-start">
        <Column tag="Client" delay={0} reduced={reduced}>
          <Node label="Storefront" sub="React · Vite · PWA" />
          <Node label="Admin" sub="Dashboard · RBAC" />
        </Column>

        {/* two clients converge on the edge */}
        <div className="dg-conn" aria-hidden>
          <span className="dg-line dg-line--a" />
          <span className="dg-line dg-line--b" />
          <span className="dg-line dg-line--spine" />
          <span className="dg-line dg-line--mid2" />
          <span className="dg-node-dot" />
          {!reduced && <span className="dg-pulse dg-pulse--mid" style={delayOf('0s')} />}
        </div>

        <Column tag="Edge" delay={0.07} reduced={reduced} single>
          <Node label="Hosting" sub="CDN · i18n · Cache" />
        </Column>

        {/* edge fans out to the service tier */}
        <div className="dg-conn" aria-hidden>
          <span className="dg-line dg-line--mid" />
          <span className="dg-line dg-line--spine" />
          <span className="dg-line dg-line--a2" />
          <span className="dg-line dg-line--b2" />
          <span className="dg-node-dot" />
          {!reduced && (
            <>
              <span className="dg-pulse dg-pulse--a" style={delayOf('0.45s')} />
              <span className="dg-pulse dg-pulse--b" style={delayOf('0.75s')} />
            </>
          )}
        </div>

        <Column tag="Services" delay={0.14} reduced={reduced}>
          <Node label="Auth" sub="Sessions · Rules" />
          <Node label="API" sub="Node · Express · REST" />
        </Column>

        {/* services to their stores, one to one */}
        <div className="dg-conn" aria-hidden>
          <span className="dg-line dg-line--full-a" />
          <span className="dg-line dg-line--full-b" />
          {!reduced && (
            <>
              <span className="dg-pulse dg-pulse--full-a" style={delayOf('1.1s')} />
              <span className="dg-pulse dg-pulse--full-b" style={delayOf('1.45s')} />
            </>
          )}
        </div>

        <Column tag="Data" delay={0.21} reduced={reduced}>
          <Node label="Firestore" sub="Realtime · Inventory" />
          <Node label="SQL · Storage" sub="Orders · Media" />
        </Column>
      </div>

      <StackedDiagram reduced={reduced} />
    </div>
  )
}

function Column({
  tag,
  children,
  delay,
  reduced,
  single = false,
}: {
  tag: string
  children: React.ReactNode
  delay: number
  reduced: boolean
  single?: boolean
}) {
  return (
    <motion.div className="dg-col" {...reveal(delay, reduced)}>
      <div className="dg-tag">{tag}</div>
      <div className={`dg-body ${single ? 'dg-body--single' : ''}`}>{children}</div>
    </motion.div>
  )
}

function Node({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="dg-node">
      <div className="dg-label">{label}</div>
      <div className="dg-sub">{sub}</div>
    </div>
  )
}

/* ── narrow: the same four tiers as compact rows ─────────────────────────── */

const TIERS = [
  { tag: 'Client', label: 'Storefront + Admin' },
  { tag: 'Edge', label: 'Hosting · CDN · i18n' },
  { tag: 'Service', label: 'Auth · API' },
  { tag: 'Data', label: 'Firestore · SQL' },
] as const

function StackedDiagram({ reduced }: { reduced: boolean }) {
  return (
    <div className="lg:hidden flex flex-col">
      {TIERS.map((tier, i) => (
        <div key={tier.tag} className="contents">
          {i > 0 && <span className="conn" style={delayOf(`${i * 0.4}s`)} aria-hidden />}
          <motion.div className="node-group" {...reveal(i * 0.07, reduced)}>
            <div className="node-tag">{tier.tag}</div>
            <div className="node">
              <div className="node-label">{tier.label}</div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
