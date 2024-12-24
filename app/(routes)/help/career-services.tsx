import React from "react";
import CategoryTemplate from "@/components/help/CategoryTemplate";

export default function CareerServicesScreen() {
  const services = [
    {
      title: "Career Counseling",
      description:
        "Get personalized career advice and guidance from our counselors.",
      icon: "person",
    },
    {
      title: "Job and Internship Board",
      description:
        "Access our online platform for job and internship opportunities.",
      icon: "briefcase",
    },
    {
      title: "Resume and CV Workshops",
      description: "Attend workshops to create and improve your resume and CV.",
      icon: "document-text",
    },
    {
      title: "Mock Interviews",
      description:
        "Practice your interview skills with simulated job interviews.",
      icon: "mic",
    },
  ];

  return (
    <CategoryTemplate
      title="Career Services"
      description="Ashesi University's Career Services is here to support your professional development and help you achieve your career goals. Explore our services and resources to prepare for your future career."
      services={services}
    />
  );
}
