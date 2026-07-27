import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getLenis } from '../hooks/useSmoothScroll'

type Props = {
  open: boolean
  onClose: () => void
}

// Replace this with your Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrevqraa'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ContactForm({ open, onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const panelRef = useRef<HTMLDivElement>(null)

  /* Escape to close, focus trapped inside the panel while open, and focus
     handed back to whatever opened the dialog on close. */
  useEffect(() => {
    if (!open) return

    const opener = document.activeElement as HTMLElement | null

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return

      const first = items[0]
      const last = items[items.length - 1]
      const activeEl = document.activeElement

      if (e.shiftKey && (activeEl === first || !panel.contains(activeEl))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)

    // Lenis owns scrolling, so overflow:hidden alone would not stop it.
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStatus('idle')
        setName('')
        setEmail('')
        setMessage('')
      }, 300)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 md:px-10"
          aria-modal="true"
          role="dialog"
          aria-labelledby="cf-title"
        >
          {/* Backdrop */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-label="Close contact form"
            tabIndex={-1}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-paper-2 text-ink border border-ink/15 shadow-2xl p-6 md:p-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="eyebrow">Contact</div>
                <h3
                  id="cf-title"
                  className="font-display text-3xl md:text-5xl leading-[1.05] tracking-snug font-medium mt-2"
                >
                  {status === 'success' ? (
                    <>
                      Message
                      <span className="accent-word"> sent.</span>
                    </>
                  ) : (
                    <>
                      Send a
                      <span className="accent-word"> brief.</span>
                    </>
                  )}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="font-display text-3xl text-ink-3 hover:text-ember transition-colors"
                data-cursor="hover"
              >
                ×
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 space-y-6"
                >
                  <p className="font-display text-xl md:text-2xl text-ink-2">
                    Thank you for reaching out! I'll get back to you as soon as possible.
                  </p>
                  <div className="pt-6 border-t border-ink/15">
                    <button
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 font-display text-xl md:text-2xl border-b border-ink pb-1 hover:border-ember hover:text-ember transition-colors"
                      data-cursor="hover"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  <Field label="Your name" htmlFor="cf-name">
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === 'submitting'}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ember font-display text-xl md:text-2xl py-2 transition-colors disabled:opacity-50"
                      placeholder="Jane Doe"
                    />
                  </Field>

                  <Field label="Reply-to email" htmlFor="cf-email">
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'submitting'}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ember font-display text-xl md:text-2xl py-2 transition-colors disabled:opacity-50"
                      placeholder="jane@studio.com"
                    />
                  </Field>

                  <Field label="Message" htmlFor="cf-message">
                    <textarea
                      id="cf-message"
                      name="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === 'submitting'}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ember font-display text-lg md:text-xl py-2 resize-none transition-colors disabled:opacity-50"
                      placeholder="What are you building?"
                    />
                  </Field>

                  {status === 'error' && (
                    <p className="text-alert font-display text-lg">
                      Oops! There was a problem submitting your form. Please try again.
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="mono text-[11px] text-ink-3">
                      Powered by Formspree
                    </span>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group inline-flex items-center gap-3 font-display text-xl md:text-2xl border-b border-ink pb-1 hover:border-ember hover:text-ember transition-colors disabled:opacity-50"
                      data-cursor="hover"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send message'}
                      {!status.includes('submitting') && (
                        <span className="text-ember transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                          →
                        </span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow block mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
