import React from "react";
import CategoryTemplate from "@/components/help/CategoryTemplate";

export default function AcademicSupportScreen() {
  const services = [
    {
      title: "Tutoring Services",
      description: "Get one-on-one or group tutoring in various subjects.",
      icon: "school",
    },
    {
      title: "Writing Center",
      description: "Improve your writing skills with expert guidance.",
      icon: "create",
    },
    {
      title: "Study Skills Workshops",
      description: "Learn effective study techniques and time management.",
      icon: "time",
    },
    {
      title: "Library Resources",
      description:
        "Access a wide range of academic resources and research materials.",
      icon: "library",
    },
  ];

  return (
    <CategoryTemplate
      title="Academic Support"
      description="Ashesi University offers a wide range of academic support services to help you succeed in your studies. Explore the resources below and don't hesitate to reach out for assistance."
      services={services}
    />
  );
}
