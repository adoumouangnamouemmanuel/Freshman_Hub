import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import PersonalInfo from "@/components/profile/PersonalInfo";
import AcademicInfo from "@/components/profile/AcademicInfo";
import AchievementSection from "@/components/profile/AchievementSection";
import CourseSection from "@/components/profile/CourseSection";
import ActivitySection from "@/components/profile/ActivitySection";
import Header from "@/components/profile/Header";

const { width } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("about");
  const tabIndicatorPosition = useSharedValue(0);

  const [personalInfo, setPersonalInfo] = useState({
    dateOfBirth: { value: "January 15, 2005", isPrivate: false },
    countryOfOrigin: { value: "Ghana", isPrivate: false },
    languages: { value: "English, Twi", isPrivate: false },
    highSchool: { value: "Accra Academy", isPrivate: false },
    email: { value: "john.doe@ashesi.edu.gh", isPrivate: false },
    phone: { value: "+233 50 123 4567", isPrivate: true },
    address: { value: "Accra, Ghana", isPrivate: true },
  });

  const [gpa, setGPA] = useState("3.8");
  const [isGPAPrivate, setIsGPAPrivate] = useState(true);

  // const updateGPA = (newGPA: string) => {
  //   setGPA(newGPA);
  // };

  const toggleGPAPrivacy = () => {
    setIsGPAPrivate(!isGPAPrivate);
  };

  // const updatePersonalInfo = (updatedInfo: any) => {
  //   setPersonalInfo(updatedInfo);
  // };

  const togglePersonalInfoPrivacy = (key: string) => {
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [key]: { ...prevInfo[key], isPrivate: !prevInfo[key].isPrivate },
    }));
  };

  const tabIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabIndicatorPosition.value }],
    };
  });

  const handleTabPress = (tab: string, index: number) => {
    setActiveTab(tab);
    tabIndicatorPosition.value = withSpring(index * (width / 4));
  };

  // const renderAchievementSection = (title: string, achievements: string[]) => (
  //   <View style={styles.achievementSection}>
  //     <Text style={styles.achievementSectionTitle}>{title}</Text>
  //     {achievements.map((achievement, index) => (
  //       <View key={index} style={styles.achievementItem}>
  //         <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
  //         <Text style={styles.achievementText}>{achievement}</Text>
  //       </View>
  //     ))}
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        title="Profile"
        onBack={() => router.back()}
        onSettings={() => router.push("/(routes)/settings")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["#8B5CF6", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            style={styles.profileImageContainer}
          >
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.profileImage}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.textContainer}
          >
            <Text style={styles.name}>Emmanuel Adoum</Text>
            <Text style={styles.major}>
              Computer Engineering • Class of 2027
            </Text>
          </Animated.View>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <Animated.View
            entering={FadeInRight.delay(600).springify()}
            style={styles.statItem}
          >
            <Text style={styles.statValue}>{gpa}</Text>
            <Text style={styles.statLabel}>GPA</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(700).springify()}
            style={styles.statItem}
          >
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(800).springify()}
            style={styles.statItem}
          >
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </Animated.View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress("about", 0)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "about" && styles.activeTabText,
              ]}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress("achievements", 1)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "achievements" && styles.activeTabText,
              ]}
            >
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress("courses", 2)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "courses" && styles.activeTabText,
              ]}
            >
              Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress("activities", 3)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "activities" && styles.activeTabText,
              ]}
            >
              Activities
            </Text>
          </TouchableOpacity>
          <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
        </View>

        {activeTab === "about" && (
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.contentContainer}
          >
            <PersonalInfo
              data={personalInfo}
              onTogglePrivacy={togglePersonalInfoPrivacy}
            />

            <AcademicInfo
              gpa={gpa}
              major="Computer Engineering"
              classYear="2027"
              isGPAPrivate={isGPAPrivate}
              onToggleGPAPrivacy={toggleGPAPrivacy}
            />

            <Text style={[styles.sectionTitle, styles.marginTop]}>
              About Me
            </Text>
            <View style={styles.aboutContent}>
            <Text style={styles.aboutText}>
              Passionate computer engineering student with a keen interest in
              artificial intelligence and machine learning. Always eager to
              learn and collaborate on innovative projects. I believe in the
              power of technology to transform lives and am committed to using
              my skills to make a positive impact in my community and beyond.
            </Text>
            </View>
          </Animated.View>
        )}

        {activeTab === "achievements" && (
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.contentContainer}
          >
            <AchievementSection
              title="Leadership"
              achievements={[
                "Student Government Representative",
                "Computer Science Society President",
                "Peer Mentor for Freshman Students",
              ]}
            />
            <AchievementSection
              title="Scholarship"
              achievements={[
                "Dean's List - Fall 2023",
                "Academic Excellence Scholarship Recipient",
                "1st Place, Ashesi Coding Competition 2023",
              ]}
            />
            <AchievementSection
              title="Citizenship"
              achievements={[
                "Volunteer, Community Outreach Program",
                "Organizer, Campus Sustainability Initiative",
                "Participant, Ashesi Robotics Workshop for High School Students",
              ]}
            />
          </Animated.View>
        )}

        {activeTab === "courses" && (
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.contentContainer}
          >
            <CourseSection
              title="Current Courses"
              courses={[
                "Data Structures and Algorithms",
                "Web Technologies",
                "Calculus II",
                "African Studies",
              ]}
              iconName="book-outline"
              iconColor="#8B5CF6"
            />
            <CourseSection
              title="Completed Courses"
              courses={[
                "Introduction to Computing",
                "Discrete Mathematics",
                "Calculus I",
                "Written and Oral Communication",
                "Introduction to Engineering",
                "Introduction to Design Thinking",
                "Electronics and Circuits",
                "Introduction to Computer Programming",
              ]}
              iconName="checkmark-circle-outline"
              iconColor="#10B981"
            />
          </Animated.View>
        )}

        {activeTab === "activities" && (
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.contentContainer}
          >
            <ActivitySection
              activities={[
                {
                  title: "Computer Science Society",
                  description: "President, Event Organizer",
                  icon: "people",
                  color: "#8B5CF6",
                },
                {
                  title: "Intramural Soccer Team",
                  description: "Team Captain",
                  icon: "football",
                  color: "#10B981",
                },
                {
                  title: "Ashesi Choir",
                  description: "Member",
                  icon: "musical-notes",
                  color: "#F59E0B",
                },
                {
                  title: "Model United Nations",
                  description: "Delegate",
                  icon: "globe",
                  color: "#EC4899",
                },
              ]}
            />
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFF",
    overflow: "hidden",
    marginBottom: 16,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  major: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginTop: -20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B5CF6",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 20,
    position: "relative",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#8B5CF6",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width / 4,
    height: 3,
    backgroundColor: "#8B5CF6",
    borderRadius: 3,
  },
  contentContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  marginTop: {
    marginTop: 20,
  },
  aboutText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  aboutContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementSection: {
    marginBottom: 20,
  },
  achievementSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  courseText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  completedCoursesText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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

export default ProfileScreen;