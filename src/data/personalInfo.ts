/**
 * Personal Information
 * 
 * Strict honesty rules apply:
 * - No fake metrics, no fake internships, no fake dates.
 * - Missing values are clearly marked placeholders [ADD: ...].
 */

export interface PersonalInfo {
  name: string;
  surname: string;
  fullName: string;
  monogram: string;
  roleHeadline: string;
  staticRoleLine: string;
  isAvailableForWork: boolean; // Controls availability indicator. Defaults to OFF.
  availabilityStatusText: string;
  heroHeadline: string;
  heroDescription: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeDownloadUrl: string;
  photoUrl: string; // public/images/harshit.jpg
}

export const personalInfo: PersonalInfo = {
  name: "Harshit",
  surname: "Vishwakarma",
  fullName: "Harshit Vishwakarma",
  monogram: "HV",
  roleHeadline: "Data Analyst / Data Scientist / ML",
  staticRoleLine: "Data Analyst / Data Scientist / ML",
  isAvailableForWork: false, // Defaults to OFF as instructed
  availabilityStatusText: "Focused on Research & Projects",
  heroHeadline: "Designing actionable data intelligence through rigorous analysis & machine learning.",
  heroDescription: "Specializing in exploratory data analysis, predictive modeling, and applied machine learning. Grounded in statistical clarity, clean architecture, and verifiable real-world problem solving.",
  location: "India",
  email: "harshitvishwakarma6264@gmail.com",
  githubUrl: "https://github.com/Harshit82500",
  linkedinUrl: "https://www.linkedin.com/in/harshitvishwak",
  resumeDownloadUrl: "/resume.pdf", // Expected in public/
  photoUrl: "/images/harshit.jpg",  // Expected in public/images/
};
