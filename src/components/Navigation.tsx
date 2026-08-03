import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { sections, type SectionId } from '../data/info'
import { Clock } from './Clock'
import { getLenis } from '../hooks/useSmoothScroll'
import { useScrollVelocity } from '../hooks/useScrollVelocity'
import { readStages, useActiveStage } from '../hooks/useActiveStage'

type NavigationProps = {
  onContactClick: () => void
}

export function Navigation({ onContactClick }: NavigationProps) {
  const { active, stagesRef } = useActiveStage()
  const [menuOpen, setMenuOpen] = useState(false)
  const velocity = useScrollVelocity()

  // Active dash stretches with scroll speed.
  const dashWidth = useTransform(velocity, (v) => 24 + Math.abs(v) * 18)

  const scrollToSection = useCallback((id: SectionId) => {
    const stages = stagesRef.current.length ? stagesRef.current : readStages()
    const target = stages.find((s) => s.id === id)
    if (!target) return

    const lenis = getLenis()
    // Keep the URL in step so deep links and the back button work.
    const settle = () => history.replaceState(null, '', `#${id}`)

    if (lenis) {
      lenis.scrollTo(target.top, {
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        lock: true,
        force: true,
        immediate: false,
        onComplete: settle,
      })
    } else {
      window.scrollTo({ top: target.top, behavior: 'smooth' })
      settle()
    }
  }, [])

  // Honour a hash on first load, once stages have been measured.
  useEffect(() => {
    const id = window.location.hash.slice(1) as SectionId
    if (!id || !sections.some((s) => s.id === id)) return
    const raf = requestAnimationFrame(() => scrollToSection(id))
    return () => cancelAnimationFrame(raf)
  }, [scrollToSection])

  const activeSection = sections.find((s) => s.id === active) ?? sections[0]

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-[75] px-6 md:px-10 py-4 flex items-center justify-between pointer-events-none text-ink-3">
        <div className="chrome-pill pointer-events-auto flex items-center gap-3">
          <span className="pulse-dot" aria-hidden />
          <button onClick={onContactClick} className="cta-pill" data-cursor="hover">
            Contact me
            <span className="cta-arrow" aria-hidden>↗</span>
          </button>
        </div>

        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
          className="chrome-pill pointer-events-auto eyebrow tracking-wider text-ink hover:text-ember transition-colors"
        >
          Khaleel. Azaizy
        </a>

        <div className="chrome-pill pointer-events-auto eyebrow text-right hidden md:block">
          <Clock /> <span className="text-ink-3">UTC+3</span>
        </div>
      </header>

      {/* Desktop rail */}
      <nav
        className="rail-shell fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[75] hidden lg:flex flex-col gap-3 text-ink-3"
        aria-label="Section navigation"
      >
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(s.id) }}
              aria-current={isActive ? 'true' : undefined}
              className="group flex items-center justify-end gap-3 eyebrow"
            >
              <span
                className={`transition-all duration-500 ${
                  isActive
                    ? 'opacity-100 translate-x-0 text-ink'
                    : 'opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0'
                }`}
              >
                {s.label}
              </span>
              {isActive ? (
                <motion.span className="block h-px bg-ember" style={{ width: dashWidth }} />
              ) : (
                <span className="block h-px w-3 bg-ink-3 transition-all duration-500 group-hover:w-5" />
              )}
            </a>
          )
        })}
      </nav>

      {/* Mobile section nav — reads as instrument chrome rather than a
          hamburger, and reuses the same active-section state as the rail. */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[76]">
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              id="mobile-sections"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-paper-2/95 backdrop-blur-md border-t border-ink/15 px-6 py-2"
            >
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setMenuOpen(false)
                      scrollToSection(s.id)
                    }}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`flex items-center gap-4 py-3 border-b border-ink/10 last:border-b-0 eyebrow ${
                      active === s.id ? 'text-ember' : 'text-ink-2'
                    }`}
                  >
                    <span className="tabular-nums">{s.index}</span>
                    <span className="font-display text-xl tracking-snug normal-case">
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-sections"
          className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-paper-2/95 backdrop-blur-md border-t border-ink/15 eyebrow text-ink-2"
        >
          <span className="flex items-center gap-3">
            <span className="tabular-nums text-ember">{activeSection.index}</span>
            <span>{activeSection.label}</span>
          </span>
          <span
            aria-hidden
            className={`transition-transform duration-500 ease-out-expo ${menuOpen ? 'rotate-180' : ''}`}
          >
            ▲
          </span>
        </button>
      </div>
    </>
  )
}
