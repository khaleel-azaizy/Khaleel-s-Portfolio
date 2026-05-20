import { RevealLine } from './RevealText'

type Props = {
  index: string
  label: string
  title: string
  italicWord?: string
}

export function SectionHeader({ index, label, title, italicWord }: Props) {
  const words = title.split(' ')
  return (
    <div className="px-6 md:px-10 pt-24 md:pt-32">
      <div className="flex items-center justify-between eyebrow text-ink-3">
        <span>({index}) — {label}</span>
        <span className="hidden md:inline">⌐ Scroll</span>
      </div>
      <div className="hair my-6" />
      <h2 className="font-display text-ink leading-[0.95] tracking-snug text-[clamp(44px,8vw,128px)] font-light">
        {words.map((w, i) => (
          <span key={i} className="reveal-line">
            <RevealLine delay={0.05 * i}>
              <span className={italicWord && w.toLowerCase().startsWith(italicWord.toLowerCase()) ? 'display-italic text-ember pr-2' : 'pr-2'}>
                {w}
              </span>
            </RevealLine>
          </span>
        ))}
      </h2>
    </div>
  )
}
