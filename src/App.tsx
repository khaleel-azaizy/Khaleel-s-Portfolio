import { useCallback, useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ContactForm } from './components/ContactForm'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = useCallback(() => setContactOpen(true), [])
  const closeContact = useCallback(() => setContactOpen(false), [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation onContactClick={openContact} />
      <main id="main">
        <Hero onContactClick={openContact} />
        <Projects onContactClick={openContact} />
        <About />
        <Skills />
        <Contact onContactClick={openContact} />
      </main>
      <Footer />
      <ContactForm open={contactOpen} onClose={closeContact} />
    </>
  )
}
