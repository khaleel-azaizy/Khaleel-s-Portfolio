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
    <section id="contact" className="contact-section section-shell">
      <div className="contact-panel">
        <div className="contact-topline">
          <p>
            {profile.available ? (
              <>
                <span className="status-dot" />
                Open to roles & freelance
              </>
            ) : (
              "Let's connect"
            )}
          </p>
          <span>Something good starts with a hello.</span>
        </div>
        <div className="contact-main">
          <h2>
            Have something
            <br />
            in mind?
          </h2>
          <button
            className="contact-circle"
            onClick={onContactClick}
            aria-label="Let's talk. Open contact form"
          >
            <FiArrowUpRight aria-hidden="true" />
            <span>Let's talk</span>
          </button>
        </div>
        <div className="contact-bottomline">
          <p>
            A product to build, a problem to solve,
            <br />
            or just a good conversation. I'm listening.
          </p>
          <div className="email-contact">
            <div>
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
            </div>
            <span role="status">
              {copyState === 'copied'
                ? 'Copied to clipboard'
                : copyState === 'error'
                  ? 'Select the email address to copy it.'
                  : 'Prefer email? My inbox is open.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
