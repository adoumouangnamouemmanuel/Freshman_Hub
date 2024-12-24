import React from "react";
import CategoryTemplate from "@/components/help/CategoryTemplate";

export default function MentalHealthScreen() {
  const services = [
    {
      title: "Counseling Services",
      description:
        "Access confidential counseling sessions with trained professionals.",
      icon: "people",
    },
    {
      title: "Stress Management Workshops",
      description:
        "Learn techniques to manage stress and improve mental well-being.",
      icon: "leaf",
    },
    {
      title: "Peer Support Groups",
      description:
        "Join support groups to connect with fellow students and share experiences.",
      icon: "people-circle",
    },
    {
      title: "Mental Health Resources",
      description:
        "Access online resources and self-help materials for mental health.",
      icon: "book",
    },
  ];

  return (
    <CategoryTemplate
      title="Mental Health Support"
      description="Ashesi University is committed to supporting your mental health and well-being. Explore our mental health services and resources designed to help you thrive academically and personally."
      services={services}
    />
  );
}
