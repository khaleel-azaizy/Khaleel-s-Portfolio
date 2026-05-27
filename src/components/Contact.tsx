import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './RevealText'
import { profile } from '../data/info'
import { Marquee } from './Marquee'

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
      {/* Decorative rotating asterisk */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[28%] hidden md:block select-none"
      >
        <span className="font-display block text-[200px] lg:text-[280px] leading-none text-ember/20 spin-slow">
          ✱
        </span>
      </div>

      <Marquee className="py-4 md:py-6 border-y border-ink/15">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-[30px] md:text-[72px] leading-none mx-5 md:mx-10 inline-flex items-center gap-4 md:gap-8 text-ink"
          >
            Let’s build
            <span className="display-italic text-ember">something</span>
            <span className="text-ink-3">✦</span>
          </span>
        ))}
      </Marquee>

      <div className="px-6 md:px-10 pt-20 pb-12">
        <div className="flex items-center justify-between eyebrow text-ink-3">
          <span>(05) — Contact</span>
        </div>
        <div className="hair my-6" />

        <div className="grid grid-cols-12 gap-8 md:gap-10 mt-8">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display leading-[0.95] tracking-snug font-light">
              <span className="block text-[clamp(44px,8vw,128px)] ">
                  <span>Have a brief?</span>
              </span>
              <span className="block text-[clamp(44px,8vw,128px)] display-italic text-ember">
                  <span>Send it.</span>
              </span>
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
                  <span className="display-italic">{profile.email}</span>
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
              <div className="eyebrow text-ink-3 mb-1">Find me on</div>
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
              <div className="eyebrow text-ink-3 mb-1">Phone</div>
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

        {/* Quick facts row */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
         
        </div>
      </div>

      {/* Bottom signature marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="border-t border-ink/15"
      >
        <Marquee reverse className="py-4 pt-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[24px] md:text-[48px] leading-none mx-6 md:mx-10 inline-flex items-center gap-4 md:gap-8 text-ink-2"
            >
              Currently available
              <span className="display-italic text-ember">— Q3 2026</span>
              <span className="text-ink-3">✦</span>
            </span>
          ))}
        </Marquee>
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
