import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/info'

type Props = {
  open: boolean
  onClose: () => void
}

type Provider = {
  id: 'gmail' | 'outlook' | 'yahoo' | 'mailto'
  label: string
  hint: string
  build: (to: string, subject: string, body: string) => string
  newTab: boolean
}

const providers: Provider[] = [
  {
    id: 'gmail',
    label: 'Gmail',
    hint: 'mail.google.com',
    build: (to, su, body) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`,
    newTab: true,
  },
  {
    id: 'outlook',
    label: 'Outlook',
    hint: 'outlook.live.com',
    build: (to, su, body) =>
      `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${body}`,
    newTab: true,
  },
  {
    id: 'yahoo',
    label: 'Yahoo',
    hint: 'compose.mail.yahoo.com',
    build: (to, su, body) =>
      `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${body}`,
    newTab: true,
  },
  {
    id: 'mailto',
    label: 'Default app',
    hint: 'Apple Mail · Thunderbird · …',
    build: (to, su, body) => `mailto:${to}?subject=${su}&body=${body}`,
    newTab: false,
  },
]

export function ContactForm({ open, onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState<'form' | 'choose'>('form')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStage('form')
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStage('choose')
  }

  const openWith = (p: Provider) => {
    const subject = encodeURIComponent(`Portfolio inquiry — ${name || 'Anonymous'}`)
    const body = encodeURIComponent(`From: ${name}\nReply-to: ${email}\n\n${message}`)
    const to = encodeURIComponent(profile.email)
    const url = p.build(to, subject, body)
    if (p.newTab) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = url
    }
    onClose()
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
        >
          {/* Backdrop */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-paper text-ink border border-ink/15 shadow-2xl p-6 md:p-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="eyebrow text-ink-3">∗ Contact</div>
                <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-snug font-light mt-2">
                  {stage === 'form' ? (
                    <>
                      Send a
                      <span className="display-italic text-ember"> brief.</span>
                    </>
                  ) : (
                    <>
                      Open with
                      <span className="display-italic text-ember">…</span>
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
              {stage === 'form' ? (
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
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ember outline-none font-display text-xl md:text-2xl py-2 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </Field>

                  <Field label="Reply-to email" htmlFor="cf-email">
                    <input
                      id="cf-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ember outline-none font-display text-xl md:text-2xl py-2 transition-colors"
                      placeholder="jane@studio.com"
                    />
                  </Field>

                  <Field label="Message" htmlFor="cf-message">
                    <textarea
                      id="cf-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b border-ink/30 focus:border-ember outline-none font-display text-lg md:text-xl py-2 resize-none transition-colors"
                      placeholder="What are you building?"
                    />
                  </Field>

                  <div className="flex items-center justify-between pt-2">
                    <span className="mono text-[11px] text-ink-3">
                      Pick your mail provider next
                    </span>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 font-display text-xl md:text-2xl border-b border-ink pb-1 hover:border-ember hover:text-ember transition-colors"
                      data-cursor="hover"
                    >
                      Continue
                      <span className="text-ember transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                        →
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {providers.map((p, i) => (
                      <motion.li
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <button
                          type="button"
                          onClick={() => openWith(p)}
                          className="w-full group flex items-center justify-between gap-4 border border-ink/20 hover:border-ember hover:text-ember transition-colors px-4 py-4 text-left"
                          data-cursor="hover"
                        >
                          <span>
                            <span className="block font-display text-2xl tracking-snug">
                              {p.label}
                            </span>
                            <span className="mono text-[11px] text-ink-3 group-hover:text-ember/80">
                              {p.hint}
                            </span>
                          </span>
                          <span className="text-ember translate-y-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-2 font-display text-2xl">
                            ↗
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-ink/15">
                    <button
                      type="button"
                      onClick={() => setStage('form')}
                      className="mono text-[11px] text-ink-3 hover:text-ember transition-colors uppercase tracking-wider"
                      data-cursor="hover"
                    >
                      ← Edit message
                    </button>
                    <span className="mono text-[11px] text-ink-3">
                      To · {profile.email}
                    </span>
                  </div>
                </motion.div>
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
      <label htmlFor={htmlFor} className="eyebrow text-ink-3 block mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
