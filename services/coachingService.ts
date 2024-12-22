export interface Coach {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  meetingsHeld: number;
  isHeadCoach: boolean;
}

const mockAssignedCoach: Coach = {
  id: "1",
  name: "Dr. Sarah Johnson",
  avatar: "https://picsum.photos/200",
  bio: "Experienced mentor specializing in computer science and engineering. Passionate about guiding students through their academic journey.",
  meetingsHeld: 1,
  isHeadCoach: false,
};

const mockHeadCoach: Coach = {
  id: "2",
  name: "Prof. Michael Chen",
  avatar: "https://picsum.photos/201",
  bio: "Head of the Coaching Program with over 20 years of experience in higher education. Committed to student success and personal growth.",
  meetingsHeld: 0,
  isHeadCoach: true,
};

export const fetchAssignedCoach = async (): Promise<Coach> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockAssignedCoach;
};

export const fetchHeadCoach = async (): Promise<Coach> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockHeadCoach;
};