/**
 * Technical Skills Data
 * 
 * Strict honesty rules:
 * - No fake ratings or arbitrary percentage bars.
 * - Grouped by domain with authentic tooling logos from Simple Icons and Devicon.
 * - Monochrome ivory by default; authentic brand color on hover.
 * - If an icon is missing from both Simple Icons and Devicon (e.g. Power BI), it is explicitly noted.
 */

export interface Skill {
  name: string;
  category: 'Languages' | 'Data Science & ML' | 'Databases & Systems' | 'Backend & Tools';
  iconType: 'simple-icon' | 'devicon' | 'missing';
  iconKey?: string; // Component or devicon class name
  brandColor: string;
  proficiency: 'Comfortable' | 'Learning';
  notes?: string;
}

export const skillsData: Skill[] = [
  // --- Languages ---
  {
    name: 'Python',
    category: 'Languages',
    iconType: 'simple-icon',
    iconKey: 'SiPython',
    brandColor: '#3776AB',
    proficiency: 'Comfortable',
  },
  {
    name: 'C++',
    category: 'Languages',
    iconType: 'simple-icon',
    iconKey: 'SiCplusplus',
    brandColor: '#00599C',
    proficiency: 'Comfortable',
  },
  {
    name: 'SQL',
    category: 'Languages',
    iconType: 'simple-icon',
    iconKey: 'SiPostgresql',
    brandColor: '#4169E1',
    proficiency: 'Comfortable',
  },

  // --- Data Science & ML ---
  {
    name: 'Pandas',
    category: 'Data Science & ML',
    iconType: 'simple-icon',
    iconKey: 'SiPandas',
    brandColor: '#E70488',
    proficiency: 'Comfortable',
  },
  {
    name: 'NumPy',
    category: 'Data Science & ML',
    iconType: 'simple-icon',
    iconKey: 'SiNumpy',
    brandColor: '#4DABCF',
    proficiency: 'Comfortable',
  },
  {
    name: 'Scikit-learn',
    category: 'Data Science & ML',
    iconType: 'simple-icon',
    iconKey: 'SiScikitlearn',
    brandColor: '#F7931E',
    proficiency: 'Comfortable',
  },
  {
    name: 'Jupyter Notebooks',
    category: 'Data Science & ML',
    iconType: 'simple-icon',
    iconKey: 'SiJupyter',
    brandColor: '#F37626',
    proficiency: 'Comfortable',
  },

  // --- Databases & Systems ---
  {
    name: 'SQLite',
    category: 'Databases & Systems',
    iconType: 'simple-icon',
    iconKey: 'SiSqlite',
    brandColor: '#0F80C1',
    proficiency: 'Comfortable',
  },
  {
    name: 'PostgreSQL',
    category: 'Databases & Systems',
    iconType: 'simple-icon',
    iconKey: 'SiPostgresql',
    brandColor: '#4169E1',
    proficiency: 'Learning',
  },
  {
    name: 'MongoDB',
    category: 'Databases & Systems',
    iconType: 'simple-icon',
    iconKey: 'SiMongodb',
    brandColor: '#47A248',
    proficiency: 'Learning',
  },

  // --- Backend & Tools ---
  {
    name: 'Flask',
    category: 'Backend & Tools',
    iconType: 'simple-icon',
    iconKey: 'SiFlask',
    brandColor: '#FFFFFF',
    proficiency: 'Comfortable',
  },
  {
    name: 'FastAPI',
    category: 'Backend & Tools',
    iconType: 'simple-icon',
    iconKey: 'SiFastapi',
    brandColor: '#009688',
    proficiency: 'Comfortable',
  },
  {
    name: 'Git',
    category: 'Backend & Tools',
    iconType: 'simple-icon',
    iconKey: 'SiGit',
    brandColor: '#F05032',
    proficiency: 'Comfortable',
  },
  {
    name: 'GitHub',
    category: 'Backend & Tools',
    iconType: 'simple-icon',
    iconKey: 'SiGithub',
    brandColor: '#FFFFFF',
    proficiency: 'Comfortable',
  },
  {
    name: 'Docker',
    category: 'Backend & Tools',
    iconType: 'simple-icon',
    iconKey: 'SiDocker',
    brandColor: '#2496ED',
    proficiency: 'Learning',
  },
  {
    name: 'Power BI',
    category: 'Backend & Tools',
    iconType: 'missing', // Verified: absent from both Simple Icons v16 and Devicon v2.18
    brandColor: '#F2C811',
    proficiency: 'Learning',
    notes: 'Missing from official Simple Icons & Devicon packages. Rendered cleanly with typographic monogram to uphold strict honesty rules.',
  },
];
