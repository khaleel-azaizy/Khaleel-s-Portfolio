import { FiArrowDown } from 'react-icons/fi'
import { profile } from '../data/info'

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section id="home" className="hero grid-12 shell">
      <div className="hero-visual" aria-hidden="true">
        {profile.portrait ? (
          <img
            className="hero-portrait"
            src={profile.portrait}
            alt=""
          />
        ) : (
          // Ink sketch from public/hero-figure.svg. The file has no fills of
          // its own, so it is used as a mask and coloured from CSS.
          <div className="hero-figure" />
        )}
      </div>

      <h1 className="hero-headline display">
        <span className="sr-only">
          Khaleel Azaizy, full-stack software engineer.{' '}
        </span>
        <span className="hero-line" aria-hidden="true">
          <span>Building</span>
        </span>
        <span className="hero-line" aria-hidden="true">
          <span>products</span>
        </span>
        <span className="hero-line" aria-hidden="true">
          <span>that ship</span>
        </span>
        <span className="sr-only">Building products that ship.</span>
      </h1>

      {profile.available && (
        <p className="hero-note label">
          <span className="marks" aria-hidden="true" />
          Open to full-time roles and freelance projects
        </p>
      )}

      <p className="hero-intro">
        Full-stack software engineer in {profile.location}. I build web
        products with React, Node.js and Firebase, and reach for Python when a
        problem needs data or machine learning.
      </p>

      <p className="hero-sub display">
        From the interface
        <br />
        to the database
      </p>

      <div className="hero-footer">
        <div className="hero-actions">
          <a className="button button-solid" href="#projects">
            See my work
          </a>
          <button className="button" onClick={onContactClick}>
            Get in touch
          </button>
        </div>
        <div className="hero-meta label">
          <span>B.Sc. Software Engineering, 2025</span>
          <a href="#projects">
            Scroll <FiArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
