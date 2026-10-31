/**
 * Certifications & Credentials Data
 * 
 * 100% verified credentials matching official completion certificates:
 * - Oracle Corporation
 * - JPMorgan Chase & Co. (Forage)
 * - Deloitte (Forage)
 * - Medi-Caps University (Alteryx)
 */

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationCode?: string;
  skillsCovered: string[];
  isVerified: boolean;
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-oracle',
    name: 'Oracle Analytics Cloud 2025 Certified Professional',
    issuer: 'Oracle University (Oracle Corporation)',
    issueDate: 'September 26, 2025 (Valid to Sept 2027)',
    credentialId: '102542430OCIEA25OCP',
    skillsCovered: [
      'Oracle Analytics Cloud',
      'Data Modeling',
      'Augmented Analytics',
      'KPI Visualizations',
      'Data Preparation',
    ],
    isVerified: true,
  },
  {
    id: 'cert-jpmorgan',
    name: 'Quantitative Research Job Simulation',
    issuer: 'JPMorgan Chase & Co. (via Forage)',
    issueDate: 'October 29, 2025',
    verificationCode: '6ouBrrx5DGBjxCBqR',
    skillsCovered: [
      'Price Commodity Storage Contracts',
      'Price Data Investigation & Analysis',
      'Credit Risk Analysis',
      'Bucket FICO Scores',
    ],
    isVerified: true,
  },
  {
    id: 'cert-deloitte',
    name: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (via Forage)',
    issueDate: 'October 29, 2025',
    verificationCode: 'z6FL3Wct83g5TGwTc',
    skillsCovered: [
      'Data Analysis',
      'Forensic Technology',
      'Telemetry Diagnostics',
      'Statistical Interpretation',
    ],
    isVerified: true,
  },
  {
    id: 'cert-alteryx',
    name: 'Certificate of Summer Internship on Alteryx',
    issuer: 'Medi-Caps University, Indore',
    issueDate: 'July 10, 2026',
    credentialId: 'Internship Period: 15/06/2026 to 10/07/2026',
    skillsCovered: [
      'Alteryx Designer',
      'ETL Pipeline Architecture',
      'Data Cleansing',
      'Workflow Automation',
    ],
    isVerified: true,
  },
];
