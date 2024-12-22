import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph, Button, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Coach } from "@/services/coachingService";

interface CoachCardProps {
  coach: Coach;
  onSchedule: () => void;
  renderMeetingStatus: () => React.ReactNode;
  isHeadCoach?: boolean;
  onChat?: () => void;
}

const CoachCard: React.FC<CoachCardProps> = ({
  coach,
  onSchedule,
  renderMeetingStatus,
  isHeadCoach = false,
  onChat,
}) => {
  return (
    <Card style={[styles.card, isHeadCoach && styles.headCoachCard]}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Avatar.Image source={{ uri: coach.avatar }} size={80} />
          <View style={styles.headerText}>
            <Title style={styles.name}>{coach.name}</Title>
            <Paragraph style={styles.role}>
              {isHeadCoach ? "Head Coach" : "Your Assigned Coach"}
            </Paragraph>
          </View>
        </View>
        <Paragraph style={styles.bio}>{coach.bio}</Paragraph>
        {renderMeetingStatus()}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          onPress={onSchedule}
          style={styles.scheduleButton}
        >
          Schedule Meeting
        </Button>
        {!isHeadCoach && onChat && (
          <TouchableOpacity onPress={onChat} style={styles.chatButton}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#4CAF50" />
          </TouchableOpacity>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    elevation: 5,
  },
  headCoachCard: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    justifyContent: "space-between",
  },
  scheduleButton: {
    marginTop: 8,
    flex: 1,
    marginRight: 8,
  },
  chatButton: {
    padding: 8,
  },
});

export default CoachCard;
