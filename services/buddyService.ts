// This is a mock service. In a real app, you would connect to your backend API.

interface Buddy {
  id: string;
  name: string;
  avatar: string;
  major: string;
  country: string;
  yearOfStudy: number;
  isConnected: boolean;
}

const mockBuddies: Buddy[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://picsum.photos/200",
    major: "Computer Science",
    country: "Ghana",
    yearOfStudy: 3,
    isConnected: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://picsum.photos/201",
    major: "Business Administration",
    country: "Nigeria",
    yearOfStudy: 2,
    isConnected: true,
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatar: "https://picsum.photos/202",
    major: "Engineering",
    country: "Kenya",
    yearOfStudy: 4,
    isConnected: true,
  },
  {
    id: "4",
    name: "Bob Williams",
    avatar: "https://picsum.photos/203",
    major: "Psychology",
    country: "South Africa",
    yearOfStudy: 1,
    isConnected: false,
  },
  {
    id: "5",
    name: "Emma Brown",
    avatar: "https://picsum.photos/204",
    major: "Computer Science",
    country: "Ghana",
    yearOfStudy: 2,
    isConnected: true,
  },
];

const mockAssignedBuddy: Buddy = {
  id: "6",
  name: "Alex Johnson",
  avatar: "https://picsum.photos/205",
  major: "Engineering",
  country: "Kenya",
  yearOfStudy: 4,
  isConnected: true,
};

export const fetchBuddies = async (filters: {
  major: string;
  country: string;
  yearOfStudy: string;
}): Promise<Buddy[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockBuddies;
};

export const fetchAssignedBuddy = async (): Promise<Buddy> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAssignedBuddy;
};
