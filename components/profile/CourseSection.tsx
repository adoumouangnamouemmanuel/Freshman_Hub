import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface CourseSectionProps {
  title: string;
  courses: string[];
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  courses,
  iconName,
  iconColor,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {courses.map((course, index) => (
        <View key={index} style={styles.courseItem}>
          <Ionicons name={iconName} size={20} color={iconColor} />
          <Text style={styles.courseText}>{course}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
});

export default CourseSection;
