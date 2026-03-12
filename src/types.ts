export type Page = 'login' | 'register' | 'forgot-password' | 'dashboard' | 'checker' | 'result' | 'history' | 'profile';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  age: string;
  gender: string;
  password?: string;
}

export interface HealthRecord {
  id: string;
  userId: string;
  date: string;
  symptoms: string;
  result: string;
  summary: string; // Short summary for list view
}

export interface AnalysisParams {
  symptoms: string;
  age: string;
  duration: string;
  severity: string;
  location: string;
  language: string;
}
