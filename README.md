<div align="center">

# ✦ Khaleel Azaizy — Portfolio

**Software Engineer** · Full-Stack · AI · Data

[![Live Site](https://img.shields.io/badge/🌐_Live-my--portfolio--c83e2.web.app-dd4423?style=for-the-badge)](https://my-portfolio-c83e2.web.app)
[![GitHub](https://img.shields.io/badge/GitHub-khaleel--azaizy-181717?style=for-the-badge&logo=github)](https://github.com/khaleel-azaizy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-khaleel--azaizy-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/khaleel-azaizy)

<br/>

<img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind,firebase&theme=dark" alt="Tech Stack" />

<br/><br/>

A modern, animated developer portfolio built with **React**, **TypeScript**, and **Vite** — featuring smooth scroll-driven animations, dynamic stacking sections, and a custom cursor.

</div>

---

## ⚡ Features

| Feature | Description |
|---|---|
| 🎭 **Intro Animation** | Full-screen cinematic intro with animated reveal |
| 🖱️ **Custom Cursor** | Reactive cursor that responds to interactive elements |
| 📜 **Smooth Scrolling** | Lenis-powered buttery smooth scroll experience |
| 🃏 **Stacking Sections** | Scroll-driven sticky/flow sections that stack over each other |
| ✨ **Framer Motion** | Page-wide entrance animations and micro-interactions |
| 🌗 **Light/Dark Stages** | Alternating themed sections for visual rhythm |
| 📱 **Fully Responsive** | Optimized for every screen size |
| 📊 **Firebase Analytics** | Integrated Google Analytics tracking |

## 🏗️ Tech Stack

```
Frontend        React 18  ·  TypeScript  ·  Vite 6
Styling         Tailwind CSS 3  ·  Custom CSS
Animation       Framer Motion  ·  Lenis Smooth Scroll
Icons           React Icons (FA, SI, VSC)
Fonts           Fraunces  ·  Geist  ·  JetBrains Mono
Hosting         Firebase Hosting
Analytics       Firebase Analytics
```

## 📂 Project Structure

```
MyPortfolio/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── About.tsx          # About me section
│   │   ├── Clock.tsx          # Live clock widget
│   │   ├── Contact.tsx        # Contact form & links
│   │   ├── Cursor.tsx         # Custom animated cursor
│   │   ├── Education.tsx      # Academic background
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Hero.tsx           # Landing hero section
│   │   ├── Intro.tsx          # Cinematic intro animation
│   │   ├── Marquee.tsx        # Scrolling text marquee
│   │   ├── Navigation.tsx     # Sticky navigation bar
│   │   ├── Projects.tsx       # Project showcase cards
│   │   ├── RevealText.tsx     # Scroll-triggered text reveal
│   │   ├── SectionHeader.tsx  # Reusable section headers
│   │   └── Skills.tsx         # Skills/tech stack grid
│   ├── data/
│   │   └── info.ts            # All portfolio content & data
│   ├── hooks/
│   │   └── useSmoothScroll.ts # Lenis smooth scroll hook
│   ├── App.tsx                # Root layout with stage system
│   ├── firebase.ts            # Firebase configuration
│   ├── index.css              # Global styles & design tokens
│   └── main.tsx               # App entry point
├── firebase.json              # Firebase Hosting config
├── .firebaserc                # Firebase project linking
├── tailwind.config.ts         # Tailwind configuration
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/khaleel-azaizy/My_Portfolio.git
cd My_Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

### Deploy to Firebase

```bash
# Build first
npm run build

# Deploy to Firebase Hosting
npx firebase-tools deploy --only hosting
```

## 🎨 Sections Overview

| # | Section | Description |
|---|---------|-------------|
| 00 | **Hero** | Name, role, and animated introduction |
| 01 | **About** | Background, pitch, and personal details |
| 02 | **Projects** | 9 featured projects across full-stack, AI/ML, and IoT |
| 03 | **Skills** | 22 technologies organized by Frontend, Backend, and Tools |
| 04 | **Education** | B.Sc. Software Engineering (2021–2025) |
| 05 | **Contact** | Email, GitHub, LinkedIn, and availability status |

## 🔧 Key Projects Featured

- **AJ Motors** — Dual-app car rental platform with i18n & real-time booking
- **Daily Habits Tracker** — Offline-first PWA with calendar grids & streak analytics
- **Baby Fashion Store** — Mobile-optimized e-commerce experience
- **Travel Diary** — Social platform with interactive maps & geotagged photos
- **Income Classifier** — PyTorch ANN achieving 85% accuracy on census data
- **Vitals Simulator** — Real-time healthcare IoT with anomaly detection

## 📄 License

This project is open source and available for reference and inspiration.

---

<div align="center">

**Built with ♥ by [Khaleel Azaizy](https://github.com/khaleel-azaizy)**

</div>
