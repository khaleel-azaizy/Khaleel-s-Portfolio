import { profile } from '../data/info'

/* Three bands of tape crossing the page. They repeat what the hero already
   says, so the whole block is hidden from assistive technology. */
const bands: string[][] = [
  [
    'Full-stack engineer',
    'React / Node.js / Firebase / Python',
    'Two products live',
    profile.available ? 'Open to roles' : 'Based in Israel',
  ],
  [
    'From the interface to the database',
    'B.Sc. Software Engineering',
    'Web apps',
    'Data & machine learning',
  ],
  [
    'Building products that ship',
    `Based in ${profile.location}`,
    'Multilingual storefronts',
    'Admin dashboards',
  ],
]

export function Tapes() {
  return (
    <div className="tapes" aria-hidden="true">
      {bands.map((items, band) => {
        // Repeat enough to overfill the band, then once more so the loop
        // can slide by exactly half its width without a visible seam.
        const run = [...items, ...items, ...items]
        return (
          <div className="tape" key={band}>
            <div className="tape-track">
              {[...run, ...run].map((item, index) => (
                <span className="tape-item" key={index}>
                  <span className="marks" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
