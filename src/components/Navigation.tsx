import { useEffect, useState } from 'react'
import { sections } from '../data/info'
import { Clock } from './Clock'
import { getLenis } from '../hooks/useSmoothScroll'

function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  const stages = Array.from(
    document.querySelectorAll<HTMLElement>('.stack-section, .stack-flow')
  )
  const idx = stages.findIndex((s) => s.contains(target))
  if (idx < 0) return

  // Sum the rendered heights of every preceding Stage. offsetHeight is
  // independent of sticky pinning, so this stays correct even when earlier
  // sections are currently pinned at top:0.
  let top = 0
  for (let i = 0; i < idx; i++) top += stages[i].offsetHeight

  // Add the offset of the Stages' parent container (the <main> element).
  const container = stages[0]?.parentElement
  if (container) {
    top += container.getBoundingClientRect().top + window.scrollY
  }

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(top, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lock: true,
      force: true,
      immediate: false,
    })
  } else {
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

type NavigationProps = {
  onContactClick: () => void
}

export function Navigation({ onContactClick }: NavigationProps) {
  const [active, setActive] = useState<string>('home')
  const [onDark, setOnDark] = useState<boolean>(false)

  useEffect(() => {
    const compute = () => {
      const stages = Array.from(
        document.querySelectorAll<HTMLElement>('.stack-section, .stack-flow')
      )
      if (!stages.length) return
      const container = stages[0].parentElement
      if (!container) return

      const containerY = container.getBoundingClientRect().top + window.scrollY
      const trigger = window.scrollY + window.innerHeight * 0.4

      let activeIdx = 0
      let runY = containerY
      for (let i = 0; i < stages.length; i++) {
        if (runY <= trigger) activeIdx = i
        runY += stages[i].offsetHeight
      }

      const stage = stages[activeIdx]
      const sectionEl = stage.querySelector<HTMLElement>('section[id]')
      if (sectionEl) {
        setActive(sectionEl.id)
        setOnDark(stage.classList.contains('theme-dark'))
      }
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  // colors that survive both light + dark stages
  const navText = onDark ? 'text-paper/75' : 'text-ink-3'
  const navAccent = onDark ? 'text-paper hover:text-paper' : 'text-ink hover:text-ink'
  const navDim = onDark ? 'text-paper/55' : 'text-ink-3'

  return (
    <>
      {/* Top bar */}
      <header className={`fixed top-0 left-0 right-0 z-[75] px-6 md:px-10 py-5 flex items-center justify-between pointer-events-none transition-colors duration-500 ${navText}`}>
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="pulse-dot" aria-hidden />
          <button
            onClick={onContactClick}
            className="cta-pill"
            data-cursor="hover"
          >
            Contact me
            <span className="cta-arrow" aria-hidden>↗</span>
          </button>
        </div>
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
          className={`pointer-events-auto eyebrow tracking-wider transition-colors ${navAccent}`}
          style={{ color: 'inherit' }}
        >
          KHALEEL. AZAIZY 
        </a>
        <div className="pointer-events-auto eyebrow text-right hidden md:block" style={{ color: 'inherit' }}>
          <Clock /> <span className={navDim}>UTC+3</span>
        </div>
      </header>

      {/* Right rail nav */}
      <nav
        className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[75] hidden lg:flex flex-col gap-3 transition-colors duration-500 ${navText}`}
        aria-label="Section navigation"
      >
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(s.id) }}
              className="group flex items-center justify-end gap-3 eyebrow"
              style={{ color: 'inherit' }}
            >
              <span
                className={`transition-all duration-500 ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0'
                }`}
              >
                {s.label}
              </span>
              <span className="relative inline-block">
                <span
                  className={`block transition-all duration-500 ${
                    isActive ? 'w-6 bg-ember' : `w-3 ${onDark ? 'bg-paper/60' : 'bg-ink-3'} group-hover:w-5`
                  } h-px`}
                />
              </span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
