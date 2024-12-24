import React from "react";
import CategoryTemplate from "@/components/help/CategoryTemplate";

export default function FinancialAidScreen() {
  const services = [
    {
      title: "Scholarships",
      description:
        "Explore various scholarship opportunities available to Ashesi students.",
      icon: "school",
    },
    {
      title: "Financial Aid Applications",
      description:
        "Learn about the process of applying for financial aid and required documents.",
      icon: "document-text",
    },
    {
      title: "Work-Study Programs",
      description:
        "Find out about on-campus job opportunities to help finance your education.",
      icon: "briefcase",
    },
    {
      title: "Financial Literacy Workshops",
      description:
        "Attend workshops to improve your financial management skills.",
      icon: "cash",
    },
  ];

  return (
    <CategoryTemplate
      title="Financial Aid"
      description="Ashesi University is committed to making education accessible. Explore our financial aid options and resources to help you manage your educational expenses."
      services={services}
    />
  );
}
