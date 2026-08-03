import { motion, useScroll, useTransform } from 'framer-motion'
import { RevealLine } from './RevealText'
import { HeroFigure } from './HeroFigure'
import { profile } from '../data/info'

export function Hero() {
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, [0, 900], [0, -60])

  return (
    <section id="home" className="hero-section relative min-h-[100svh] flex flex-col">
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

      {/* Statement beside the figure, copy holding the left edge.

          The figure is sized by height rather than width: the hero has a fixed
          vertical budget, and the artwork is roughly square (632x545 after
          cropping the exported frame's dead space), so driving it from a width
          would overshoot the budget on desktop and swallow the fold on phones. */}
      {/* justify-end is "bottom" while this is a column and "right" once it is a
          row, so the row case is stated separately — otherwise the copy loses
          the left gutter. */}
      <div className="hero-band flex-1 px-6 md:px-10 mt-8 pb-4 md:pb-0 flex flex-col md:flex-row md:items-end justify-end md:justify-between gap-6 md:gap-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-none text-ink-2 text-base md:text-xl leading-[1.5] max-w-[46ch] md:flex-1 md:pb-2"
        >
          I build full-stack products end to end — storefront, admin, API, and the
          data layer under it.
        </motion.p>

        {/* Bleeds through the page gutter on the right, so the drawing runs to
            the edge instead of sitting inside the text column. The widths add
            back the gutter the negative margin eats.

            order-1: stacked on phones the drawing leads and the statement sits
            under it; DOM order stays copy-first so a screen reader still gets
            the sentence before the decorative art. */}
        <motion.figure
          className="order-1 md:order-none m-0 shrink-0 self-start md:self-end -mr-6 md:-mr-10 w-[calc(100%+1.5rem)] md:w-[calc(46%+2.5rem)] lg:w-auto"
          style={{ y: drift }}
        >
          {/* Width/height come from .hero-figure — which axis drives depends on
              the breakpoint, so only the ratio is set here. */}
          <HeroFigure className="aspect-[632/545]" />
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
