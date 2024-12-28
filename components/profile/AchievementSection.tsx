import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AchievementSectionProps {
  title: string;
  achievements: string[];
}

const AchievementSection: React.FC<AchievementSectionProps> = ({
  title,
  achievements,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementItem}>
          <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
          <Text style={styles.achievementText}>{achievement}</Text>
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
  achievementItem: {
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
  achievementText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
});

export default AchievementSection;
