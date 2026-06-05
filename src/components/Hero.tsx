import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealLine } from './RevealText'
import { Marquee } from './Marquee'
import { projects, skills } from '../data/info'
import { HeroDrawing } from './HeroDrawing'

const ROLES = ['full-stack', 'data-driven', 'AI-integrated', 'production-grade']

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100svh] px-6 md:px-10 pt-32 md:pt-28 pb-0 flex flex-col"
    >
      {/* Hero sketch — centered on mobile, left-anchored on desktop */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center md:justify-start md:pl-[2%] select-none"
      >
        <HeroDrawing
          className="text-ink/90 h-[95svh] sm:h-[95svh] md:h-[100svh] aspect-[210/297] max-w-[110%] sm:max-w-[90%] md:max-w-[50%]"
        />
      </motion.div>

      {/* Text content — full width on mobile, middle-right column on desktop */}
      <div className="relative z-10 flex flex-col flex-1 md:self-end md:w-[55%]">
        {/* Eyebrow row */}
        <div className="flex items-start justify-between text-ink-3 eyebrow gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span>(00)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-right max-w-[20ch] leading-relaxed"
          >

          </motion.div>
        </div>

        {/* Headline */}
        <div className="mt-16 md:mt-20">
          <h1 className="font-display text-ink leading-[0.86] tracking-tightest">
            <span className="block text-[clamp(56px,10vw,180px)] font-light">
              <RevealLine delay={0.4}>Khaleel</RevealLine>
            </span>
            <span className="block text-[clamp(56px,10vw,180px)] font-light">
              <RevealLine delay={0.55}>
                <span>Azaizy</span>
                <span className="display-italic text-ember">.</span>
              </RevealLine>
            </span>
          </h1>
        </div>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-auto md:mt-10 font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-snug leading-[1.15]"
        >
          <span className="text-ink-2">Engineer of</span>
          <span className="relative inline-block align-baseline mx-2 md:mx-3 min-w-[7ch] md:min-w-[10ch]">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                initial={{ y: '90%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-90%', opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="display-italic text-ember inline-block"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-ink-2">products,</span>
          <br className="hidden sm:block" />
          <span className="text-ink"> with a quiet bias for craft.</span>
        </motion.div>
      </div>

     
  
      {/* Bottom keyword marquee — visual handoff to next section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8 }}
        className="relative z-10 -mx-6 md:-mx-10 md:mt-auto pt-12 md:pt-0 border-t border-ink/20"
      >
        <Marquee className="py-1 ">
          {[
            'Full-Stack',
            'Data Analytics',
            'AI Integrations',
            'Machine Learning',
            'React · Angular',
            'Python · Node',
            'Firebase · SQL',
            'NLP · Vision',
            'Interface · Motion',
          ].map((kw, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl mx-6 inline-flex items-center gap-6 text-ink-2">
              {kw}
              <span className="text-ember/80">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

    </section>
  )
}

function Stat({ n, top }: { n: string; top: string }) {
  return (
    <div className="border-t border-ink/30 pt-3">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl leading-none tracking-snug">
        {n}
      </div>
      <div className="mono text-[11px] text-ink-3 mt-2 uppercase tracking-wider">
        {top}
      </div>
    </div>
  )
}
