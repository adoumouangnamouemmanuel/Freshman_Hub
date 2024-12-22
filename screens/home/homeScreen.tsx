import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Header from "@/components/home/header";
// import ShortcutButtons from "@/components/home/ShortcutButtons";
import AnnouncementCard from "@/components/home/AnnouncementCard";
import ShortVideos from "@/components/home/ShortVideos";
import ActivityFeed from "@/components/home/ActivityFeed";
import SupportSection from "@/components/home/SupportSection";
import InspirationCard from "@/components/home/InspirationCard";
import StudentJourney from "@/components/home/StudentJourney";
import ProfileScreen from "../profile/profileScreen";
import { router } from "expo-router";

export default function HomeScreen() {
  const [temperature] = useState(25);
  const [activityFilter, setActivityFilter] = useState("all");


  interface Activity {
    id: string;
    type: "event" | "announcement" | "deadline";
    title: string;
    description: string;
    time: string;
    icon: string;
    color: string;
  }
  const shortcutButtons = [
    {
      id: "1",
      icon: "school-outline",
      label: "Coaching",
      color: "#8B5CF6",
      onPress: () => console.log("Coaching pressed"),
    },
    {
      id: "2",
      icon: "help-buoy-outline",
      label: "Help Center",
      color: "#EC4899",
      onPress: () => console.log("Help Center pressed"),
    },
    {
      id: "3",
      icon: "people-outline",
      label: "Buddy System",
      color: "#10B981",
      onPress: () => console.log("Buddy System pressed"),
    },
    {
      id: "4",
      icon: "information-circle-outline",
      label: "Support",
      color: "#F59E0B",
      onPress: () => console.log("Support pressed"),
    },
  ];

  const videos = [
    {
      id: "1",
      thumbnail: "https://picsum.photos/400/300",
      title: "Welcome to Campus Life",
      duration: "2:30",
      views: 1200,
    },
    {
      id: "2",
      thumbnail: "https://picsum.photos/400/301",
      title: "Student Activities Overview",
      duration: "3:45",
      views: 850,
    },
    {
      id: "3",
      thumbnail: "https://picsum.photos/400/302",
      title: "Campus Tour 2024",
      duration: "5:20",
      views: 2100,
    },
  ];

  const activities: Activity[] = [
    {
      id: "1",
      type: "event",
      title: "Freshman Orientation",
      description: "Join us for the welcome ceremony at the main auditorium",
      time: "Today, 10:00 AM",
      icon: "calendar-outline",
      color: "#8B5CF6",
    },
    {
      id: "2",
      type: "announcement",
      title: "Library Hours Extended",
      description:
        "The library will now be open until midnight during exam week",
      time: "2 hours ago",
      icon: "book-outline",
      color: "#EC4899",
    },
    {
      id: "3",
      type: "deadline",
      title: "Course Registration",
      description: "Deadline for course registration is approaching",
      time: "Tomorrow, 5:00 PM",
      icon: "time-outline",
      color: "#F59E0B",
    },
  ];

  const filteredActivities = useCallback(() => {
    if (activityFilter === "all") return activities;
    return activities.filter((activity) => activity.type === activityFilter);
  }, [activities, activityFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        temperature={temperature}
        profileImage="https://picsum.photos/100"
        onProfilePress={() => router.push("/profile")}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          style={styles.content}
        >
          {/* <ShortcutButtons buttons={shortcutButtons} /> */}

          <AnnouncementCard
            type="quote"
            title="Quote of the Day"
            content="The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
            onPress={() => console.log("Quote pressed")}
          />

          <ShortVideos
            videos={videos}
            onVideoPress={(videoId) => console.log("Video pressed:", videoId)}
          />

          <StudentJourney />

          <AnnouncementCard
            type="announcement"
            title="Campus Update"
            content="The new student center will be opening next week! Join us for the grand opening ceremony."
            onPress={() => console.log("Announcement pressed")}
          />

          <View style={styles.activityFilterContainer}>
            <Text style={styles.activityFilterTitle}>Recent Activity</Text>
            <View style={styles.activityFilterButtons}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activityFilter === "all" && styles.activeFilterButton,
                ]}
                onPress={() => setActivityFilter("all")}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activityFilter === "all" && styles.activeFilterButtonText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activityFilter === "event" && styles.activeFilterButton,
                ]}
                onPress={() => setActivityFilter("event")}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activityFilter === "event" && styles.activeFilterButtonText,
                  ]}
                >
                  Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activityFilter === "announcement" &&
                    styles.activeFilterButton,
                ]}
                onPress={() => setActivityFilter("announcement")}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activityFilter === "announcement" &&
                      styles.activeFilterButtonText,
                  ]}
                >
                  Announcements
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  activityFilter === "deadline" && styles.activeFilterButton,
                ]}
                onPress={() => setActivityFilter("deadline")}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activityFilter === "deadline" &&
                      styles.activeFilterButtonText,
                  ]}
                >
                  Deadlines
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ActivityFeed activities={filteredActivities()} />

          <SupportSection />

          <InspirationCard />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 32,
  },
  activityFilterContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  activityFilterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  activityFilterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
  },
  activeFilterButton: {
    backgroundColor: "#8B5CF6",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  activeFilterButtonText: {
    color: "#FFFFFF",
  },
});
