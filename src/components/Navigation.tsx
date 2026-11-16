import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'

const links = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
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
    const media = window.matchMedia('(min-width: 761px)')
    const close = () => setMenuOpen(false)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    media.addEventListener('change', close)
    window.addEventListener('keydown', dismiss)
    return () => {
      document.body.style.overflow = previousOverflow
      media.removeEventListener('change', close)
      window.removeEventListener('keydown', dismiss)
    }
  }, [menuOpen])

  return (
    <>
      <header className="site-header">
        <a
          href="#home"
          className="brand"
          aria-label="Khaleel Azaizy, home"
          onClick={() => setMenuOpen(false)}
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
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mobile-menu display"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              onContactClick()
            }}
          >
            Get in touch
            <FiArrowUpRight aria-hidden="true" />
          </button>
        </nav>
      )}
    </>
  )
}
