export type UserGroup = "all" | "faculty" | "students" | "staff";
export type StudentYear = 1 | 2 | 3 | 4 | 5;
export type Faculty = "CS" | "Engineering" | "Business" | "Arts" | "Science";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  type: "announcement" | "event" | "deadline";
  targetGroups: UserGroup[];
  targetMajors?: string[];
  targetYears?: StudentYear[];
  targetCourses?: string[];
  targetFaculties?: Faculty[];
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Welcome Week Schedule",
    content: "Check out the exciting events planned for Welcome Week!",
    date: new Date(2023, 7, 28),
    type: "announcement",
    targetGroups: ["all"],
  },
  {
    id: "2",
    title: "CS101 Midterm Exam",
    content:
      "The CS101 midterm exam will be held on October 15th at 2 PM in the Main Hall.",
    date: new Date(2023, 9, 15),
    type: "event",
    targetGroups: ["students"],
    targetMajors: ["Computer Science"],
    targetYears: [1],
    targetCourses: ["CS101"],
  },
  {
    id: "3",
    title: "Research Paper Submission Deadline",
    content: "Don't forget to submit your research papers by November 30th.",
    date: new Date(2023, 10, 30),
    type: "deadline",
    targetGroups: ["faculty"],
    targetFaculties: ["CS", "Engineering"],
  },
];
