import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealLine } from './RevealText'
import { Marquee } from './Marquee'
import { profile, projects, skills } from '../data/info'

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
      className="relative min-h-[100svh] px-6 md:px-10 pt-32 md:pt-36 pb-0 flex flex-col"
    >
      {/* Decorative rotating asterisk */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[22%] hidden md:block select-none"
      >
        <span className="font-display block text-[160px] lg:text-[220px] leading-none text-ember/25 spin-slow">
          ✱
        </span>
      </div>

      {/* Eyebrow row */}
      <div className="flex items-start justify-between text-ink-3 eyebrow gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span>(00)</span>
          <span className="hidden sm:inline">Index — Hello, welcome.</span>
          <span className="sm:hidden">Hello, welcome.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-right max-w-[20ch] leading-relaxed"
        >
          <div>Independent engineer</div>
          <div>based in {profile.location}</div>
          <div className="mt-1 text-ink-2">N 32.7° · E 35.0°</div>
        </motion.div>
      </div>

      {/* Headline */}
      <div className="mt-16 md:mt-20">
        <h1 className="font-display text-ink leading-[0.86] tracking-tightest">
          <span className="block text-[clamp(56px,13vw,210px)] font-light">
            <RevealLine delay={0.4}>Khaleel</RevealLine>
          </span>
          <span className="block text-[clamp(56px,13vw,210px)] font-light">
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
        className="mt-8 md:mt-10 font-display text-2xl sm:text-3xl md:text-4xl tracking-snug leading-[1.15] max-w-4xl"
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

      {/* Sub-grid: pitch · stats · scroll */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
        {/* Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4"
        >
          <p className="eyebrow mb-3">∗ Currently</p>
          <p className="text-ink-2 leading-relaxed max-w-sm">
            Building full-stack products, data tools, and AI-integrated
            interfaces — end-to-end, with attention to the last detail.
          </p>
        </motion.div>

        {/* Stats trio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:col-start-6 grid grid-cols-3 gap-4 md:gap-6"
        >
          <Stat n={String(projects.length).padStart(2, '0')} top="Projects" bottom="shipped" />
          <Stat n={String(skills.length)} top="Stack" bottom="items" />
          <Stat n="04" top="Domains" bottom="covered" />
        </motion.div>

        {/* Scroll CTA */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 md:col-start-11 group flex items-center justify-between gap-3 border-t border-ink/30 pt-3"
          data-cursor="hover"
        >
          <span className="eyebrow text-ink">↓ Selected work</span>
          <span className="font-display text-3xl drift text-ember">↓</span>
        </motion.a>
      </div>

      {/* Bottom keyword marquee — visual handoff to next section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8 }}
        className="-mx-6 md:-mx-10 mt-12 md:mt-16 border-t border-ink/20"
      >
        <Marquee className="py-4">
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

      {/* corner brand mark */}
      <div className="mt-3 mb-4 flex items-center justify-between eyebrow text-ink-3">
        <span>©{new Date().getFullYear()} — Portfolio v.0.1</span>
        <span className="hidden md:inline">(scroll to begin)</span>
      </div>
    </section>
  )
}

function Stat({ n, top, bottom }: { n: string; top: string; bottom: string }) {
  return (
    <div className="border-t border-ink/30 pt-3">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl leading-none tracking-snug">
        {n}
      </div>
      <div className="mono text-[11px] text-ink-3 mt-2 uppercase tracking-wider">
        {top}
      </div>
      <div className="mono text-[11px] text-ink-2">— {bottom}</div>
    </div>
  )
}
