import React from "react";
import { View, StyleSheet } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { Coach } from "@/services/coachingService";

interface EngagementTrackerProps {
  assignedCoach: Coach | null;
  headCoach: Coach | null;
}

const EngagementTracker: React.FC<EngagementTrackerProps> = ({
  assignedCoach,
  headCoach,
}) => {
  const calculateProgress = (coach: Coach | null, totalMeetings: number) => {
    if (!coach) return 0;
    return (coach.meetingsHeld || 0) / totalMeetings;
  };

  const assignedProgress = calculateProgress(assignedCoach, 2);
  const headProgress = calculateProgress(headCoach, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coaching Engagement</Text>
      <View style={styles.progressContainer}>
        <Text>Assigned Coach Meetings</Text>
        <ProgressBar
          progress={assignedProgress}
          color="#4CAF50"
          style={styles.progressBar}
        />
        <Text>{`${assignedProgress * 100}%`}</Text>
      </View>
      <View style={styles.progressContainer}>
        <Text>Head Coach Meeting</Text>
        <ProgressBar
          progress={headProgress}
          color="#FFA500"
          style={styles.progressBar}
        />
        <Text>{`${headProgress * 100}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    marginVertical: 8,
    height: 10,
    borderRadius: 5,
  },
});

export default EngagementTracker;
