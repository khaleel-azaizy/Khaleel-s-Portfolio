import { useState } from 'react'
import {
  FiArrowDown,
  FiArrowUp,
  FiCode,
  FiDatabase,
  FiTool,
} from 'react-icons/fi'
import { skills } from '../data/info'

const categories = [
  {
    id: 'frontend',
    title: 'The experience',
    subtitle: 'Interfaces that feel right.',
    icon: FiCode,
    names: ['React', 'TypeScript', 'JavaScript', 'Angular', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    title: 'The engine',
    subtitle: 'Solid foundations underneath.',
    icon: FiDatabase,
    names: ['Node.js', 'Express.js', 'Python', 'Firebase', 'MySQL', 'MongoDB'],
  },
  {
    id: 'tools',
    title: 'The process',
    subtitle: 'From the first commit to ship.',
    icon: FiTool,
    names: ['Git', 'GitHub', 'Docker', 'Figma', 'VS Code', 'Terminal'],
  },
]

export function Skills() {
  const [expanded, setExpanded] = useState(false)
  const remaining = skills.filter(
    (skill) =>
      !categories.some((category) => category.names.includes(skill.name)),
  )
  return (
    <section id="skills" className="skills-section section-shell">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Tools of the trade</p>
          <h2>
            My everyday toolkit<span className="heading-period">.</span>
          </h2>
        </div>
        <p>
          The right tool for the problem.
          <br />
          Always room to learn another.
        </p>
      </div>
      <div className="skills-columns">
        {categories.map((category) => (
          <div className="skill-category" key={category.id}>
            <category.icon className="category-icon" aria-hidden="true" />
            <h3>{category.title}</h3>
            <p>{category.subtitle}</p>
            <div className="skill-chips">
              {category.names.map((name) => {
                const skill = skills.find((item) => item.name === name)!
                return (
                  <span key={name}>
                    <skill.icon aria-hidden="true" />
                    {name}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="more-tools">
        <button
          className="text-button"
          aria-expanded={expanded}
          aria-controls="additional-tools"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'A little less' : 'A few more in the toolbox'}
          {expanded ? <FiArrowUp /> : <FiArrowDown />}
        </button>
        <div id="additional-tools" hidden={!expanded}>
          <div className="skill-chips">
            {remaining.map(({ name, icon: Icon }) => (
              <span key={name}>
                <Icon aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
