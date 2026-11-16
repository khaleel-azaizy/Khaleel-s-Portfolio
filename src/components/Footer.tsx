import { profile } from '../data/info'
import { Clock } from './Clock'

export function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-bar label">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="footer-time">
          <span className="mark" aria-hidden="true" />
          <span>
            <Clock /> in {profile.location}
          </span>
        </span>
        <a href="#home">Back to top</a>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        Khaleel Azaizy
      </p>
    </footer>
  )
}
