/**
 * Site Configuration & Canonical Constants
 */

export const siteConfig = {
  name: 'Harshit Vishwakarma',
  title: 'Harshit Vishwakarma — Data Analyst & Data Scientist (aspiring)',
  description:
    'Data Science student building projects in data analysis and machine learning.',
  url: 'https://portfolio-harshit82500.vercel.app',
  ogImage: 'https://portfolio-harshit82500.vercel.app/og-image.png',
  author: 'Harshit Vishwakarma',
  links: {
    github: 'https://github.com/Harshit82500',
    linkedin: 'https://www.linkedin.com/in/harshitvishwak',
    email: 'harshitvishwakarma6264@gmail.com',
  },
} as const;

export type SiteConfig = typeof siteConfig;
