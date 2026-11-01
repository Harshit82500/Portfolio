/**
 * Experience Data
 * 
 * Strict honesty rules:
 * - Verified internship at Medi-Caps University on Alteryx.
 * - Academic & open-source machine learning engineering.
 */

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Professional' | 'Academic' | 'Open Source' | 'Placeholder';
  highlights: string[];
  techStack: string[];
  previewImage?: string;
  isPlaceholder?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-alteryx',
    role: 'Summer Intern — Data Analytics (Alteryx)',
    organization: 'Medi-Caps University',
    location: 'Indore, India',
    period: 'June 15, 2026 — July 10, 2026',
    type: 'Professional',
    previewImage: '/images/experience-alteryx.jpg',
    highlights: [
      'Engineered automated ETL pipelines and data preparation workflows using Alteryx Designer for institutional datasets.',
      'Constructed data cleansing and spatial aggregation workflows to eliminate redundant records and accelerate downstream analytics.',
      'Synthesized multi-source reporting extracts into structured database schemas for automated exploratory analysis.',
    ],
    techStack: ['Alteryx Designer', 'ETL Pipelines', 'SQL', 'Data Cleansing', 'Workflow Automation'],
  },
  {
    id: 'exp-academic',
    role: 'Machine Learning & Data Analyst Developer',
    organization: 'Academic & Open-Source Projects',
    location: 'Indore, India',
    period: '2025 — Present',
    type: 'Academic',
    previewImage: '/images/experience-academic.jpg',
    highlights: [
      'Engineered machine learning triage systems using calibrated XGBoost and Scikit-learn on multi-dimensional telemetry datasets (87.5% Accuracy, 0.883 ROC-AUC).',
      'Developed real-time browser NLP classification pipelines with fine-tuned DistilBERT models and high-throughput FastAPI REST microservices.',
      'Constructed exploratory data analysis pipelines with Pandas, NumPy, and SQL for behavioral signal diagnostics and statistical hypothesis testing.',
    ],
    techStack: ['Python', 'SQL', 'Scikit-learn', 'Pandas', 'FastAPI', 'XGBoost', 'Git'],
  },
  {
    id: 'exp-placeholder',
    role: '[ADD: Role / Next Position]',
    organization: '[ADD: Target Company / Organization]',
    location: '[ADD: Location / Remote]',
    period: '[ADD: Start Date — End Date]',
    type: 'Placeholder',
    isPlaceholder: true,
    highlights: [
      '[ADD: Core responsibility or technical achievement]',
      '[ADD: Quantitative impact or deliverable]',
    ],
    techStack: ['[ADD: Primary Technology]', '[ADD: Secondary Tool]'],
  },
];
