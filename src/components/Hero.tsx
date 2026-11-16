import { useRef, type PointerEvent } from 'react'
import { FiArrowDown, FiArrowUpRight, FiCode, FiMapPin } from 'react-icons/fi'
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa'
import { SiTypescript, SiFirebase } from 'react-icons/si'
import { profile } from '../data/info'

const technologies = [
  { name: 'React', icon: FaReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Python', icon: FaPython },
]

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  const artRef = useRef<HTMLDivElement>(null)

  const moveArtwork = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const box = event.currentTarget.getBoundingClientRect()
    artRef.current?.style.setProperty(
      '--art-x',
      `${((event.clientX - box.left) / box.width - 0.5) * 14}px`,
    )
    artRef.current?.style.setProperty(
      '--art-y',
      `${((event.clientY - box.top) / box.height - 0.5) * 14}px`,
    )
  }

  const resetArtwork = () => {
    artRef.current?.style.setProperty('--art-x', '0px')
    artRef.current?.style.setProperty('--art-y', '0px')
  }

  return (
    <section id="home" className="hero-section">
      <div
        className="hero-panel"
        onPointerMove={moveArtwork}
        onPointerLeave={resetArtwork}
      >
        <div className="hero-content">
          <p className="hero-intro">
            <span className="little-spark" aria-hidden="true">
              ✳
            </span>{' '}
            Hey, I'm Khaleel
          </p>
          <h1>
            Good ideas.
            <br />
            Built well.
          </h1>
          <p className="hero-description">
            A software engineer turning complex problems into thoughtful digital
            experiences. From the interface to everything underneath.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              Explore my work <FiArrowDown />
            </a>
            <button className="text-button" onClick={onContactClick}>
              Let's talk <FiArrowUpRight />
            </button>
          </div>
          <div className="hero-specialties">
            <FiCode aria-hidden="true" />
            <span>
              Full-stack development{' '}
              <span className="specialty-divider">/</span> Data & AI
            </span>
          </div>
        </div>
        <div className="hero-art" ref={artRef}>
          <img
            src="/images/code-sculpture.webp"
            alt=""
            width="1254"
            height="1254"
            className="code-sculpture"
          />
          <div className="art-note art-note-top">
            <span className="status-dot" />
            Thoughtfully engineered.
          </div>
          <div className="art-note art-note-bottom">
            <span className="note-symbol" aria-hidden="true">
              ↳
            </span>{' '}
            From idea to live.
          </div>
        </div>
        <div className="hero-baseline">
          <span>
            <FiMapPin aria-hidden="true" /> Based in {profile.location}
          </span>
          <a href="#projects">
            A little further down <FiArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="technology-strip">
        <p>
          Good tools.
          <br />
          <span>Better possibilities.</span>
        </p>
        <div className="technology-logos">
          {technologies.map(({ name, icon: Icon }) => (
            <span key={name}>
              <Icon aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
