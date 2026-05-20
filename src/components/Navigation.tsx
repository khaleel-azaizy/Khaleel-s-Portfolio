import { useEffect, useState } from 'react'
import { sections } from '../data/info'
import { Clock } from './Clock'
import { profile } from '../data/info'

export function Navigation() {
  const [active, setActive] = useState<string>('home')
  const [onDark, setOnDark] = useState<boolean>(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id)
            const stage = (e.target as HTMLElement).closest('.stack-section')
            setOnDark(!!stage?.classList.contains('theme-dark'))
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
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
          <span className="eyebrow" style={{ color: 'inherit' }}>{profile.available ? 'Available — Q3 2026' : 'Booked'}</span>
        </div>
        <a href="#home" className={`pointer-events-auto eyebrow tracking-wider transition-colors ${navAccent}`} style={{ color: 'inherit' }}>
          KH. AZAIZY <span className={navDim}>/ PORTFOLIO ’26</span>
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
