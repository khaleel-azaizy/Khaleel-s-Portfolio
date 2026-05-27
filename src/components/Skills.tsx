import { motion } from 'framer-motion'
import { skills } from '../data/info'
import { Marquee } from './Marquee'
import { FadeIn } from './RevealText'

const groups = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend',  label: 'Backend' },
  { id: 'tools',    label: 'Toolkit' },
] as const

export function Skills() {
  return (
    <section id="skills" className="relative">
      {/* divider marquee */}
      <Marquee reverse className="py-4 border-y border-ink/15 bg-paper-2/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-display text-[24px] md:text-[56px] leading-none mx-5 md:mx-10 inline-flex items-center gap-5 md:gap-10 text-ink-2">
            {skills.slice(0, 7).map((s) => (
              <span key={s.name} className="inline-flex items-center gap-2 md:gap-3">
                <s.icon className="w-4 h-4 md:w-7 md:h-7 opacity-70" />
                {s.name}
              </span>
            ))}
          </span>
        ))}
      </Marquee>

      <div className="px-6 md:px-10 pt-20 ">
        <div className="flex items-center justify-between eyebrow text-ink-3">
          <span>(03) — Stack</span>
          <span className="mono">{skills.length} entries</span>
        </div>
        <div className="hair my-6" />

        <FadeIn>
          <h2 className="font-display text-[clamp(44px,8vw,128px)] leading-[0.95] tracking-snug font-light">
            What I work
            <span className="display-italic text-ember"> with.</span>
          </h2>
        </FadeIn>
      </div>

      <div className="px-6 md:px-10 mt-12 md:mt-16 pb-24 md:pb-32 space-y-14">
        {groups.map((g, gi) => {
          const items = skills.filter((s) => s.category === g.id)
          return (
            <motion.div key={g.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: gi * 0.025, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-6 border-t border-ink/15 pt-8">
              <div className="col-span-12 md:col-span-3 space-y-2">
                <div className="mono text-[11px] text-ink-3">
                  0{gi + 1} · {String(items.length).padStart(2, '0')}
                </div>
                <h3 className="font-display text-3xl md:text-4xl tracking-snug">{g.label}</h3>
              </div>
              <ul className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                {items.map((s, i) => (
                  
                  <div
                    key={s.name}
                    className="group flex items-center gap-3 py-2 border-b border-ink/10 hover:border-ember/60 transition-colors"
                  >
                    <s.icon className="w-5 h-5 text-ink-3 group-hover:text-ember transition-colors" />
                    <span className="font-display text-xl tracking-snug">{s.name}</span>
                  </div>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
