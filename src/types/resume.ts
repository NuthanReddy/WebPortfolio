export interface Basics {
  name: string;
  label: string;
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  location: {
    city: string;
    countryCode: string;
  };
  summary: string;
}

export interface Job {
  position: string;
  startDate: string;
  endDate: string;
  company: string;
  location: string;
  highlights: string[];
  keywords: string[];
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

export interface SkillGroup {
  name: string;
  keywords: string[];
}

export interface Project {
  name: string;
  company: string;
  keywords: string[];
  description: string[];
  url?: string;
}

export interface Certification {
  name: string;
  date: string;
  issuer?: string;
  url?: string;
  keywords?: string[];
}

export interface Course {
  name: string;
  year?: string;
  institute: string;
  keywords?: string[];
}

export interface ResumeData {
  basics: Basics;
  headings: {
    work: {
      job: Job[];
    };
    education: Education[];
    skills: SkillGroup[];
    projects: Project[];
    certifications: Certification[];
    courses: Course[];
  };
}
