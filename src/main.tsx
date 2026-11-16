import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Analytics is not needed to render the page, so Firebase is split into its
// own chunk and fetched only in production, once the page has finished loading.
if (import.meta.env.PROD) {
  const loadAnalytics = () => {
    import('./firebase').catch(() => {
      // Blocked by an ad blocker or offline; the site works without it.
    })
  }
  if (document.readyState === 'complete') loadAnalytics()
  else window.addEventListener('load', loadAnalytics, { once: true })
}
