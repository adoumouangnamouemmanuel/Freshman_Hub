import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Activity {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface ActivitySectionProps {
  activities: Activity[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ activities }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Campus Activities</Text>
      {activities.map((activity, index) => (
        <View key={index} style={styles.activityItem}>
          <Ionicons name={activity.icon} size={24} color={activity.color} />
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>
              {activity.description}
            </Text>
          </View>
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
  activityItem: {
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
  activityTextContainer: {
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  activityDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default ActivitySection;
