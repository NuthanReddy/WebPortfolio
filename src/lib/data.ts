import type { ResumeData } from "@/types/resume";
import rawData from "../../nuthan-resume-template.json";

export const resume = rawData as unknown as ResumeData;
export const basics = resume.basics;
export const jobs = resume.headings.work.job;
export const education = resume.headings.education;
export const skills = resume.headings.skills;
export const projects = resume.headings.projects;
export const certifications = resume.headings.certifications;
export const courses = resume.headings.courses;
