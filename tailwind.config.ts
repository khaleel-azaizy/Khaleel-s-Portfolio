import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        'paper-2': 'rgb(var(--c-paper-2) / <alpha-value>)',
        'paper-3': 'rgb(var(--c-paper-3) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--c-ink-3) / <alpha-value>)',
        ember: 'rgb(var(--c-ember) / <alpha-value>)',
        signal: 'rgb(var(--c-signal) / <alpha-value>)',
        alert: 'rgb(var(--c-alert) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Archivo"', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      /* Display scale — replaces the ad-hoc clamp() calls that were
         scattered across components. Line-height and tracking travel
         with the size so headings stay consistent between sections. */
      fontSize: {
        'display-xl': ['clamp(3.5rem, 10.5vw, 11rem)', { lineHeight: '0.86', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.75rem, 7.5vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(2rem, 4.4vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
        'display-sm': ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.14', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        snug: '-0.02em',
        'wide-mono': '0.08em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
