import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Modal } from './Modal'
import { profile } from '../data/info'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrevqraa'

export function ContactForm({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const requestRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!open) {
      requestRef.current?.abort()
      setStatus('idle')
    }
    return () => requestRef.current?.abort()
  }, [open])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return
    const controller = new AbortController()
    requestRef.current = controller
    let timedOut = false
    const timeout = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 15000)
    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
        signal: controller.signal,
      })
      if (controller.signal.aborted) return
      if (!response.ok) throw new Error('Message was not accepted')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      if (!controller.signal.aborted || timedOut) setStatus('error')
    } finally {
      clearTimeout(timeout)
      if (requestRef.current === controller) requestRef.current = null
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      titleId="contact-title"
      className="contact-modal"
    >
      {status === 'success' ? (
        <div className="contact-success" role="status">
          <h2 id="contact-title">Message sent</h2>
          <p>
            Thanks for reaching out. I'll get back to you at the email address
            you shared.
          </p>
          <button className="button button-solid" onClick={onClose}>
            Back to the portfolio
          </button>
        </div>
      ) : (
        <>
          <h2 id="contact-title">Get in touch</h2>
          <p className="form-intro">
            Tell me who you are and what you have in mind. I'll reply by
            email.
          </p>
          <form onSubmit={handleSubmit}>
            <fieldset disabled={status === 'submitting'}>
              <div className="form-row">
                <label htmlFor="contact-name">
                  Your name
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    maxLength={120}
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                <label htmlFor="contact-email">
                  Your email
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@example.com"
                    maxLength={254}
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
              </div>
              <label htmlFor="contact-message">
                What's on your mind?
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  required
                  placeholder="A project, an opportunity, or a quick hello…"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </label>
            </fieldset>
            {status === 'error' && (
              <p className="form-error" role="alert">
                The message didn't go through. Check your connection and try
                again, or{' '}
                <a href={`mailto:${profile.email}`}>email me directly</a>.
              </p>
            )}
            <div className="form-footer">
              <span role="status">
                {status === 'submitting'
                  ? 'Sending your message…'
                  : "I'll reply to the email you share."}
              </span>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="button button-solid"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
          <div className="form-email">
            Or write to <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </>
      )}
    </Modal>
  )
}
