import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Intro() {
  const [open, setOpen] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const dur = 1600
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setCount(Math.floor(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setOpen(false), 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.0, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[80] bg-ink text-paper flex flex-col"
        >
          <div className="px-6 md:px-10 py-5 flex items-center justify-between eyebrow text-paper/70">
            <span>Khaleel Azaizy — Portfolio</span>
            <span className="mono">Booting interface…</span>
          </div>

          <div className="flex-1 grid grid-cols-12 items-end px-6 md:px-10 pb-10">
            <div className="col-span-12 md:col-span-8 font-display text-[clamp(56px,14vw,220px)] leading-[0.86] font-light">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Hello<span className="display-italic text-ember">,</span>
              </motion.span>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10 mono text-paper/80 tabular-nums text-right text-2xl md:text-5xl">
              {String(count).padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
