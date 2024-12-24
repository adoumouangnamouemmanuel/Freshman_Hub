import React from "react";
import CategoryTemplate from "@/components/help/CategoryTemplate";

export default function CampusLifeScreen() {
  const services = [
    {
      title: "Student Organizations",
      description:
        "Explore and join various student clubs and organizations on campus.",
      icon: "people",
    },
    {
      title: "Campus Events",
      description:
        "Stay updated on upcoming events, workshops, and activities.",
      icon: "calendar",
    },
    {
      title: "Housing Information",
      description:
        "Learn about on-campus housing options and application processes.",
      icon: "home",
    },
    {
      title: "Dining Services",
      description:
        "Explore campus dining options, meal plans, and nutritional information.",
      icon: "restaurant",
    },
  ];

  return (
    <CategoryTemplate
      title="Campus Life"
      description="Discover the vibrant campus life at Ashesi University. From student organizations to housing and dining, find all the information you need to make the most of your university experience."
      services={services}
    />
  );
}
