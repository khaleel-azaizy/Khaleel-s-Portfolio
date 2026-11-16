import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import { profile } from '../data/info'
import { Clock } from './Clock'

export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <a
          href="#home"
          className="brand"
          aria-label="Khaleel Azaizy, back to top"
        >
          <span className="brand-mark" aria-hidden="true">
            k<span>.</span>
          </span>
          <span>Built with intention.</span>
        </a>
        <div className="footer-socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <FiArrowUpRight />
          </a>
          <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn <FiArrowUpRight />
          </a>
          <a href={`mailto:${profile.email}`}>
            Email <FiArrowUpRight />
          </a>
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        Khaleel Azaizy<span>.</span>
      </p>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Khaleel Azaizy</span>
        <span className="footer-time">
          <span className="status-dot" />
          <Clock /> in Israel
        </span>
        <a href="#home">
          Back to top <FiArrowUp />
        </a>
      </div>
    </footer>
  )
}
