import { useSmoothScroll } from './hooks/useSmoothScroll'
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

type StageProps = {
  children: React.ReactNode
  dark?: boolean
  z: number
  flow?: boolean
}

/* Stage:
 *  - default: sticky — pins to top while the next stage rises and covers it.
 *  - flow:    relative — keeps z-stacking so it still rises over the previous
 *             sticky section, but allows tall content to scroll naturally.   */
function Stage({ children, dark = false, z, flow = false }: StageProps) {
  return (
    <div
      className={`${flow ? 'stack-flow' : 'stack-section'} ${dark ? 'theme-dark' : ''}`}
      style={{ zIndex: z }}
    >
      {children}
    </div>
  )
}

export default function App() {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Intro />
      <Cursor />
      <Navigation />

      <main className="relative">
        <Stage z={10}><Hero /></Stage>
        <Stage z={20} dark><About /></Stage>
        <Stage z={30} flow><Projects /></Stage>
        <Stage z={40} dark ><Skills /></Stage>
        <Stage z={50} ><Education /></Stage>
        <Stage z={60} dark><Contact /></Stage>
      </main>

      <Footer />
    </div>
  )
}
