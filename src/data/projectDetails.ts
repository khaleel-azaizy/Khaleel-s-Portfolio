export type WorkCategory = 'Web apps' | 'AI & data' | 'Systems'

export const projectDetails: Record<
  string,
  { category: WorkCategory; features: string[] }
> = {
  '01': {
    category: 'Web apps',
    features: [
      'Customer storefront and a separate administration dashboard.',
      'Multilingual browsing and a real-time booking flow.',
      'Firebase-backed vehicle inventory with an installable PWA.',
    ],
  },
  '02': {
    category: 'Web apps',
    features: [
      'A multilingual storefront with cart and checkout.',
      'Order tracking with estimated delivery dates.',
      'An administration dashboard for products, images, and inventory.',
    ],
  },
  '03': {
    category: 'Web apps',
    features: [
      'Yearly and monthly calendar views for daily habits.',
      'Streak analytics that make progress easy to follow.',
      'Offline-first sync and installation on mobile or desktop.',
    ],
  },
  '04': {
    category: 'Web apps',
    features: [
      'Interactive maps and geotagged photo galleries.',
      'An Angular frontend for sharing travel experiences.',
      'An Express API backed by a SQL database.',
    ],
  },
  '05': {
    category: 'AI & data',
    features: [
      'A PyTorch neural network for income-bracket prediction.',
      'Feature engineering on US Census data.',
      'A training notebook documenting a model reaching 85% accuracy.',
    ],
  },
  '06': {
    category: 'AI & data',
    features: [
      'Simulated patient vitals streamed in real time.',
      'Visualizations to make changing measurements readable.',
      'Anomaly detection and threshold-based alerts.',
    ],
  },
  '07': {
    category: 'Systems',
    features: [
      'A Java client–server application for transferring files.',
      'Support for both TCP and UDP transports.',
      'Comparisons of throughput and delivery reliability.',
    ],
  },
  '08': {
    category: 'AI & data',
    features: [
      'Supervised and unsupervised learning experiments.',
      'Regression, clustering, and dimensionality reduction.',
      'A working notebook developed across machine learning coursework.',
    ],
  },
  '09': {
    category: 'AI & data',
    features: [
      'Text classification and sentiment analysis.',
      'Transformer architectures implemented with PyTorch.',
      'An evaluation pipeline for comparing model performance.',
    ],
  },
}
