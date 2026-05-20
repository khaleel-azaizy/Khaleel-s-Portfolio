import { 
    FaHome, FaUser, FaCode, FaCogs, FaGraduationCap, FaEnvelope,
    FaMobileAlt, FaCar, FaGlobe, FaBrain, FaHeartbeat, FaPlug, FaFlask, FaComments,
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaAngular, FaBootstrap, FaNodeJs, FaPython, FaJava, FaPhp,
    FaDatabase, FaFire, FaGitAlt, FaGithub, FaDocker, FaNpm, FaTerminal
} from 'react-icons/fa'
import { SiTypescript, SiExpress, SiMongodb, SiMysql, SiFigma } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

export const sections = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'about', label: 'About', icon: '◈' },
    { id: 'projects', label: 'Projects', icon: '◲' },
    { id: 'skills', label: 'Skills', icon: '⬡' },
    { id: 'education', label: 'Education', icon: '◆' },
    { id: 'contact', label: 'Contact', icon: '✉' },
]

export const projects = [
    {
        title: 'Daily Habits Tracker',
        type: 'Full-Stack PWA',
        description: 'A comprehensive web application for tracking daily habits and events with yearly/monthly calendar views.',
        tags:['React', 'Vite', 'Firebase', 'PWA'],
        icon: FaMobileAlt,
        gradient: 'gradient-emerald',
        links: [{ label: 'View Code', url: 'https://github.com/khaleel-azaizy/Daily-Habit-Tracker', icon: '⟨/⟩' }]
    },
    {
        title: 'Baby Fashion Store',
        type: 'Full-Stack PWA',
        description: 'A comprehensive online store for baby fashion items with a modern design and seamless shopping experience.',
        tags: ['React', 'Vite', 'Firebase', 'PWA'],
        icon: FaMobileAlt,
        gradient: 'gradient-emerald',
        links: [{ label: 'View Code', url: 'https://github.com/khaleel-azaizy/Baby-Fashion', icon: '⟨/⟩' }]
    },
    {
        title: 'AJ Motors - Car Rental',
        type: 'Dual-Application Platform',
        description: 'A comprehensive car rental platform with customer app and admin dashboard featuring multi-language support.',
        tags: ['React', 'Vite', 'Firebase', 'PWA'],
        icon: FaCar,
        gradient: 'gradient-ocean',
        links: [{ label: 'Live Demo', url: 'https://aj-motors.site/', icon: '↗' }]
    },
    {
        title: 'Travel Diary Platform',
        type: 'Social Platform',
        description: 'A full-stack social platform for travelers to share experiences with interactive maps and photo galleries.',
        tags: ['Angular', 'Express', 'SQL', 'Leaflet.js'],
        icon: FaGlobe,
        gradient: 'gradient-sunset',
        links: [
            { label: 'Frontend', url: 'https://github.com/khaleel-azaizy/webDevelopment_Travel-Diary', icon: '⟨/⟩' },
            { label: 'Backend', url: 'https://github.com/khaleel-azaizy/webDevelopment_Travel-Diary-server', icon: '⟨/⟩' }
        ]
    },
    {
        title: 'Income Classification ANN',
        type: 'Neural Network',
        description: 'PyTorch neural network achieving 85% accuracy in classifying income brackets from census data.',
        tags: ['Python', 'PyTorch', 'Pandas', 'Scikit-learn'],
        icon: FaBrain,
        gradient: 'gradient-purple',
        links: [{ label: 'View Notebook', url: 'https://colab.research.google.com/drive/1iGGvt2jLmkD2pvvzmB9UGclbOle-PbnY', icon: '◈' }]
    },
    {
        title: 'Medical Sensor Simulation',
        type: 'Healthcare IoT',
        description: 'Simulated patient vitals with real-time alerts, visualizations, and anomaly detection for healthcare monitoring.',
        tags: ['Python', 'Matplotlib', 'IoT'],
        icon: FaHeartbeat,
        gradient: 'gradient-rose',
        links: [{ label: 'View Code', url: 'https://colab.research.google.com/drive/1ysOhiV-WObB7A5XS57omxPijnWvrYH1n', icon: '◈' }]
    },
    {
        title: 'TCP/UDP File Transfer',
        type: 'Network Programming',
        description: 'Client-server file transfer application implementing both TCP and UDP protocols with performance comparison.',
        tags: ['Java', 'TCP', 'UDP', 'Networking'],
        icon: FaPlug,
        gradient: 'gradient-cyan',
        links: []
    },
    {
        title: 'ML Lab Exercises',
        type: 'Academic Research',
        description: 'Comprehensive collection of ML algorithms and techniques including supervised and unsupervised learning.',
        tags: ['Python', 'Scikit-learn', 'NumPy', 'Jupyter'],
        icon: FaFlask,
        gradient: 'gradient-amber',
        links: []
    },
    {
        title: 'NLP Final Project',
        type: 'Natural Language Processing',
        description: 'Advanced NLP project implementing text classification and sentiment analysis with transformer models.',
        tags: ['Python', 'Transformers', 'PyTorch', 'NLP'],
        icon: FaComments,
        gradient: 'gradient-mint',
        links: []
    }
]

export const skills = [
    { name: 'HTML5', category: 'frontend', icon: FaHtml5 },
    { name: 'CSS3', category: 'frontend', icon: FaCss3Alt },
    { name: 'JavaScript', category: 'frontend', icon: FaJs },
    { name: 'React', category: 'frontend', icon: FaReact },
    { name: 'TypeScript', category: 'frontend', icon: SiTypescript },
    { name: 'Angular', category: 'frontend', icon: FaAngular },
    { name: 'Bootstrap', category: 'frontend', icon: FaBootstrap },
    { name: 'Node.js', category: 'backend', icon: FaNodeJs },
    { name: 'Express.js', category: 'backend', icon: SiExpress },
    { name: 'Python', category: 'backend', icon: FaPython },
    { name: 'Java', category: 'backend', icon: FaJava },
    { name: 'PHP', category: 'backend', icon: FaPhp },
    { name: 'MongoDB', category: 'backend', icon: SiMongodb },
    { name: 'MySQL', category: 'backend', icon: SiMysql },
    { name: 'Firebase', category: 'backend', icon: FaFire },
    { name: 'Git', category: 'tools', icon: FaGitAlt },
    { name: 'GitHub', category: 'tools', icon: FaGithub },
    { name: 'Docker', category: 'tools', icon: FaDocker },
    { name: 'VS Code', category: 'tools', icon: VscCode },
    { name: 'Figma', category: 'tools', icon: SiFigma },
    { name: 'NPM', category: 'tools', icon: FaNpm },
    { name: 'Terminal', category: 'tools', icon: FaTerminal },
]
