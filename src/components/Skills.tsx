import { skills } from '../data/info'

const columns = [
  {
    title: 'Interface',
    names: ['React', 'TypeScript', 'JavaScript', 'Angular', 'HTML5', 'CSS3'],
  },
  {
    title: 'Engine',
    names: ['Node.js', 'Express.js', 'Python', 'Firebase', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Process',
    names: ['Git', 'GitHub', 'Docker', 'Figma', 'VS Code', 'Terminal'],
  },
]

const listed = new Set(columns.flatMap((column) => column.names))
const also = skills.filter((skill) => !listed.has(skill.name))
const byName = new Map(skills.map((skill) => [skill.name, skill]))

export function Skills() {
  const groups = [
    ...columns.map((column) => ({
      title: column.title,
      items: column.names.map((name) => byName.get(name)!),
    })),
    { title: 'Also', items: also },
  ]

  return (
    <section id="skills" className="toolkit-section grid-12 shell section">
      <h2 className="display">Toolkit</h2>
      <div className="toolkit-columns">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="label muted">{group.title}</h3>
            <ul>
              {group.items.map(({ name, icon: Icon }) => (
                <li key={name}>
                  <Icon aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
