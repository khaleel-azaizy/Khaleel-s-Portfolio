import { useState } from 'react'
import {
  FiArrowUpRight,
  FiArrowRight,
  FiGlobe,
  FiPlus,
  FiCheck,
} from 'react-icons/fi'
import { projects, profile, type Project } from '../data/info'
import { projectDetails, type WorkCategory } from '../data/projectDetails'
import { Modal } from './Modal'

const featured = projects.filter((project) => project.tier === 'feature')
const workbench = projects.filter((project) => project.tier !== 'feature')
const filters = ['All', 'Web apps', 'AI & data', 'Systems'] as const
type Filter = (typeof filters)[number]

const previews: Record<
  string,
  { image: string; domain: string; theme: string; caption: string }
> = {
  '01': {
    image: '/images/aj-motors.webp',
    domain: 'aj-motors.site',
    theme: 'motors',
    caption: 'A smoother road to your next rental.',
  },
  '02': {
    image: '/images/baby-fashion.webp',
    domain: 'baby-fashion.site',
    theme: 'fashion',
    caption: 'Small clothes. A complete commerce experience.',
  },
}

export function Projects({ onContactClick }: { onContactClick: () => void }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const visible = workbench.filter(
    (project) =>
      filter === 'All' || projectDetails[project.num].category === filter,
  )

  return (
    <section id="projects" className="work-section section-shell">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Ideas, out in the world</p>
          <h2>
            Selected work<span className="heading-period">.</span>
          </h2>
        </div>
        <p>
          Real products, from front to back.
          <br />{' '}
          Built with care. Made to be used.
        </p>
      </div>

      <div className="featured-grid">
        {featured.map((project) => {
          const preview = previews[project.num]
          return (
            <article className="featured-project" key={project.num}>
              <button
                className={`project-visual ${preview.theme}`}
                onClick={() => setSelected(project)}
                aria-label={`Explore ${project.title}`}
              >
                <span className="project-visual-top">
                  <span className="live-badge">
                    <span className="status-dot" />
                    Live product
                  </span>
                  <span>{project.year}</span>
                </span>
                <span className="browser-frame">
                  <span className="browser-toolbar">
                    <span className="browser-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      <FiGlobe />
                      {preview.domain}
                    </span>
                    <FiPlus />
                  </span>
                  <img
                    src={preview.image}
                    alt={`${project.title} live website homepage`}
                    width="1280"
                    height="720"
                    loading="lazy"
                  />
                </span>
                <span className="visual-caption">{preview.caption}</span>
                <span className="project-open" aria-hidden="true">
                  <FiArrowUpRight />
                </span>
              </button>
              <div className="project-title-line">
                <button onClick={() => setSelected(project)}>
                  <h3>{project.title}</h3>
                </button>
                <a
                  className="icon-button project-external"
                  href={project.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} (opens in new tab)`}
                >
                  <FiArrowUpRight />
                </a>
              </div>
              <p className="project-summary">
                {project.num === '01'
                  ? 'A car rental platform connecting a multilingual storefront, real-time bookings, and inventory management.'
                  : 'An end-to-end shopping experience, from discovering the perfect outfit to checkout and order tracking.'}
              </p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          )
        })}
      </div>

      <div className="workbench">
        <div className="workbench-heading">
          <div>
            <h3>More from the workbench.</h3>
            <p>Apps, experiments, and a healthy dose of curiosity.</p>
          </div>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            My GitHub <FiArrowUpRight />
          </a>
        </div>
        <div
          className="work-filters"
          role="group"
          aria-label="Filter workbench projects"
        >
          {filters.map((item) => {
            const count =
              item === 'All'
                ? workbench.length
                : workbench.filter(
                    (p) => projectDetails[p.num].category === item,
                  ).length
            return (
              <button
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>{count}</span>
              </button>
            )
          })}
        </div>
        <p className="sr-only" role="status">
          {visible.length} {filter === 'All' ? '' : filter} projects shown
        </p>
        <div className="workbench-list">
          {visible.map((project) => {
            const Icon = project.icon
            const category: WorkCategory = projectDetails[project.num].category
            return (
              <button
                className="workbench-row"
                key={project.num}
                onClick={() => setSelected(project)}
                aria-label={`Explore ${project.title}`}
              >
                <span
                  className={`workbench-icon ${category === 'Web apps' ? 'web' : category === 'AI & data' ? 'data' : 'systems'}`}
                >
                  <Icon aria-hidden="true" />
                </span>
                <span className="workbench-name">
                  <span>{project.title}</span>
                  <span>{project.type}</span>
                </span>
                <span className="workbench-tech">
                  {project.tags.slice(0, 2).join(' / ')}
                </span>
                <span className="workbench-year">{project.year}</span>
                <span className="workbench-arrow" aria-hidden="true">
                  <FiArrowUpRight />
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        titleId="project-title"
        className="project-modal"
      >
        {selected && (
          <>
            <div className="project-dialog-heading">
              <p className="section-kicker">
                {selected.type} <span> / {selected.year}</span>
              </p>
              <h2 id="project-title">{selected.title}</h2>
              <div className="project-tags">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            {previews[selected.num] && (
              <img
                className="project-dialog-image"
                src={previews[selected.num].image}
                alt={`${selected.title} website preview`}
                width="1280"
                height="720"
              />
            )}
            <div className="project-dialog-body">
              <h3>The build</h3>
              <p>{selected.description}</p>
              <ul>
                {projectDetails[selected.num].features.map((feature) => (
                  <li key={feature}>
                    <FiCheck aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="project-dialog-links">
                {selected.links.map((link) => (
                  <a
                    key={link.url}
                    className="button button-dark"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label === 'Visit Site'
                      ? 'Visit live site'
                      : link.label === 'Source'
                        ? 'View source'
                        : link.label === 'Notebook'
                          ? 'Open notebook'
                          : `View ${link.label.toLowerCase()}`}
                    <FiArrowUpRight />
                  </a>
                ))}
                {selected.links.length === 0 && (
                  <p className="private-project-note">
                    This project isn't publicly linked. Get in touch to learn
                    more.
                  </p>
                )}
                <button
                  className="text-button"
                  onClick={() => {
                    setSelected(null)
                    onContactClick()
                  }}
                >
                  Let's talk about it <FiArrowRight />
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}
