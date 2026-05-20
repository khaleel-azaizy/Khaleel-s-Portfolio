import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/info'
import { Marquee } from './Marquee'
import { RevealLine } from './RevealText'

export function Projects() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const hovered = hoverIdx !== null ? projects[hoverIdx] : null

  return (
    <section id="projects" className="relative">
      {/* divider marquee */}
      <Marquee className="py-5 md:py-8 border-y border-ink/15">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="font-display text-[28px] md:text-[64px] leading-none mx-6 md:mx-12 inline-flex items-center gap-5 md:gap-12">
            Selected Work
            <span className="display-italic text-ember">— 2023 ⁄ 2025</span>
            <span className="text-ink-3">✦</span>
          </span>
        ))}
      </Marquee>

      {/* header strip */}
      <div className="px-6 md:px-10 pt-16 md:pt-20">
        <div className="flex items-center justify-between eyebrow text-ink-3">
          <span>(02) — Projects · {String(projects.length).padStart(2, '0')} entries</span>
          <span className="mono hidden md:inline">↳ Hover a row for preview</span>
        </div>
      </div>

      {/* project rows */}
      <ul className="px-6 md:px-10 mt-8 md:mt-12 relative">
        {/* preview card pinned for desktop */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.num}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden xl:flex pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 aspect-[4/3] w-[320px] flex-col p-6"
              style={{ background: hovered.accent, color: '#f5efe2' }}
            >
              <div className="mono text-[11px] tracking-wide opacity-80">{hovered.num} / {hovered.type}</div>
              <div className="mt-auto">
                <hovered.icon className="w-14 h-14 opacity-90 mb-3" />
                <div className="font-display text-3xl leading-tight">{hovered.title}</div>
                <div className="mono text-[11px] mt-2 opacity-80">{hovered.tags.slice(0, 3).join(' · ')}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {projects.map((p, i) => (
          <motion.li
            key={p.num}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="project-row group border-t border-ink/15 last:border-b py-7 md:py-10 px-2 md:px-4 grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-5 items-start"
            data-cursor="hover"
          >
            {/* num */}
            <span className="col-span-2 md:col-span-1 mono text-sm text-ink-3 pt-3 md:pt-4">
              {p.num}
            </span>

            {/* title */}
            <div className="col-span-10 md:col-span-8">
              <h3 className="title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-snug leading-[1.0] font-light">
                <RevealLine>
                  <span>{p.title}</span>
                </RevealLine>
              </h3>
            </div>

            {/* meta column (type, year, link) */}
            <div className="col-span-12 md:col-span-3 mono text-xs md:text-right space-y-1.5 md:pt-4">
              <div className="text-ink-3 uppercase tracking-wider">{p.type}</div>
              <div className="text-ink-2">— {p.year}</div>
              {p.links.length > 0 ? (
                <a
                  href={p.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow inline-flex items-center gap-2 link-arc pt-1"
                >
                  {p.links[0].label}
                  <span className="font-display text-lg text-ember">→</span>
                </a>
              ) : (
                <div className="text-ink-3 pt-1">archived</div>
              )}
            </div>

            {/* description — aligned under title */}
            <p className="col-span-12 md:col-start-2 md:col-span-8 text-ink-2 text-base md:text-xl leading-[1.55] max-w-3xl">
              {p.description}
            </p>

            {/* tags — aligned right, under meta */}
            <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1.5 md:justify-end mono text-[11px] text-ink-3">
              {p.tags.map((t) => (
                <span key={t} className="border border-ink/25 px-2 py-[3px] rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="px-6 md:px-10 mt-12 mb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="font-display text-2xl md:text-3xl tracking-snug max-w-xl">
          More work, lab notes & coursework live on
          <a
            href="https://github.com/khaleel-azaizy"
            target="_blank"
            rel="noopener noreferrer"
            className="display-italic text-ember link-arc ml-1"
          >
            GitHub →
          </a>
        </p>
        <span className="mono text-[11px] text-ink-3">END · 02</span>
      </div>
    </section>
  )
}
