import {
  FaMobileAlt, FaCar, FaGlobe, FaBrain, FaHeartbeat, FaPlug, FaFlask, FaComments,
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, FaBootstrap, FaNodeJs, FaPython, FaJava, FaPhp,
  FaFire, FaGitAlt, FaGithub, FaDocker, FaNpm, FaTerminal,FaBaby,
} from 'react-icons/fa'
import { SiTypescript, SiExpress, SiMongodb, SiMysql, SiFigma } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import type { IconType } from 'react-icons'

export type SectionId = 'home' | 'about' | 'projects' | 'skills' | 'education' | 'contact'

export const sections: { id: SectionId; label: string; index: string }[] = [
  { id: 'home',      label: 'Index',     index: '00' },
  { id: 'about',     label: 'About',     index: '01' },
  { id: 'projects',  label: 'Work',      index: '02' },
  { id: 'skills',    label: 'Stack',     index: '03' },
  { id: 'education', label: 'Studies',   index: '04' },
  { id: 'contact',   label: 'Contact',   index: '05' },
]

/** Weight a project carries on the page.
 *  - feature:  shipped, commercial, real users — gets a full card
 *  - selected: substantial personal or course work — gets a full row
 *  - index:    coursework and experiments — gets a compact archive line   */
export type ProjectTier = 'feature' | 'selected' | 'index'

export type Project = {
  num: string
  title: string
  type: string
  year: string
  description: string
  tags: string[]
  icon: IconType
  /** Accents are tuned for the near-black ground: saturated and luminous,
   *  used as a radial wash and a rule. Amber belongs to the flagship. */
  accent: string
  tier: ProjectTier
  /** Deployed and serving real traffic. Drives the cyan LIVE chip. */
  live?: boolean
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'AJ Motors',
    type: 'Car Rental Platform',
    year: '2025',
    description:
      'A dual-application rental platform — customer storefront and admin dashboard — with multilingual support, real-time booking flow, and Firebase-backed inventory.',
    tags: ['React', 'Vite', 'Firebase', 'PWA', 'i18n'],
    icon: FaCar,
    accent: '#EA4429',
    tier: 'feature',
    live: true,
    links: [{ label: 'Visit Site', url: 'https://aj-motors.site/' }],
  },
  {
  num: '02',
  title: 'Baby Fashion',
  type: 'E-Commerce Platform',
  year: '2025',
  description:
    'A dual-application baby clothing store — customer storefront and admin dashboard — with multilingual support, cart and checkout flow, order tracking with estimated delivery, and Firebase-backed product, image, and inventory management.',
  tags: ['React', 'Vite', 'Firebase', 'Three.js', 'i18n'],
  icon: FaBaby,
  accent: '#E8639B',
  tier: 'feature',
  live: true,
  links: [{ label: 'Visit Site', url: 'https://baby-fashion.site/' }],
 },
  {
    num: '03',
    title: 'Daily Habits Tracker',
    type: 'Full-Stack PWA',
    year: '2024',
    description:
      'Habit tracking with yearly and monthly calendar grids, streak analytics, and offline-first sync. Installable on mobile and desktop.',
    tags: ['React', 'Vite', 'Firebase', 'PWA'],
    icon: FaMobileAlt,
    accent: '#38C6A0',
    tier: 'selected',
    links: [{ label: 'Source', url: 'https://github.com/khaleel-azaizy/Daily-Habit-Tracker' }],
  },
  {
    num: '04',
    title: 'Travel Diary',
    type: 'Social Platform',
    year: '2024',
    description:
      'A travelers’ social network with interactive maps, geotagged photo galleries, and a SQL-backed Express API.',
    tags: ['Angular', 'Express', 'SQL', 'Leaflet.js'],
    icon: FaGlobe,
    accent: '#8B7CF6',
    tier: 'selected',
    links: [
      { label: 'Frontend', url: 'https://github.com/khaleel-azaizy/webDevelopment_Travel-Diary' },
      { label: 'Backend', url: 'https://github.com/khaleel-azaizy/webDevelopment_Travel-Diary-server' },
    ],
  },
  {
    num: '05',
    title: 'Income Classifier',
    type: 'Neural Network',
    year: '2024',
    description:
      'A PyTorch ANN reaching 85% accuracy on income-bracket prediction from US Census data. Includes feature engineering and training notebook.',
    tags: ['Python', 'PyTorch', 'Pandas', 'Scikit-learn'],
    icon: FaBrain,
    accent: '#4F9CF0',
    tier: 'selected',
    links: [{ label: 'Notebook', url: 'https://colab.research.google.com/drive/1iGGvt2jLmkD2pvvzmB9UGclbOle-PbnY' }],
  },
  {
    num: '06',
    title: 'Vitals Simulator',
    type: 'Healthcare IoT',
    year: '2024',
    description:
      'Simulated patient vitals streamed in real time with anomaly detection, visualizations, and threshold-based alerting.',
    tags: ['Python', 'Matplotlib', 'IoT'],
    icon: FaHeartbeat,
    accent: '#FF8A3D',
    tier: 'index',
    links: [{ label: 'Notebook', url: 'https://colab.research.google.com/drive/1ysOhiV-WObB7A5XS57omxPijnWvrYH1n' }],
  },
  {
    num: '07',
    title: 'TCP/UDP File Transfer',
    type: 'Network Programming',
    year: '2023',
    description:
      'Java client–server file transfer over both TCP and UDP with throughput and reliability comparisons.',
    tags: ['Java', 'TCP', 'UDP', 'Networking'],
    icon: FaPlug,
    accent: '#2FB3A8',
    tier: 'index',
    links: [],
  },
  {
    num: '08',
    title: 'ML Lab',
    type: 'Academic Research',
    year: '2024',
    description:
      'A working notebook of supervised and unsupervised algorithms — regression, clustering, dimensionality reduction — built up across coursework.',
    tags: ['Python', 'Scikit-learn', 'NumPy', 'Jupyter'],
    icon: FaFlask,
    accent: '#C0A15E',
    tier: 'index',
    links: [],
  },
  {
    num: '09',
    title: 'NLP Final Project',
    type: 'Language Models',
    year: '2025',
    description:
      'Text classification and sentiment analysis built on transformer architectures. Evaluation pipeline included.',
    tags: ['Python', 'Transformers', 'PyTorch', 'NLP'],
    icon: FaComments,
    accent: '#6FCF5C',
    tier: 'index',
    links: [],
  },
]

export type Skill = { name: string; category: 'frontend' | 'backend' | 'tools'; icon: IconType }

export const skills: Skill[] = [
  { name: 'HTML5',       category: 'frontend', icon: FaHtml5 },
  { name: 'CSS3',        category: 'frontend', icon: FaCss3Alt },
  { name: 'JavaScript',  category: 'frontend', icon: FaJs },
  { name: 'TypeScript',  category: 'frontend', icon: SiTypescript },
  { name: 'React',       category: 'frontend', icon: FaReact },
  { name: 'Angular',     category: 'frontend', icon: FaAngular },
  { name: 'Bootstrap',   category: 'frontend', icon: FaBootstrap },
  { name: 'Node.js',     category: 'backend',  icon: FaNodeJs },
  { name: 'Express.js',  category: 'backend',  icon: SiExpress },
  { name: 'Python',      category: 'backend',  icon: FaPython },
  { name: 'Java',        category: 'backend',  icon: FaJava },
  { name: 'PHP',         category: 'backend',  icon: FaPhp },
  { name: 'MongoDB',     category: 'backend',  icon: SiMongodb },
  { name: 'MySQL',       category: 'backend',  icon: SiMysql },
  { name: 'Firebase',    category: 'backend',  icon: FaFire },
  { name: 'Git',         category: 'tools',    icon: FaGitAlt },
  { name: 'GitHub',      category: 'tools',    icon: FaGithub },
  { name: 'Docker',      category: 'tools',    icon: FaDocker },
  { name: 'VS Code',     category: 'tools',    icon: VscCode },
  { name: 'Figma',       category: 'tools',    icon: SiFigma },
  { name: 'NPM',         category: 'tools',    icon: FaNpm },
  { name: 'Terminal',    category: 'tools',    icon: FaTerminal },
]

export const education = [
  {
    degree: 'B.Sc. Software Engineering',
    school: 'Kinneret Academic College',
    period: '2021 — 2025',
    notes: 'Full-stack development, data analytics, machine learning, NLP, and networks.',
  },
]

export const profile = {
  name: 'Khaleel Azaizy',
  role: 'Software Engineer',
  location: 'Israel',
  email: 'khaleelazaizy@gmail.com',
  phone: '054-658-5424',
  github: 'https://github.com/khaleel-azaizy',
  linkedIn: 'https://linkedin.com/in/khaleel-azaizy',
  pitch:
    'I build full-stack products with a strong foundation in data and AI — clean architecture, fast interfaces, and ideas that actually ship.',
  available: true,
}
