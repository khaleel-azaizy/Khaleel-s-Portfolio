import { Clock } from './Clock'
import { profile } from '../data/info'

export function Footer() {
  return (
    <footer className="relative border-t border-ink/20 px-6 md:px-10 py-10">
      {/* Massive last word */}
      <div className="mb-12 select-none">
        <div className="font-display text-[clamp(120px,32vw,520px)] leading-[0.78] tracking-tightest font-light text-ink">
          AZ<span className="display-italic text-ember">.</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 eyebrow text-ink-3">
        <div className="col-span-6 md:col-span-4 space-y-1">
          <div>Local</div>
          <div className="text-ink-2"><Clock /> · {profile.location}</div>
        </div>
        <div className="col-span-6 md:col-span-4 space-y-1">
          <div>Elsewhere</div>
          <a className="block link-arc text-ink-2" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="block link-arc text-ink-2" href={profile.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a className="block link-arc text-ink-2" href={`mailto:${profile.email}`}>Gmail ↗</a>
        </div>
        <div className="col-span-12 md:col-span-4 space-y-1 md:text-right">
          <div className="text-ink-2">© {new Date().getFullYear()} Khaleel Azaizy</div>
        </div>
      </div>
    </footer>
  )
}
