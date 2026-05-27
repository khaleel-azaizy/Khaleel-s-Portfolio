import { useState } from 'react'

type Props = {
  value: string
  className?: string
  label?: string
}

export function CopyButton({ value, className = '', label = 'Copy' }: Props) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${value}`}
      className={`inline-flex items-center gap-1.5 mono text-[11px] uppercase tracking-wider text-ink-3 hover:text-ember transition-colors ${className}`}
      data-cursor="hover"
    >
      {copied ? (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 8 L 6.5 11.5 L 13 4.5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="1.4" />
            <path d="M3 11 V 3.4 A 1.4 1.4 0 0 1 4.4 2 H 10.5" />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}
