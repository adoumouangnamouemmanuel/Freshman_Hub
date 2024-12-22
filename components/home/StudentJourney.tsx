import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";

interface MilestoneProps {
  year: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const Milestone: React.FC<MilestoneProps> = ({
  year,
  title,
  description,
  icon,
  color,
}) => (
  <Animated.View
    entering={FadeInRight.delay(year * 100).springify()}
    style={styles.milestone}
  >
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon as any} size={24} color="#FFF" />
    </View>
    <View style={styles.milestoneContent}>
      <Text style={styles.milestoneYear}>Year {year}</Text>
      <Text style={styles.milestoneTitle}>{title}</Text>
      <Text style={styles.milestoneDescription}>{description}</Text>
    </View>
  </Animated.View>
);

const StudentJourney: React.FC = () => {
  const milestones = [
    {
      year: 1,
      title: "Foundation Year",
      description: "Explore core subjects and adjust to university life",
      icon: "school-outline",
      color: "#4CAF50",
    },
    {
      year: 2,
      title: "Major Declaration",
      description: "Choose your specialization and dive deeper into your field",
      icon: "book-outline",
      color: "#2196F3",
    },
    {
      year: 3,
      title: "Internship",
      description: "Gain real-world experience through internships",
      icon: "briefcase-outline",
      color: "#FFC107",
    },
    {
      year: 4,
      title: "Capstone Project",
      description:
        "Complete your final year project and prepare for graduation",
      icon: "trophy-outline",
      color: "#9C27B0",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ashesi Journey</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {milestones.map((milestone) => (
          <Milestone key={milestone.year} {...milestone} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  milestone: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneYear: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 4,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default StudentJourney;
