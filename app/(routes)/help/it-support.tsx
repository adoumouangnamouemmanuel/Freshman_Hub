import React from "react";
import CategoryTemplate from "@/components/help/CategoryTemplate";

export default function ITSupportScreen() {
  const services = [
    {
      title: "Technical Support",
      description:
        "Get help with computer issues, software installations, and network connectivity.",
      icon: "desktop",
    },
    {
      title: "Account Management",
      description:
        "Manage your university accounts, email, and access to online resources.",
      icon: "person-circle",
    },
    {
      title: "Software Resources",
      description:
        "Access and download software provided by the university for academic use.",
      icon: "cloud-download",
    },
    {
      title: "IT Security",
      description:
        "Learn about best practices for keeping your data and devices secure.",
      icon: "shield-checkmark",
    },
  ];

  return (
    <CategoryTemplate
      title="IT Support"
      description="Ashesi University's IT Support is here to assist you with all your technology needs. From technical issues to software resources, we're here to ensure you have a smooth technology experience on campus."
      services={services}
    />
  );
}
