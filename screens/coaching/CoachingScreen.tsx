import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Animated } from "react-native";
import {
  Title,
  Card,
  Paragraph,
  Button,
  FAB,
  Portal,
  Dialog,
  IconButton,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/common/Header";
import CoachCard from "@/components/coaching/CoachCard";
import MeetingScheduler from "@/components/coaching/MeetingScheduler";
import ChatModal from "@/components/coaching/ChatModal";
import EngagementTracker from "@/components/coaching/EngagementTracker";
import {
  fetchAssignedCoach,
  fetchHeadCoach,
  Coach,
} from "@/services/coachingService";

const CoachingScreen: React.FC = () => {
  const [assignedCoach, setAssignedCoach] = useState<Coach | null>(null);
  const [headCoach, setHeadCoach] = useState<Coach | null>(null);
  const [isSchedulerVisible, setIsSchedulerVisible] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isInfoDialogVisible, setIsInfoDialogVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [fabAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    loadCoaches();
    animateFAB();
  }, []);

  const loadCoaches = async () => {
    const fetchedAssignedCoach = await fetchAssignedCoach();
    const fetchedHeadCoach = await fetchHeadCoach();
    setAssignedCoach(fetchedAssignedCoach);
    setHeadCoach(fetchedHeadCoach);
  };

  const animateFAB = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fabAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fabAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleScheduleMeeting = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsSchedulerVisible(true);
  };

  const renderMeetingStatus = (coach: Coach) => {
    const meetingsHeld = coach.meetingsHeld || 0;
    const totalMeetings = coach.isHeadCoach ? 1 : 2;
    const remainingMeetings = totalMeetings - meetingsHeld;

    return (
      <View style={styles.meetingStatus}>
        <Ionicons
          name={remainingMeetings > 0 ? "alert-circle" : "checkmark-circle"}
          size={24}
          color={remainingMeetings > 0 ? "#FFA500" : "#4CAF50"}
        />
        <Paragraph style={styles.meetingStatusText}>
          {remainingMeetings > 0
            ? `${remainingMeetings} meeting${
                remainingMeetings > 1 ? "s" : ""
              } remaining`
            : "All meetings completed"}
        </Paragraph>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Header title="Coaching" showBackButton={false} />
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Title style={styles.title}>Your Coaching Journey</Title>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Paragraph style={styles.infoText}>
                Welcome to your personalized coaching experience! You're
                assigned one dedicated coach and have access to the head coach.
                Remember to schedule your required meetings to make the most of
                this opportunity.
              </Paragraph>
            </Card.Content>
          </Card>

          {assignedCoach && (
            <CoachCard
              coach={assignedCoach}
              onSchedule={() => handleScheduleMeeting(assignedCoach)}
              renderMeetingStatus={() => renderMeetingStatus(assignedCoach)}
              onChat={() => setIsChatVisible(true)}
            />
          )}

          {headCoach && (
            <CoachCard
              coach={headCoach}
              onSchedule={() => handleScheduleMeeting(headCoach)}
              renderMeetingStatus={() => renderMeetingStatus(headCoach)}
              isHeadCoach
            />
          )}

          <EngagementTracker
            assignedCoach={assignedCoach}
            headCoach={headCoach}
          />

          <Button
            mode="contained"
            onPress={() => setIsInfoDialogVisible(true)}
            style={styles.infoButton}
            icon="information"
          >
            Coaching Program Info
          </Button>
        </ScrollView>

        <Portal>
          {selectedCoach && (
            <MeetingScheduler
              visible={isSchedulerVisible}
              onDismiss={() => setIsSchedulerVisible(false)}
              coach={selectedCoach}
            />
          )}
          <Dialog
            visible={isInfoDialogVisible}
            onDismiss={() => setIsInfoDialogVisible(false)}
          >
            <Dialog.Title>Coaching Program Information</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                The Freshman Coaching Program is designed to support your
                transition and success at Ashesi University. Here's what you
                need to know:
              </Paragraph>
              <Paragraph>
                • You are assigned one dedicated coach for personal guidance.
              </Paragraph>
              <Paragraph>
                • You should meet with your assigned coach twice during the
                semester.
              </Paragraph>
              <Paragraph>
                • You also have one required meeting with the head coach.
              </Paragraph>
              <Paragraph>
                • These meetings are opportunities to discuss your academic
                progress, career goals, and any challenges you may be facing.
              </Paragraph>
              <Paragraph>
                • Don't hesitate to reach out if you need additional support or
                guidance!
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsInfoDialogVisible(false)}>
                Got it
              </Button>
            </Dialog.Actions>
          </Dialog>
          {assignedCoach && (
            <ChatModal
              visible={isChatVisible}
              onDismiss={() => setIsChatVisible(false)}
              coach={assignedCoach}
            />
          )}
        </Portal>

        <Animated.View
          style={[
            styles.fabContainer,
            {
              transform: [
                {
                  translateY: fabAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
              ],
            },
          ]}
        >
          <FAB
            style={styles.fab}
            icon="calendar"
            onPress={() => setIsSchedulerVisible(true)}
            label="Schedule Meeting"
          />
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  meetingStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  meetingStatusText: {
    marginLeft: 8,
    fontSize: 14,
  },
  infoButton: {
    marginTop: 20,
    backgroundColor: "#FF6B6B",
    borderRadius: 25,
  },
  fabContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
  fab: {
    backgroundColor: "#4CAF50",
  },
});

export default CoachingScreen;
