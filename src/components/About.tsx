import { FiArrowUpRight } from 'react-icons/fi'
import { education, profile } from '../data/info'

const principles = [
  {
    art: 'art-stack',
    title: 'One owner, every layer',
    text: 'I take a feature from the data model to the screen, so nothing gets lost between the backend and the interface.',
  },
  {
    art: 'art-users',
    title: 'Built around customers',
    text: 'Multilingual storefronts, admin dashboards, and installable apps, shaped by what people actually do.',
  },
  {
    art: 'art-data',
    title: 'Data where it helps',
    text: 'Machine learning and analysis from my degree, used when they make a product better rather than for show.',
  },
  {
    art: 'art-ship',
    title: 'Shipped, then improved',
    text: 'Launch is the start. Live products keep getting fixes and features after they go out.',
  },
]

export function About() {
  const degree = education[0]
  return (
    <section id="about" className="about-section grid-12 shell section">
      <h2 className="about-heading display">
        How I
        <br />
        work
      </h2>
      <div className="about-copy">
        <p>
          I'm Khaleel, a software engineer who likes seeing the whole picture:
          the interface someone touches, the systems that keep it running, and
          the small details that make it feel right.
        </p>
        <p>
          I build full-stack products with React, Node.js, and Firebase, and
          explore what data and AI can add to them. My favourite part is
          connecting those pieces into something people use.
        </p>
        <div className="education" id="education">
          <span>
            {degree.degree}, {degree.school}
          </span>
          <span className="muted tabular-nums">{degree.period}</span>
        </div>
        <a
          className="bracket"
          href={profile.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
          <FiArrowUpRight aria-hidden="true" />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
      <div className="principles">
        {principles.map((item) => (
          <article className="principle" key={item.title}>
            <div className={`principle-art ${item.art}`} aria-hidden="true" />
            <h3 className="label">
              <span className="marks" aria-hidden="true" />
              {item.title}
            </h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
