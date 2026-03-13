import { Timestamp } from "firebase/firestore";

export type UserRole = "student" | "admin";
export type ApplicationStatus = "pending" | "under_review" | "accepted" | "rejected";
export type DegreeType = "bachelor" | "master" | "phd";
export type ScholarshipCoverage = "full" | "partial";
export type FavoriteType = "university" | "scholarship";

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  profile?: StudentProfile;
}

export interface StudentProfile {
  fullName: string;
  dateOfBirth: Date;
  nationality: string;
  phoneNumber: string;
  passportNumber: string;
  previousEducation: string;
  graduationYear: number;
  gpa: number;
  photoUrl?: string;
  country?: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  description: string;
  programs: string[];
  createdAt: Date;
  rating?: UniversityRating;
  coordinates?: {
    lat: number;
    lng: number;
  };
  website?: string;
  type?: "public" | "private";
  tuitionRange?: string;
}

export interface UniversityRating {
  averageRating: number;
  totalReviews: number;
  educationQuality: number;
  campusLife: number;
  facilities: number;
  internationalSupport: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userCountry: string;
  universityId: string;
  universityName: string;
  rating: number;
  reviewText: string;
  date: Date;
  helpful: number;
}

export interface Scholarship {
  id: string;
  name: string;
  university: string;
  universityId: string;
  coverage: ScholarshipCoverage;
  coverageAmount?: string;
  eligibleMajors: string[];
  deadline: Date;
  description: string;
  requirements: string[];
  applicationLink: string;
  isFullFunding?: boolean;
}

export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: FavoriteType;
  savedAt: Date;
}

export interface Program {
  id: string;
  universityId: string;
  universityName: string;
  name: string;
  degreeType: DegreeType;
  duration: string;
  description: string;
  requirements: string[];
}

export interface PersonalInfo {
  fullName: string;
  dateOfBirth: Date;
  nationality: string;
  phoneNumber: string;
  passportNumber: string;
  email: string;
}

export interface EducationalBackground {
  previousEducation: string;
  graduationYear: number;
  gpa: number;
  schoolName: string;
  country: string;
}

export interface Document {
  id: string;
  type: "passport" | "high_school_certificate" | "transcript" | "personal_photo" | "recommendation_letter";
  name: string;
  url: string;
  uploadedAt: Date;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  universityId: string;
  universityName: string;
  programId: string;
  programName: string;
  status: ApplicationStatus;
  personalInfo: PersonalInfo;
  educationalBackground: EducationalBackground;
  documents: Document[];
  submittedAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface FilterOptions {
  search: string;
  country: string;
  degreeType: DegreeType | "";
  sortBy: "name" | "country" | "createdAt";
  sortOrder: "asc" | "desc";
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

export interface AIAdvisorProfile {
  major: string;
  preferredCity: string;
  budgetRange: string;
  universityType: "public" | "private" | "both";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

