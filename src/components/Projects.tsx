import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/info'
import { Marquee } from './Marquee'

export function Projects() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
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
          <span>(02) — Projects</span>
          <span className="md:hidden mono text-[10px] text-ink-3">Tap to expand</span>
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

        {projects.map((p, i) => {
          const isExpanded = expandedIdx === i
          return (
            <motion.li
              key={p.num}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="project-row group border-t border-ink/15 last:border-b py-7 md:py-14 px-2 md:px-4 grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-0 items-start md:items-stretch md:min-h-[260px] lg:min-h-[320px]"
              data-cursor="hover"
            >
              {/* num — always visible */}
              <span className="col-span-2 md:col-span-1 mono text-sm text-ink-3 pt-3 md:pt-4">
                {p.num}
              </span>

              {/* MOBILE-ONLY clickable title row with chevron */}
              <button
                type="button"
                onClick={() => setExpandedIdx(isExpanded ? null : i)}
                aria-expanded={isExpanded}
                aria-controls={`project-body-${p.num}`}
                className="md:hidden col-span-10 flex items-start justify-between gap-3 text-left w-full"
              >
                <h3 className="title font-display text-3xl sm:text-6xl tracking-snug leading-[1.0] font-light flex-1">
                  {p.title}
                </h3>
                <span
                  aria-hidden
                  className={`row-chevron mt-2 ${isExpanded ? 'is-open' : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3 L 11 8 L 6 13" />
                  </svg>
                </span>
              </button>

              {/* MOBILE-ONLY collapsible body (meta + description + tags + CTA) */}
              <div
                id={`project-body-${p.num}`}
                className={`md:hidden col-span-12 collapse-body ${isExpanded ? 'is-open' : ''}`}
              >
                <div className="collapse-inner">
                  <div className="pt-2 space-y-5">
                    <div className="mono text-[11px] text-ink-3 uppercase tracking-wider">
                      {p.type} <span className="text-ink-2">— {p.year}</span>
                    </div>
                    <p className="text-ink-2 text-base leading-[1.55]">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mono text-[11px] text-ink-3">
                      {p.tags.map((t) => (
                        <span key={t} className="border border-ink/25 px-2 py-[3px] rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.links.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {p.links.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-pill"
                          >
                            {l.label}
                            <span className="cta-arrow" aria-hidden>→</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="mono text-[11px] text-ink-3">archived</div>
                    )}
                  </div>
                </div>
              </div>

              {/* DESKTOP layout — md+ only; uses display:contents so children
                  become grid items of the parent <li>.
                  Columns: [num=1] [left=5: title top + tags bottom] [middle=4: description] [right=2: CTA]
                  Items stretch to row height; middle + right are vertically centered. */}
              <div className="hidden md:contents">
                {/* left column: title (top) + type/year + tags (bottom) */}
                <div className="md:col-span-5 flex flex-col justify-between gap-8 h-full">
                  <div>
                    <h3 className="title font-display text-[clamp(44px,4.8vw,96px)] tracking-snug leading-[0.95] font-light">
                      {p.title}
                    </h3>
                    <div className="mt-3 mono text-[11px] text-ink-3 uppercase tracking-wider">
                      {p.type} <span className="text-ink-2 ml-1">— {p.year}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mono text-[11px] text-ink-3">
                    {p.tags.map((t) => (
                      <span key={t} className="border border-ink/25 px-2 py-[3px] rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* middle column: description, vertically centered */}
                <p className="md:col-span-4 md:self-center text-ink-2 text-base lg:text-lg leading-[1.6]">
                  {p.description}
                </p>

                {/* right column: CTA button(s), vertically centered, right-aligned */}
                <div className="md:col-span-2 md:self-center flex flex-wrap gap-2 md:justify-end">
                  {p.links.length > 0 ? (
                    p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-pill"
                      >
                        {l.label}
                        <span className="cta-arrow" aria-hidden>→</span>
                      </a>
                    ))
                  ) : (
                    <div className="mono text-[11px] text-ink-3 uppercase tracking-wider">archived</div>
                  )}
                </div>
              </div>
            </motion.li>
          )
        })}
      </ul>

      <div className="px-6 md:px-10 mt-12 mb-0 flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="font-display mb-3 text-2xl md:text-3xl tracking-snug">
          More on
          <span className="display-italic text-ember ml-1">GitHub.</span>
        </p>
        <a
          href="https://github.com/khaleel-azaizy"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-pill mb-3"
          data-cursor="hover"
        >
          Visit GitHub
          <span className="cta-arrow" aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}
