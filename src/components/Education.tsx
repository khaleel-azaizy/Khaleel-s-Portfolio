import { FadeIn } from './RevealText'
import { education } from '../data/info'

export function Education() {
  return (
    <section id="education" className="relative">
      <div className="px-6 md:px-10 pt-20 md:pt-28 ">
        <div className="flex items-center justify-between eyebrow text-ink-3">
          <span>(04) — Studies</span>
        </div>
        <div className="hair my-6" />
      </div>

      <div className="px-6 md:px-10 pb-24 md:pb-36 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <FadeIn>
            <h2 className="font-display text-[clamp(38px,6vw,92px)] leading-[1.02] tracking-snug font-light">
              Trained in
              <span className="display-italic text-ember"> software, </span>
              shaped by
              <span className="display-italic"> data.</span>
            </h2>
          </FadeIn>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 space-y-6">
          {education.map((e, i) => (
            <FadeIn delay={0.1 + i * 0.1} key={i}>
              <article className="border-t border-ink/20 pt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl md:text-3xl tracking-snug">{e.degree}</h3>
                  <span className="mono text-[11px] text-ink-3 shrink-0">{e.period}</span>
                </div>
                <div className="eyebrow text-ink-3 mt-1">{e.school}</div>
                <p className="text-ink-2 mt-3 max-w-md">{e.notes}</p>
              </article>
            </FadeIn>
          ))}

          <FadeIn delay={0.4}>
            <div className="border-t border-ink/20 pt-5 mt-4">
              <h3 className="font-display text-2xl tracking-snug">Always studying</h3>
              <p className="text-ink-2 mt-2 max-w-md">
                Currently exploring transformer architectures, retrieval-augmented
                generation, and design engineering as a craft.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
