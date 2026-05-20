import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  reverse?: boolean
  className?: string
}

export function Marquee({ children, reverse = false, className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap marquee-track"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
