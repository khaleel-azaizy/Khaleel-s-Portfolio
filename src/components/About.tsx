import {
  FiArrowUpRight,
  FiBox,
  FiCode,
  FiLayers,
  FiMapPin,
} from 'react-icons/fi'
import { education, profile } from '../data/info'

export function About() {
  return (
    <section id="about" className="about-section section-shell">
      <div className="about-art">
        <div className="about-art-top">
          <span>A little about me</span>
          <FiCode aria-hidden="true" />
        </div>
        <div className="initials-art" aria-hidden="true">
          <span>k</span>
          <span>a</span>
          <i>✳</i>
        </div>
        <div className="about-art-bottom">
          <span>
            <FiMapPin />
            {profile.location}
          </span>
          <span>Curious by default.</span>
        </div>
      </div>
      <div className="about-content">
        <p className="section-kicker">The person behind the code</p>
        <h2>
          Curiosity first.
          <br />
          Craft, always.
        </h2>
        <p>
          I'm Khaleel, a software engineer who likes seeing the whole picture.
          The interface someone touches. The systems that keep it running. The
          little details that make it feel right.
        </p>
        <p>
          I build full-stack products with React, Node.js, and Firebase, and
          explore what data and AI can bring to the experience. My favorite part
          is connecting those pieces into something useful.
        </p>
        <div className="about-principles">
          <span>
            <FiLayers aria-hidden="true" />
            End-to-end thinking
          </span>
          <span>
            <FiBox aria-hidden="true" />
            Made for the real world
          </span>
        </div>
        <div className="education-note" id="education">
          <span className="education-icon" aria-hidden="true">
            ↗
          </span>
          <div>
            <h3>{education[0].degree}</h3>
            <p>
              {education[0].school} <span>2021–2025</span>
            </p>
          </div>
        </div>
        <a
          className="text-link"
          href={profile.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          More about me on LinkedIn <FiArrowUpRight />
        </a>
      </div>
    </section>
  )
}
