<div align="center">

# ✦ Khaleel Azaizy — Portfolio

**Software Engineer** · Full-Stack · AI · Data

[![Live Site](https://img.shields.io/badge/🌐_Live-my--portfolio--c83e2.web.app-7654a3?style=for-the-badge)](https://my-portfolio-c83e2.web.app)
[![GitHub](https://img.shields.io/badge/GitHub-khaleel--azaizy-181717?style=for-the-badge&logo=github)](https://github.com/khaleel-azaizy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-khaleel--azaizy-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/khaleel-azaizy)

<br/>

<img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind,firebase&theme=dark" alt="Tech Stack" />

<br/><br/>

A fast, accessible developer portfolio built with **React**, **TypeScript**, and **Vite** — live product previews, a filterable project workbench, and a contact form that lands straight in my inbox.

</div>

---

## ⚡ Features

| Feature | Description |
|---|---|
| 🖥️ **Live product previews** | Featured client projects shown in browser frames with links to the live sites |
| 🗂️ **Filterable workbench** | Smaller projects filterable by Web apps, AI & data, and Systems |
| 🪟 **Project details** | Each project opens in an accessible `<dialog>` with features and links |
| ✉️ **Contact form** | Formspree-backed form with timeout, error, and success states |
| ♿ **Accessible by default** | Skip link, focus management, `aria-pressed` filters, reduced-motion support |
| 📱 **Fully responsive** | Tuned layouts from phones to wide desktops |
| 🔗 **Share-ready** | Open Graph / Twitter card image, canonical URL, sitemap, and JSON-LD |
| 📊 **Deferred analytics** | Firebase Analytics loads in its own chunk after the page has loaded, in production only |

## 🏗️ Tech Stack

```
Frontend        React 18  ·  TypeScript  ·  Vite 6
Styling         Tailwind CSS 3  ·  Custom CSS
Icons           React Icons (Feather, FA, SI, VSC)
Fonts           Bricolage Grotesque  ·  DM Sans
Forms           Formspree
Hosting         Firebase Hosting
Analytics       Firebase Analytics
```

## 📂 Project Structure

```
Khaleel-s-Portfolio/
├── public/
│   ├── images/                # Hero artwork and live-site screenshots (.webp)
│   ├── favicon.svg
│   ├── og-image.jpg           # 1200×630 social share card
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── About.tsx          # Bio, principles, and education
│   │   ├── Clock.tsx          # Local time in the footer
│   │   ├── Contact.tsx        # Closing call to action and email copy
│   │   ├── ContactForm.tsx    # Formspree contact dialog
│   │   ├── Footer.tsx         # Socials, wordmark, back to top
│   │   ├── Hero.tsx           # Landing section and tech strip
│   │   ├── Modal.tsx          # Shared accessible <dialog> wrapper
│   │   ├── Navigation.tsx     # Sticky header with active-section tracking
│   │   ├── Projects.tsx       # Featured projects and filterable workbench
│   │   └── Skills.tsx         # Toolkit grouped by experience / engine / process
│   ├── data/
│   │   ├── info.ts            # Profile, projects, skills, and education
│   │   └── projectDetails.ts  # Per-project categories and feature lists
│   ├── App.tsx                # Page layout
│   ├── firebase.ts            # Firebase configuration (analytics)
│   ├── index.css              # Design tokens and component styles
│   └── main.tsx               # Entry point; defers analytics
├── firebase.json              # Firebase Hosting config
├── .firebaserc                # Firebase project linking
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/khaleel-azaizy/Khaleel-s-Portfolio.git
cd Khaleel-s-Portfolio
npm install
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
npm run build
npx firebase-tools deploy --only hosting
```

> If the site moves to a custom domain, update the absolute URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.

## 🎨 Sections Overview

| Section | Description |
|---------|-------------|
| **Hero** | Introduction, calls to action, and core technologies |
| **Work** | Two featured live products plus a filterable workbench of 7 more projects |
| **About** | Background, principles, and B.Sc. Software Engineering (2021–2025) |
| **Toolkit** | Technologies grouped into frontend, backend, and process |
| **Contact** | Availability, contact form, and email |

## 🔧 Key Projects Featured

- **AJ Motors** — Live car rental platform: multilingual storefront, real-time booking, and admin dashboard
- **Baby Fashion** — Live e-commerce store: multilingual storefront, checkout, order tracking, and admin dashboard
- **Daily Habits Tracker** — Offline-first PWA with calendar grids and streak analytics
- **Travel Diary** — Social platform with interactive maps and geotagged photos
- **Income Classifier** — PyTorch ANN reaching 85% accuracy on US Census data
- **Vitals Simulator** — Real-time healthcare IoT simulation with anomaly detection

## 📄 License

This project is open source and available for reference and inspiration.

---

<div align="center">

**Built with ♥ by [Khaleel Azaizy](https://github.com/khaleel-azaizy)**

</div>
