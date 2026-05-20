import { FadeIn, RevealLine } from './RevealText'
import { profile } from '../data/info'
import { Marquee } from './Marquee'

export function Contact() {
  return (
    <section id="contact" className="relative">
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

      <div className="px-6 md:px-10 pt-20 md:pt-28 pb-12">
        <div className="flex items-center justify-between eyebrow text-ink-3">
          <span>(05) — Contact</span>
          <span className="mono">∗ Open inbox</span>
        </div>
        <div className="hair my-6" />

        <div className="grid grid-cols-12 gap-8 md:gap-10 mt-8">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display leading-[0.95] tracking-snug font-light">
              <span className="block text-[clamp(44px,8vw,128px)]">
                <RevealLine>
                  <span>Have a brief?</span>
                </RevealLine>
              </span>
              <span className="block text-[clamp(44px,8vw,128px)] display-italic text-ember">
                <RevealLine delay={0.12}>
                  <span>Send it.</span>
                </RevealLine>
              </span>
            </h2>

            <FadeIn delay={0.2}>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-10 inline-flex items-center gap-4 font-display text-3xl md:text-5xl tracking-snug border-b border-ink/40 pb-3 hover:border-ember transition-colors"
                data-cursor="hover"
              >
                <span className="display-italic">{profile.email}</span>
                <span className="text-ember translate-y-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                  ↗
                </span>
              </a>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-8 text-ink-2 max-w-xl">
                Available for full-stack roles, freelance briefs, and AI-integrated
                product work. Replies usually within a day or two.
              </p>
            </FadeIn>
          </div>

          <aside className="col-span-12 md:col-span-3 md:col-start-10 space-y-6 self-end">
            <div>
              <div className="eyebrow text-ink-3 mb-1">Find me on</div>
              <ul className="space-y-2">
                <li>
                  <a className="link-arc font-display text-2xl" href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                    GitHub
                  </a>
                </li>
                <li>
                  <a className="link-arc font-display text-2xl" href={`mailto:${profile.email}`} data-cursor="hover">
                    Email
                  </a>
                </li>
                <li>
                  <a className="link-arc font-display text-2xl" href={profile.linkedIn} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="eyebrow text-ink-3 mb-1">Currently</div>
              <div className="font-display text-2xl flex items-center gap-2">
                <span className="pulse-dot" />
                Open to work
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
