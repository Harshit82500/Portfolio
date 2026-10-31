/**
 * Experience Data
 * 
 * Strict honesty rules:
 * - No fabricated companies, titles, or metrics.
 * - Missing items or pending internships marked with [ADD: ...].
 */

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Professional' | 'Academic' | 'Open Source';
  highlights: string[];
  techStack: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Machine Learning & Data Analyst Developer',
    organization: 'Academic & Open-Source Projects',
    location: 'India',
    period: '2025 — Present',
    type: 'Academic',
    highlights: [
      'Engineered machine learning triage systems using calibrated XGBoost and Scikit-learn on multi-dimensional telemetry datasets.',
      'Developed real-time NLP classification pipelines using fine-tuned DistilBERT models with REST API microservices.',
      'Constructed exploratory data analysis pipelines with Pandas, NumPy, and SQL for behavioral signal diagnostics.',
    ],
    techStack: ['Python', 'SQL', 'Scikit-learn', 'Pandas', 'FastAPI', 'Git'],
  },
  {
    id: 'exp-2',
    role: '[ADD: Internship / Professional Role Title]',
    organization: '[ADD: Company or Organization Name]',
    location: '[ADD: Location / Remote]',
    period: '[ADD: Period, e.g. Summer 2026]',
    type: 'Professional',
    highlights: [
      '[ADD: Key contribution or project responsibility after you provide it]',
      '[ADD: Second verified accomplishment without fabricated figures]',
    ],
    techStack: ['[ADD: Primary tool/language]'],
  },
];
