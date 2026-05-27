import { FadeIn } from './RevealText'
import { profile } from '../data/info'

export function About() {
  return (
    <section id="about" className="relative">
      <div className="px-6 md:px-10 pt-24 md:pt-32">
        <div className="flex items-center justify-between eyebrow text-ink-3">
          <span>(01) — About</span>
          <span className="mono">∗ Bio</span>
        </div>
        <div className="hair my-6" />
      </div>

      <div className="px-6 md:px-10 pb-24 md:pb-36 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Lede */}
        <div className="md:col-span-8">
          <FadeIn>
            <p className="font-display text-[clamp(28px,3.6vw,52px)] leading-[1.12] tracking-snug font-light">
              Software engineer building
              <span className="display-italic text-ember"> full-stack </span>
              products end-to-end, with
              <span className="display-italic"> data </span>
              and
              <span className="display-italic text-ember"> AI </span>
              where it earns its place.
            </p>
          </FadeIn>
        </div>

        {/* Sidebar facts */}
        <aside className="md:col-span-3 md:col-start-10 space-y-8 self-end">
          <Fact label="Based in" value={profile.location} />
          <Fact label="Focus" value="Full-stack · Data · AI" />
          <Fact label="Open to" value="Roles & Freelance" />
          <Fact label="Education" value="Kinneret Academic College" />
        </aside>
      </div>
    </section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <FadeIn delay={0.1} y={12}>
      <div>
        <div className="eyebrow text-ink-3 mb-1">{label}</div>
        <div className="font-display text-2xl tracking-snug">{value}</div>
      </div>
    </FadeIn>
  )
}
