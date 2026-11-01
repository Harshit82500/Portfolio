/**
 * Education Data
 * 
 * Verified academic credentials from Medi-Caps University, Indore.
 */

export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  period: string;
  details?: string[];
  metricsPlaceholder?: string;
}

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science & Engineering (Data Science)',
    institution: 'Medi-Caps University',
    location: 'Indore, Madhya Pradesh, India',
    period: '2023 — [ADD: Expected Graduation Year]',
    details: [
      'Core Disciplines: Data Structures & Algorithms, Database Management Systems (SQL), Operating Systems, Machine Learning, Compiler Design, Design & Analysis of Algorithms.',
      'Practical Laboratory Work: High-performance algorithm analysis, exploratory data science lab projects, and statistical modeling.',
      'Specialized Practical Training: Completed intensive Summer Internship on Alteryx data analytics and automated workflow modeling.',
    ],
  },
];
