export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "student" | "faculty" | "admin";
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "student@ashesi.edu.gh",
    password: "password123",
    name: "John Doe",
    role: "student",
  },
  {
    id: "2",
    email: "faculty@ashesi.edu.gh",
    password: "password123",
    name: "Jane Smith",
    role: "faculty",
  },
  {
    id: "3",
    email: "admin1@ashesi.edu.gh",
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
];
