export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "faculty";
  major?: string;
  yearOfStudy?: number;
  countryOfOrigin: string;
  dateOfBirth?: Date;
  coursesTaught?: string[];
}
