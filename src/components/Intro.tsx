import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'

/** Floor and ceiling on how long the panel holds. The floor stops it flashing
 *  on a warm cache; the ceiling stops a stalled font request holding the page. */
const MIN_MS = 900
const MAX_MS = 3000

/** Where the bar sits once every gate has reported, before the closing run. */
const HEAD_START = 0.1
const GATE_SPAN = 0.82

const STEPS = ['Interface', 'Typeface', 'Layout'] as const
const EASE = [0.16, 1, 0.3, 1] as const

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()))

/**
 * Boot panel.
 *
 * Progress lives in a MotionValue rather than React state: the counter and the
 * rule update every frame off the animation driver, so the whole tree isn't
 * re-rendering sixty times a second.
 *
 * The gates are real — first paint, webfonts, and the reflow that follows them
 * — so the number reflects actual readiness. The closing run to 100 is an
 * explicit animation that must finish, and the panel then holds briefly, so the
 * count is always seen landing on 100 rather than being cut off partway.
 */
export function Intro() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(true)
  const [ready, setReady] = useState(0)

  const progress = useMotionValue(0)
  const counter = useTransform(progress, (v) =>
    String(Math.round(v * 100)).padStart(3, '0')
  )

  useEffect(() => {
    if (reduced) {
      setOpen(false)
      return
    }

    const started = performance.now()
    let cancelled = false
    let settled = 0
    let closing = false
    let creep = animate(progress, HEAD_START, { duration: 0.45, ease: EASE })

    const gates: Promise<unknown>[] = [
      nextFrame().then(nextFrame),
      document.fonts.ready,
      document.fonts.ready.then(nextFrame),
    ]

    const close = async () => {
      if (closing || cancelled) return
      closing = true
      creep.stop()

      const elapsed = performance.now() - started
      if (elapsed < MIN_MS) {
        await new Promise((r) => setTimeout(r, MIN_MS - elapsed))
      }
      if (cancelled) return

      // Must actually complete — this is the run the old build cut off.
      await new Promise<void>((resolve) => {
        animate(progress, 1, { duration: 0.5, ease: EASE, onComplete: () => resolve() })
      })
      if (cancelled) return

      // Hold on 100 long enough to read before the panel leaves.
      await new Promise((r) => setTimeout(r, 320))
      if (!cancelled) setOpen(false)
    }

    const onGate = () => {
      if (cancelled || closing) return
      settled += 1
      setReady(settled)

      creep.stop()
      if (settled >= gates.length) {
        void close()
        return
      }
      creep = animate(progress, HEAD_START + GATE_SPAN * (settled / gates.length), {
        duration: 0.55,
        ease: EASE,
      })
    }

    // Slow drift so a cold network still shows movement between gates.
    creep = animate(progress, HEAD_START + GATE_SPAN * 0.6, {
      duration: MAX_MS / 1000,
      ease: 'linear',
    })

    gates.forEach((g) => g.then(onGate, onGate))
    const hardStop = window.setTimeout(() => void close(), MAX_MS)

    /* close() awaits an rAF-driven animation, and rAF is paused in a
       backgrounded tab. Timers still fire there, so this guarantees the panel
       is gone rather than waiting on a frame that may never come. */
    const failsafe = window.setTimeout(() => {
      if (cancelled) return
      progress.set(1)
      setOpen(false)
    }, MAX_MS + 1500)

    return () => {
      cancelled = true
      creep.stop()
      clearTimeout(hardStop)
      clearTimeout(failsafe)
    }
  }, [reduced, progress])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[80] bg-paper flex flex-col justify-between px-6 md:px-10 py-6"
        >
          <motion.div
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: 'easeIn' }}
            className="flex items-center justify-between eyebrow"
          >
            <span>Khaleel Azaizy — Portfolio</span>
            <span className="hidden sm:block">Booting</span>
          </motion.div>

          <motion.div
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.36, ease: 'easeIn' }}
            className="flex items-end justify-between gap-6"
          >
            <ul className="space-y-1">
              {STEPS.map((step, i) => (
                <li
                  key={step}
                  className={`mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-500 ${
                    i < ready ? 'text-ink-2' : 'text-ink-3/35'
                  }`}
                >
                  <span className={i < ready ? 'text-ember mr-2' : 'text-ink-3/35 mr-2'}>
                    {i < ready ? '✓' : '·'}
                  </span>
                  {step}
                </li>
              ))}
            </ul>

            <div className="mono tabular-nums text-ink text-5xl md:text-8xl leading-none">
              <motion.span>{counter}</motion.span>
              <span className="text-ember">%</span>
            </div>
          </motion.div>

          {/* Progress rule */}
          <div className="mt-6 h-px w-full bg-ink/15">
            <motion.div
              className="h-px w-full bg-ember origin-left"
              style={{ scaleX: progress }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
