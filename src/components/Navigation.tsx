import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { profile } from '../data/info'

const links = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Toolkit' },
]

export function Navigation({ onContactClick }: { onContactClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

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
    const media = window.matchMedia('(min-width: 701px)')
    const close = () => setMenuOpen(false)
    media.addEventListener('change', close)
    window.addEventListener('keydown', dismiss)
    return () => {
      media.removeEventListener('change', close)
      window.removeEventListener('keydown', dismiss)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          href="#home"
          className="brand"
          aria-label="Khaleel Azaizy, home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            k<span>.</span>
          </span>
          <span className="brand-name">
            Khaleel Azaizy<span>Software engineer</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          {profile.available && (
            <span className="nav-availability">
              <span className="status-dot" />
              Open to work
            </span>
          )}
          <button
            className="button button-small button-dark nav-contact"
            onClick={onContactClick}
          >
            Let's talk <FiArrowUpRight />
          </button>
          <button
            id="menu-toggle"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <FiArrowUpRight />
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              onContactClick()
            }}
          >
            Let's talk
            <FiArrowUpRight />
          </button>
        </nav>
      )}
    </header>
  )
}
