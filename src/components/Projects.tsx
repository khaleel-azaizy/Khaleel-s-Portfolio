import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { projects, type Project } from '../data/info'
import { Marquee } from './Marquee'

const featured = projects.filter((p) => p.tier === 'feature')
const selected = projects.filter((p) => p.tier === 'selected')
const archive = projects.filter((p) => p.tier === 'index')

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
} as const

export function Projects() {
  return (
    <section id="projects" className="relative">
      <Marquee className="py-5 md:py-8 border-y border-ink/15">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-[28px] md:text-[64px] leading-none mx-6 md:mx-12 inline-flex items-center gap-5 md:gap-12"
          >
            Selected Work
            <span className="accent-word">— 2023 ⁄ 2025</span>
            <span className="text-ink-3">✦</span>
          </span>
        ))}
      </Marquee>

      <div className="px-6 md:px-10 pt-16 md:pt-20">
        <div className="flex items-center justify-between eyebrow">
          <span>(02) — Projects</span>
          <span className="mono text-[10px]">{projects.length} entries</span>
        </div>
      </div>

      {/* ── Tier 1: shipped and serving traffic ───────────────────────── */}
      <div className="px-6 md:px-10 mt-10 md:mt-14">
        <TierLabel n="01" title="In production" note="Live, commercial, real users" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((p, i) => (
            <FeatureCard key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* ── Tier 2: substantial build work ────────────────────────────── */}
      <div className="px-6 md:px-10 mt-20 md:mt-28">
        <TierLabel n="02" title="Selected builds" note="Full applications and models" />
        <ul className="mt-6">
          {selected.map((p, i) => (
            <SelectedRow key={p.num} project={p} index={i} />
          ))}
        </ul>
      </div>

      {/* ── Tier 3: coursework and experiments ────────────────────────── */}
      <div className="px-6 md:px-10 mt-20 md:mt-28">
        <TierLabel n="03" title="Archive" note="Coursework and experiments" />
        <ul className="mt-6 border-t border-ink/15">
          {archive.map((p, i) => (
            <ArchiveRow key={p.num} project={p} index={i} />
          ))}
        </ul>
      </div>

      <div className="px-6 md:px-10 mt-16 pb-24 md:pb-32 flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="font-display text-display-sm">
          More on <span className="accent-word">GitHub.</span>
        </p>
        <a
          href="https://github.com/khaleel-azaizy"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-pill"
          data-cursor="hover"
        >
          Visit GitHub
          <span className="cta-arrow" aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}

function TierLabel({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-ink/15 pt-4">
      <span className="mono text-[11px] text-ember tabular-nums">{n}</span>
      <h3 className="font-display text-xl md:text-2xl tracking-snug text-ink">{title}</h3>
      <span className="eyebrow">{note}</span>
    </div>
  )
}

function LiveChip() {
  return (
    <span className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.16em] text-signal">
      <span className="live-dot" aria-hidden />
      Live
    </span>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mono text-[11px] text-ink-3">
      {tags.map((t) => (
        <span key={t} className="border border-ink/25 px-2 py-[3px] rounded-sm">
          {t}
        </span>
      ))}
    </div>
  )
}

function FeatureCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <motion.article
      {...reveal}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="feature-card flex flex-col p-6 md:p-8"
      style={{ '--accent': p.accent } as CSSProperties}
      data-cursor="hover"
    >
      <div className="feature-rule" aria-hidden />

      <div className="flex items-center justify-between mt-6 mono text-[11px] text-ink-3 uppercase tracking-wider">
        <span className="flex items-center gap-4">
          <span className="tabular-nums">{p.num}</span>
          <span>{p.type}</span>
        </span>
        {p.live ? <LiveChip /> : <span className="tabular-nums">{p.year}</span>}
      </div>

      <div className="mt-8 flex items-start gap-5">
        <p.icon className="w-9 h-9 md:w-11 md:h-11 shrink-0 mt-1" style={{ color: p.accent }} aria-hidden />
        <h4 className="font-display text-display-md font-semibold text-ink">{p.title}</h4>
      </div>

      <p className="mt-5 text-ink-2 text-base leading-[1.6] max-w-[52ch]">{p.description}</p>

      <div className="mt-auto pt-6 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
        <Tags tags={p.tags} />
        <div className="flex flex-wrap gap-2">
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
      </div>
    </motion.article>
  )
}

/* Full row — the desktop half uses display:contents so its children become
   grid items of the <li>; mobile gets a chevron accordion instead. */
function SelectedRow({ project: p, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.li
      {...reveal}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="project-row group border-t border-ink/15 last:border-b py-7 md:py-12 px-2 md:px-4 grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-0 items-start md:items-stretch md:min-h-[220px]"
      data-cursor="hover"
    >
      <span className="col-span-2 md:col-span-1 mono text-sm text-ink-3 pt-3 md:pt-4 tabular-nums">
        {p.num}
      </span>

      {/* Mobile: tappable title + chevron */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`project-body-${p.num}`}
        className="md:hidden col-span-10 flex items-start justify-between gap-3 text-left w-full"
      >
        <h4 className="title font-display text-3xl sm:text-5xl tracking-snug leading-[1.0] flex-1">
          {p.title}
        </h4>
        <span aria-hidden className={`row-chevron mt-2 ${open ? 'is-open' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3 L 11 8 L 6 13" />
          </svg>
        </span>
      </button>

      <div
        id={`project-body-${p.num}`}
        className={`md:hidden col-span-12 collapse-body ${open ? 'is-open' : ''}`}
      >
        <div className="collapse-inner">
          <div className="pt-2 space-y-5">
            <div className="mono text-[11px] text-ink-3 uppercase tracking-wider">
              {p.type} <span className="text-ink-2">— {p.year}</span>
            </div>
            <p className="text-ink-2 text-base leading-[1.55]">{p.description}</p>
            <Tags tags={p.tags} />
            <ProjectLinks links={p.links} />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:contents">
        <div className="md:col-span-5 flex flex-col justify-between gap-8 h-full">
          <div>
            <h4 className="title font-display text-display-md font-medium">{p.title}</h4>
            <div className="mt-3 mono text-[11px] text-ink-3 uppercase tracking-wider">
              {p.type} <span className="text-ink-2 ml-1">— {p.year}</span>
            </div>
          </div>
          <Tags tags={p.tags} />
        </div>

        <p className="md:col-span-4 md:self-center text-ink-2 text-base lg:text-lg leading-[1.6]">
          {p.description}
        </p>

        <div className="md:col-span-2 md:self-center flex flex-wrap gap-2 md:justify-end">
          <ProjectLinks links={p.links} />
        </div>
      </div>
    </motion.li>
  )
}

/* Compact archive line — title, type, year. Nothing more; these exist to show
   range, not to compete with the work above them. */
function ArchiveRow({ project: p, index }: { project: Project; index: number }) {
  const href = p.links[0]?.url

  const body = (
    <>
      <span className="col-span-2 md:col-span-1 mono text-[11px] text-ink-3 tabular-nums">
        {p.num}
      </span>
      <span className="col-span-10 md:col-span-5 font-display text-lg md:text-xl tracking-snug text-ink">
        {p.title}
      </span>
      <span className="col-span-8 md:col-span-4 mono text-[11px] text-ink-3 uppercase tracking-wider self-center">
        {p.type}
      </span>
      <span className="col-span-4 md:col-span-2 mono text-[11px] text-ink-3 tabular-nums text-right self-center">
        {p.year}
        {href && <span className="text-ember ml-2" aria-hidden>↗</span>}
      </span>
    </>
  )

  return (
    <motion.li
      {...reveal}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="index-row border-b border-ink/10"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-4"
          data-cursor="hover"
        >
          {body}
        </a>
      ) : (
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-4">{body}</div>
      )}
    </motion.li>
  )
}

function ProjectLinks({ links }: { links: Project['links'] }) {
  if (!links.length) {
    return <span className="mono text-[11px] text-ink-3 uppercase tracking-wider">Archived</span>
  }
  return (
    <>
      {links.map((l) => (
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
    </>
  )
}
