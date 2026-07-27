import { motion } from 'framer-motion'
import { skills } from '../data/info'
import { FadeIn } from './RevealText'

const groups = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend',  label: 'Backend' },
  { id: 'tools',    label: 'Toolkit' },
] as const

export function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="px-6 md:px-10 pt-20 md:pt-28">
        <div className="flex items-center justify-between eyebrow">
          <span>(03) — Stack</span>
          <span className="mono">{skills.length} entries</span>
        </div>
        <div className="hair my-6" />

        <FadeIn>
          <h2 className="font-display text-display-lg font-medium text-ink">
            What I work <span className="accent-word">with.</span>
          </h2>
        </FadeIn>
      </div>

      <div className="px-6 md:px-10 mt-12 md:mt-16 pb-24 md:pb-32 space-y-14">
        {groups.map((g, gi) => {
          const items = skills.filter((s) => s.category === g.id)
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: gi * 0.025, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-12 gap-6 border-t border-ink/15 pt-8"
            >
              <div className="col-span-12 md:col-span-3 space-y-2">
                <div className="mono text-[11px] text-ink-3 tabular-nums">
                  0{gi + 1} · {String(items.length).padStart(2, '0')}
                </div>
                <h3 className="font-display text-3xl md:text-4xl tracking-snug text-ink">
                  {g.label}
                </h3>
              </div>

              <ul className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
                {items.map((s) => (
                  <li
                    key={s.name}
                    className="group flex items-center gap-3 py-2 border-b border-ink/10 hover:border-ember/60 transition-colors"
                  >
                    <s.icon className="w-5 h-5 text-ink-3 group-hover:text-ember transition-colors" />
                    <span className="font-display text-xl tracking-snug text-ink">{s.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
