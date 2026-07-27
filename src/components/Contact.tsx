import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './RevealText'
import { profile } from '../data/info'

type CopyField = 'email' | 'phone' | null

export function Contact() {
  const [copied, setCopied] = useState<CopyField>(null)

  const copyToClipboard = async (text: string, field: Exclude<CopyField, null>) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
    }
    setCopied(field)
    window.setTimeout(() => setCopied(null), 1800)
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="px-6 md:px-10 pt-20 md:pt-28 pb-12">
        <div className="flex items-center justify-between eyebrow">
          <span>(05) — Contact</span>
          {profile.available && (
            <span className="inline-flex items-center gap-2 text-signal">
              <span className="live-dot" aria-hidden />
              Available for work
            </span>
          )}
        </div>
        <div className="hair my-6" />

        <div className="grid grid-cols-12 gap-8 md:gap-10 mt-8">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-display-lg font-medium text-ink">
              <span className="block">Have a brief?</span>
              <span className="block accent-word">Send it.</span>
            </h2>

            <FadeIn delay={0.2}>
              <div className="mt-10 inline-block relative">
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  aria-label={`Copy email ${profile.email}`}
                  className="group inline-flex items-center gap-3 md:gap-4 font-display text-lg sm:text-2xl md:text-5xl tracking-snug
                  border-b border-ink/40 pb-3 hover:border-ember transition-colors break-all text-left"
                  data-cursor="hover"
                >
                  <span className="emph">{profile.email}</span>
                  <span className="text-ember inline-flex translate-y-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied === 'email' ? (
                        <motion.svg
                          key="check"
                          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          width="0.9em"
                          height="0.9em"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M3 8 L 6.5 11.5 L 13 4.5" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="copy"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.25 }}
                          width="0.85em"
                          height="0.85em"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.4" />
                          <path d="M3 11 V 3.4 A 1.4 1.4 0 0 1 4.4 2 H 10.5" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </span>
                </button>

                <CopiedBadge show={copied === 'email'} />
              </div>
            </FadeIn>

          </div>

          <aside className="col-span-12 md:col-span-3 md:col-start-10 space-y-6 self-end">
            <div>
              <div className="eyebrow mb-1">Find me on</div>
              <ul className="space-y-2">
                {[
                  { label: 'GitHub', href: profile.github, external: true },
                  { label: 'LinkedIn', href: profile.linkedIn, external: true },
                ].map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      className="social-link link-arc font-display text-2xl"
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      data-cursor="hover"
                    >
                      {l.label}
                      <span className="social-arrow" aria-hidden>↗</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow mb-1">Phone</div>
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.phone.replace(/-/g, ''), 'phone')}
                  aria-label={`Copy phone ${profile.phone}`}
                  className="group link-arc font-display text-2xl inline-flex items-center gap-2"
                  data-cursor="hover"
                >
                  <span>{profile.phone}</span>
                  <span className="text-ember inline-flex">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied === 'phone' ? (
                        <motion.svg
                          key="check"
                          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M3 8 L 6.5 11.5 L 13 4.5" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="copy"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.25 }}
                          width="13"
                          height="13"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.4" />
                          <path d="M3 11 V 3.4 A 1.4 1.4 0 0 1 4.4 2 H 10.5" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </span>
                </button>

                <CopiedBadge show={copied === 'phone'} />
              </div>
            </motion.div>

          </aside>
        </div>

      </div>

      {/* Closing readout — mirrors the hero strip so the page opens and
          shuts on the same machine voice. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="border-t border-ink/15 mt-16 md:mt-24 px-6 md:px-10 py-4"
      >
        <div className="status-strip">
          <span>Replies within a day</span>
          <span className="sep">/</span>
          <span>{profile.location} · UTC+3</span>
          <span className="sep">/</span>
          <span>Open to roles &amp; freelance</span>
        </div>
      </motion.div>
    </section>
  )
}

function CopiedBadge({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-3 left-0 -translate-y-full mono text-[10px] uppercase tracking-[0.18em] inline-flex items-center gap-1.5 px-2 py-1 bg-ember text-paper rounded-sm shadow-md whitespace-nowrap pointer-events-none"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 8 L 6.5 11.5 L 13 4.5" />
          </svg>
          Copied to clipboard
        </motion.span>
      )}
    </AnimatePresence>
  )
}
