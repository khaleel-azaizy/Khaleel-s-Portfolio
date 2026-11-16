import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { projects, type Project } from '../data/info'
import { projectDetails } from '../data/projectDetails'
import { Modal } from './Modal'

const featured = projects.filter((project) => project.tier === 'feature')
const filters = ['All', 'Web apps', 'AI & data', 'Systems'] as const
type Filter = (typeof filters)[number]

const previews: Record<
  string,
  { image: string; domain: string; summary: string }
> = {
  '01': {
    image: '/images/aj-motors.webp',
    domain: 'aj-motors.site',
    summary:
      'A car rental platform connecting a multilingual storefront, real-time bookings, and inventory management.',
  },
  '02': {
    image: '/images/baby-fashion.webp',
    domain: 'baby-fashion.site',
    summary:
      'An end-to-end shopping experience, from finding the right outfit to checkout and order tracking.',
  },
}

const linkLabel = (label: string) =>
  label === 'Visit Site'
    ? 'Visit live site'
    : label === 'Source'
      ? 'View source'
      : label === 'Notebook'
        ? 'Open notebook'
        : `View ${label.toLowerCase()}`

export function Projects({ onContactClick }: { onContactClick: () => void }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const visible = projects.filter(
    (project) =>
      filter === 'All' || projectDetails[project.num].category === filter,
  )

  return (
    <section id="projects">
      <div className="work-intro grid-12 shell section">
        <h2 className="work-statement display">
          Built to be used, not just looked at.
        </h2>
        <div className="work-lede">
          <span className="marks" aria-hidden="true" />
          <p>
            I work end to end: data model, API, interface, and deployment. Two
            of these products are live and used by real customers today.
          </p>
          <a className="bracket" href="#work-index">
            Every project
          </a>
        </div>
        <div className="featured-grid">
          {featured.map((project) => {
            const preview = previews[project.num]
            return (
              <article className="featured" key={project.num}>
                <button
                  className="frame"
                  onClick={() => setSelected(project)}
                  aria-label={`Read about ${project.title}`}
                >
                  <img
                    src={preview.image}
                    alt=""
                    width="1280"
                    height="720"
                    loading="lazy"
                  />
                </button>
                <div className="featured-caption">
                  <h3>
                    <button onClick={() => setSelected(project)}>
                      {project.title}
                    </button>
                  </h3>
                  <span className="label">
                    <span className="mark" aria-hidden="true" /> Live
                  </span>
                  <p>{preview.summary}</p>
                  <a
                    className="bracket"
                    href={project.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {preview.domain}
                    <FiArrowUpRight aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div id="work-index" className="work-index shell section">
        <div className="index-head">
          <h2 className="display">
            Selected work<sup>({projects.length})</sup>
          </h2>
          <div
            className="index-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => {
              const count =
                item === 'All'
                  ? projects.length
                  : projects.filter(
                      (p) => projectDetails[p.num].category === item,
                    ).length
              return (
                <button
                  key={item}
                  className="bracket"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item} <span>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
        <p className="sr-only" role="status">
          {visible.length} {filter === 'All' ? '' : filter} projects shown
        </p>
        <div className="index-columns label" aria-hidden="true">
          <span>Project</span>
          <span>Type</span>
          <span className="index-stack">Built with</span>
          <span>Year</span>
          <span>Status</span>
        </div>
        <ul className="index-list">
          {visible.map((project) => (
            <li key={project.num}>
              <button
                className="index-row"
                onClick={() => setSelected(project)}
                aria-label={`${project.title}, ${project.type}, ${project.year}${project.live ? ', live' : ''}. Read more`}
              >
                <span className="index-title">{project.title}</span>
                <span className="index-type">{project.type}</span>
                <span className="index-stack muted">
                  {project.tags.slice(0, 3).join(', ')}
                </span>
                <span className="index-year muted tabular-nums">
                  {project.year}
                </span>
                <span className="index-status label">
                  {project.live ? (
                    <>
                      <span className="mark" aria-hidden="true" /> Live
                    </>
                  ) : (
                    <span className="muted">
                      {project.links.length ? 'Code' : 'Private'}
                    </span>
                  )}
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        titleId="project-title"
        className="project-modal"
      >
        {selected && (
          <>
            <p className="dialog-meta label muted">
              <span className="marks" aria-hidden="true" />
              {selected.type}, {selected.year}
            </p>
            <h2 id="project-title">{selected.title}</h2>
            <ul className="tag-list" aria-label="Built with">
              {selected.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {previews[selected.num] && (
              <img
                className="project-dialog-image"
                src={previews[selected.num].image}
                alt={`${selected.title} homepage`}
                width="1280"
                height="720"
              />
            )}
            <div className="project-dialog-body">
              <h3 className="label">What it does</h3>
              <p>{selected.description}</p>
              <ul>
                {projectDetails[selected.num].features.map((feature) => (
                  <li key={feature}>
                    <span className="mark" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="project-dialog-links">
                {selected.links.map((link) => (
                  <a
                    key={link.url}
                    className="button button-solid"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkLabel(link.label)}
                    <FiArrowUpRight aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                ))}
                {selected.links.length === 0 && (
                  <p className="private-project-note">
                    The code for this project isn't public. Ask me about it
                    and I'll walk you through it.
                  </p>
                )}
                <button
                  className="bracket"
                  onClick={() => {
                    setSelected(null)
                    onContactClick()
                  }}
                >
                  Ask about this project
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}

