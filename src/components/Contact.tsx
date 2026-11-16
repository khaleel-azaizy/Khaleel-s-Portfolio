import { useEffect, useRef, useState } from 'react'
import { FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi'
import { profile } from '../data/info'

export function Contact({ onContactClick }: { onContactClick: () => void }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  )
  const resetRef = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(resetRef.current), [])

  const copyEmail = async () => {
    clearTimeout(resetRef.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    resetRef.current = setTimeout(() => setCopyState('idle'), 3500)
  }

  return (
    <section id="contact" className="contact-section grid-12 shell section">
      {profile.available && (
        <p className="contact-status label">
          <span className="marks" aria-hidden="true" />
          Open to full-time roles and freelance projects
        </p>
      )}
      <h2 className="display">
        Let's build
        <br />
        something useful
      </h2>
      <div className="contact-body">
        <p>
          A product to build, a role to fill, or a problem worth solving. Tell
          me about it and I'll reply by email.
        </p>
        <div className="contact-actions">
          <button className="button button-solid" onClick={onContactClick}>
            Get in touch
          </button>
        </div>
        <div className="email-line">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            className="icon-button"
            onClick={copyEmail}
            aria-label={
              copyState === 'copied' ? 'Email copied' : 'Copy email address'
            }
          >
            {copyState === 'copied' ? <FiCheck /> : <FiCopy />}
          </button>
          <span className="label muted" role="status">
            {copyState === 'copied'
              ? 'Copied'
              : copyState === 'error'
                ? 'Copy failed. Select the address instead.'
                : ''}
          </span>
        </div>
      </div>
      <div className="contact-links">
        <div>
          <h3 className="label muted">Elsewhere</h3>
          <ul>
            <li>
              <a
                className="bracket"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
            <li>
              <a
                className="bracket"
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="label muted">On this page</h3>
          <ul>
            <li>
              <a className="bracket" href="#projects">
                Work
              </a>
            </li>
            <li>
              <a className="bracket" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="bracket" href="#skills">
                Toolkit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
