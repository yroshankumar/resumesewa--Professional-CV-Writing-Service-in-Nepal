export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  avatarUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletPoints: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate: string;
  grade?: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  liveUrl: string;
  githubUrl: string;
  description: string;
  bulletPoints: string[];
  techStack: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomItem[];
}

export type TemplateId =
  | "modern-clean"
  | "executive-serif"
  | "tech-developer"
  | "nepal-loksewa"
  | "international-ats"
  | "creative-portfolio";

export type FontStyle = "sans" | "serif" | "mono" | "display";
export type AccentColor = "indigo" | "navy" | "emerald" | "slate" | "crimson" | "amber" | "rose";
export type LayoutDensity = "compact" | "normal" | "spacious";

export interface TemplateConfig {
  templateId: TemplateId;
  fontStyle: FontStyle;
  accentColor: AccentColor;
  layoutDensity: LayoutDensity;
  showPhoto: boolean;
  sectionOrder?: string[];
  visibleSections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    certifications: boolean;
    languages: boolean;
    custom: boolean;
  };
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  targetJobTitle?: string;
  targetJobDescription?: string;
}

export interface ATSReviewResult {
  atsScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
}

export interface BulletEnhancement {
  type: string;
  text: string;
  highlight: string;
}
