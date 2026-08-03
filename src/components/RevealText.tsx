import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  duration?: number
}

/**
 * A line that slides up from behind its own top edge.
 *
 * Animates on mount rather than `whileInView`, and that is load-bearing: the
 * line starts translated fully outside `.reveal-line`, whose `overflow: hidden`
 * clips it away. IntersectionObserver — which is what `whileInView` uses —
 * intersects against ancestor clips, so a fully clipped element never reports
 * as visible, never triggers, and stays hidden permanently. The reveal
 * deadlocked itself and the hero rendered with no name at all.
 *
 * This is only ever used above the fold, so mount is the right trigger anyway.
 */
export function RevealLine({ children, delay = 0, className = '', duration = 0.9 }: Props) {
  return (
    <span className="reveal-line">
      <motion.span
        initial={{ y: '130%' }}
        animate={{ y: '0%' }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function FadeIn({
  children,
  delay = 0,
  y = 20,
  className = '',
}: Props & { y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
