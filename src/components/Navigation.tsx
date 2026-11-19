import { useEffect, useRef, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { profile } from '../data/info'

const links = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation({ onContactClick }: { onContactClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [overHero, setOverHero] = useState(true)
  const panelRef = useRef<HTMLElement>(null)
  const closeMenu = () => setMenuOpen(false)

  // The hero is light and the rest of the page is dark, so the header takes
  // the hero's colours until the hero has scrolled out from under it.
  useEffect(() => {
    const hero = document.getElementById('home')
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!hero || !header) return
    let frame = 0
    const update = () => {
      frame = 0
      setOverHero(
        hero.getBoundingClientRect().bottom > header.offsetHeight / 2,
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        }),
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
    )
    document
      .querySelectorAll('main > section[id]')
      .forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    const media = window.matchMedia('(min-width: 761px)')
    const close = () => setMenuOpen(false)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // The panel is visible from the first frame of its slide, so focus can
    // move in straight away for keyboard users.
    panelRef.current?.querySelector('a')?.focus({ preventScroll: true })
    media.addEventListener('change', close)
    window.addEventListener('keydown', dismiss)
    return () => {
      document.body.style.overflow = previousOverflow
      media.removeEventListener('change', close)
      window.removeEventListener('keydown', dismiss)
      // The panel is about to hide; don't leave focus stranded inside it.
      if (panelRef.current?.contains(document.activeElement)) {
        document.getElementById('menu-toggle')?.focus({ preventScroll: true })
      }
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`site-header${overHero && !menuOpen ? ' is-light' : ''}`}
      >
        <a
          href="#home"
          className="brand"
          aria-label="Khaleel Azaizy, home"
          onClick={closeMenu}
        >
          khaleel azaizy
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'location' : undefined}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="button nav-contact" onClick={onContactClick}>
            Get in touch
          </button>
          <button
            id="menu-toggle"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Two rules that turn into an X; the move is the feedback. */}
            <span className="burger" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      {/* Always mounted so it can animate out as well as in. While closed it
          is visibility: hidden, which also takes it out of the tab order and
          the accessibility tree. */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
      >
        <div className="menu-backdrop" onClick={closeMenu} />
        <nav
          ref={panelRef}
          className="menu-panel"
          aria-label="Mobile navigation"
        >
          {profile.available && (
            <p className="menu-note label">
              <span className="marks" aria-hidden="true" />
              Open to full-time roles and freelance projects
            </p>
          )}
          <ul className="menu-links display">
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={closeMenu}>
                  <span className="menu-line">
                    {link.label}
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  closeMenu()
                  onContactClick()
                }}
              >
                <span className="menu-line">
                  Get in touch
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </button>
            </li>
          </ul>
          <div className="menu-footer">
            <a
              className="bracket"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <a
              className="bracket"
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <span className="sr-only">(opens in new tab)</span>
            </a>
            <a className="bracket" href={`mailto:${profile.email}`}>
              Email
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
