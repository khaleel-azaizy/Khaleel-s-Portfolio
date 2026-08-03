import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useStageProgress } from './hooks/useStageProgress'
import { useIsMobile } from './hooks/useMediaQuery'
import { Cursor } from './components/Cursor'
import { Intro } from './components/Intro'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ContactForm } from './components/ContactForm'

type StageProps = {
  children: React.ReactNode
  /** Section ground. Each stage restates the paper ramp; everything inside it
   *  reads from those tokens, so the whole section follows. */
  tone: string
  z: number
  flow?: boolean
}

/* Stage:
 *  - default: sticky — pins to top while the next stage rises and covers it,
 *    receding as it goes (scale down + dim, both driven by scroll position).
 *  - flow:    relative — keeps z-stacking so it still rises over the previous
 *    sticky section, but allows tall content to scroll naturally. Flow stages
 *    are never covered, so they get no recede treatment.                     */
function Stage({ children, tone, z, flow = false }: StageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useStageProgress(ref, !flow)

  // transform + filter on the sticky element itself would create a containing
  // block and break `position: sticky` — hence the inner wrapper.
  const scale = useTransform(progress, [0, 1], [1, 0.94])
  const dim = useTransform(progress, [0, 0.9], [0, 0.55])

  return (
    <div
      ref={ref}
      className={`${flow ? 'stack-flow' : 'stack-section'} ${tone}`}
      style={{ zIndex: z }}
    >
      {flow ? (
        children
      ) : (
        <motion.div className="stage-inner" style={{ scale }}>
          {children}
          <motion.div className="stage-dim" aria-hidden style={{ opacity: dim }} />
        </motion.div>
      )}
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 320, damping: 40, mass: 0.3 })

  // The track gives the bar its own ground, so a crimson fill still reads while
  // the crimson section is pinned underneath it.
  return (
    <div aria-hidden className="fixed top-0 left-0 right-0 h-[2px] z-[78] bg-paper/60">
      <motion.div className="h-full bg-ember origin-left" style={{ scaleX }} />
    </div>
  )
}

export default function App() {
  useSmoothScroll()
  const isMobile = useIsMobile()
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <a href="#main" className="skip-link">Skip to content</a>

      <Intro />
      <Cursor />
      <ScrollProgress />
      <Navigation onContactClick={() => setContactOpen(true)} />

      <main id="main" className="relative">
        <Stage z={10} tone="stage-tint-0"><Hero /></Stage>
        <Stage z={20} tone="stage-tint-1"><About /></Stage>
        <Stage z={30} tone="stage-tint-2" flow><Projects /></Stage>
        {/* Skills is tall enough to overflow a pinned viewport on phones. */}
        <Stage z={40} tone="stage-tint-3" flow={isMobile}><Skills /></Stage>
        <Stage z={50} tone="stage-tint-4"><Education /></Stage>
        {/* The one inversion — crimson ground where the ask lands. */}
        <Stage z={60} tone="stage-invert"><Contact /></Stage>
      </main>

      <Footer />
      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
