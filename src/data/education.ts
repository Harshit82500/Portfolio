/**
 * Education Data
 * 
 * Strict honesty rules:
 * - Only verified academic information. Missing details marked with [ADD: ...].
 */

export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  period: string;
  details?: string[];
  metricsPlaceholder?: string;
}

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science & Engineering / Data Science',
    institution: '[ADD: College or University Name]',
    period: '[ADD: Graduation Year, e.g. 2023 — 2027]',
    details: [
      'Core Coursework: Data Structures & Algorithms, Database Management Systems (SQL), Operating Systems, Machine Learning, Compiler Design.',
      'Practical Laboratory Work: High-performance algorithm analysis, exploratory data science lab projects, and applied software engineering.',
    ],
    metricsPlaceholder: '[ADD: CGPA or Percentage after confirmed]',
  },
];
