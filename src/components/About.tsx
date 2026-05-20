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
              I’m a software engineer with a deep interest in
              <span className="display-italic text-ember"> well-made </span>
              interfaces and the
              <span className="display-italic"> data </span>
              that lives behind them. I build full-stack products end-to-end —
              from schema and infrastructure to the last detail of motion on screen —
              and I integrate
              <span className="display-italic text-ember"> AI </span>
              where it earns its place.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-4 text-ink-2 max-w-3xl">
            <p>
              My recent work spans rental platforms, e-commerce, social apps with
              interactive mapping, neural-network classifiers and NLP pipelines on
              transformer models. I move fluently between React, Angular and Python —
              and I care about shipping.
            </p>
            <p>
              I treat performance, accessibility and design as the same job.
              I write code that other people can read, and I build interfaces that
              feel inevitable, not decorated.
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
