/**
 * Certifications & Credentials Data
 * 
 * Strict honesty rules:
 * - Only verified certifications. Pending credentials clearly marked with [ADD: ...].
 */

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  skillsCovered: string[];
  isVerified: boolean;
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-1',
    name: '[ADD: Certification Name, e.g. Google Data Analytics Professional Certificate]',
    issuer: '[ADD: Issuing Organization, e.g. Google / Coursera]',
    issueDate: '[ADD: Year or Date Issued]',
    credentialUrl: '[ADD: Verification URL or Credential ID]',
    skillsCovered: ['Data Analysis', 'SQL', 'Spreadsheets', 'Data Visualization'],
    isVerified: false,
  },
  {
    id: 'cert-2',
    name: '[ADD: Machine Learning Specialization or Python Certification]',
    issuer: '[ADD: Issuing Body, e.g. DeepLearning.AI / Kaggle / IBM]',
    issueDate: '[ADD: Year Issued]',
    credentialUrl: '[ADD: Verification URL]',
    skillsCovered: ['Python', 'Machine Learning', 'Scikit-learn'],
    isVerified: false,
  },
];
