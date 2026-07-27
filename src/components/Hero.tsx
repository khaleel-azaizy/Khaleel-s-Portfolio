import { motion, useScroll, useTransform } from 'framer-motion'
import { RevealLine } from './RevealText'
import { StackDiagram } from './StackDiagram'
import { profile } from '../data/info'

export function Hero() {
  // Scroll-linked drift only. The schematic previously leaned toward the
  // cursor, which read as the diagram being nudged rather than as a diagram.
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, [0, 900], [0, -60])

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col">
      {/* Name — full-bleed, the anchor of the whole page */}
      <div className="hero-shell px-6 md:px-10 pt-24 md:pt-28">
        <div className="flex items-center justify-between eyebrow">
          <span>(00) — Index</span>
          <span className="hidden sm:block">Software Engineer</span>
        </div>

        <h1 className="hero-name mt-8 md:mt-10 font-display text-display-xl font-semibold text-ink">
          <span className="block">
            <RevealLine delay={0.05}>Khaleel</RevealLine>
          </span>
          <span className="block">
            <RevealLine delay={0.16}>
              <span>Azaizy</span>
              <span className="accent-word">.</span>
            </RevealLine>
          </span>
        </h1>
      </div>

      {/* Statement, then the thing it describes */}
      <div className="hero-band flex-1 px-6 md:px-10 mt-8 pb-6 md:pb-8 flex flex-col justify-end gap-7 md:gap-9">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-ink-2 text-base md:text-xl leading-[1.5] max-w-[46ch]"
        >
          I build full-stack products end to end — storefront, admin, API, and the
          data layer under it.
        </motion.p>

        {/* Full-bleed so the three panels get room to breathe — side by side in
            a half-width column they clipped their own labels. */}
        <motion.figure className="m-0" style={{ y: drift }}>
          <StackDiagram />
          <figcaption className="mono text-[10px] tracking-[0.16em] uppercase text-ink-3 mt-3 border-t border-ink/15 pt-2">
            Fig. 01 — What a shipped product looks like
          </figcaption>
        </motion.figure>
      </div>

      {/* Machine readout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="border-t border-ink/15 px-6 md:px-10 py-4"
      >
        <div className="status-strip">
          {profile.available && (
            <span className="inline-flex items-center gap-2 text-ink-2">
              <span className="live-dot" aria-hidden />
              Available for work
            </span>
          )}
          <span className="sep">/</span>
          <span>
            <span className="val">2</span> products in production
          </span>
          <span className="sep">/</span>
          <span>Full-stack · Data · AI</span>
          <span className="sep">/</span>
          <span>B.Sc SWE — Kinneret ’25</span>
        </div>
      </motion.div>
    </section>
  )
}
