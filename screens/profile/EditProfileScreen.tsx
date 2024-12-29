import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button, Text, Avatar, Dialog, Portal, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/common/Header";
import * as ImagePicker from "expo-image-picker";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  major: string;
  graduationYear: string;
  bio: string;
  achievements: {
    leadership: string[];
    scholarship: string[];
    citizenship: string[];
  };
  courses: {
    current: string[];
    completed: string[];
  };
  activities: {
    title: string;
    role: string;
  }[];
}

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("https://picsum.photos/200");
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Emmanuel Adoum",
    email: "emmanuel.adoum@ashesi.edu.gh",
    phone: "+233 50 123 4567",
    major: "Computer Engineering",
    graduationYear: "2027",
    bio: "Passionate computer engineering student with a keen interest in artificial intelligence and machine learning. Always eager to learn and collaborate on innovative projects.",
    achievements: {
      leadership: [
        "Student Government Representative",
        "Computer Science Society President",
        "Peer Mentor for Freshman Students",
      ],
      scholarship: [
        "Dean's List - Fall 2023",
        "Academic Excellence Scholarship Recipient",
        "1st Place, Ashesi Coding Competition 2023",
      ],
      citizenship: [
        "Volunteer, Community Outreach Program",
        "Organizer, Campus Sustainability Initiative",
        "Participant, Ashesi Robotics Workshop for High School Students",
      ],
    },
    courses: {
      current: [
        "Data Structures and Algorithms",
        "Web Technologies",
        "Calculus II",
        "African Studies",
      ],
      completed: [
        "Introduction to Computing",
        "Discrete Mathematics",
        "Calculus I",
        "Written and Oral Communication",
      ],
    },
    activities: [],
  });
  const [activities, setActivities] = useState({
    current: [
      { title: "Computer Science Society", role: "President, Event Organizer" },
      { title: "Intramural Soccer Team", role: "Team Captain" },
    ],
    past: [
      { title: "Ashesi Choir", role: "Member" },
      { title: "Model United Nations", role: "Delegate" },
    ],
  });

  const handleInputChange = (key: keyof ProfileData, value: any) => {
    setProfileData((prevData) => ({ ...prevData, [key]: value }));
    setIsUnsavedChanges(true);
  };

  const handleSave = () => {
    if (isUnsavedChanges) {
      setShowSaveDialog(true);
    } else {
      router.back();
    }
  };

  const handleDiscard = () => {
    if (isUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      router.back();
    }
  };

  const confirmSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile data:", profileData);
    setIsUnsavedChanges(false);
    setShowSaveDialog(false);
    router.back();
  };

  const confirmDiscard = () => {
    setIsUnsavedChanges(false);
    setShowDiscardDialog(false);
    router.back();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setIsUnsavedChanges(true);
    }
  };

  const renderAchievementSection = (title: string, achievements: string[]) => (
    <List.Accordion title={title} style={styles.accordion}>
      {achievements.map((achievement, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={achievement}
          onChangeText={(text) => {
            const newAchievements = [...achievements];
            newAchievements[index] = text;
            handleInputChange("achievements", {
              ...profileData.achievements,
              [title.toLowerCase()]: newAchievements,
            });
          }}
        />
      ))}
      <Button
        mode="outlined"
        onPress={() => {
          const newAchievements = [...achievements, ""];
          handleInputChange("achievements", {
            ...profileData.achievements,
            [title.toLowerCase()]: newAchievements,
          });
        }}
      >
        Add {title} Achievement
      </Button>
    </List.Accordion>
  );

  const renderActivitySection = (
    title: string,
    activities: { title: string; role: string }[]
  ) => (
    <List.Accordion title={title} style={styles.accordion}>
      {activities.map((activity, index) => (
        <View key={index} style={styles.activityContainer}>
          <TextInput
            style={styles.input}
            value={activity.title}
            onChangeText={(text) => {
              const newActivities = [...activities];
              newActivities[index].title = text;
              setActivities((prev) => ({
                ...prev,
                [title.toLowerCase()]: newActivities,
              }));
            }}
            placeholder="Activity Title"
          />
          <TextInput
            style={styles.input}
            value={activity.role}
            onChangeText={(text) => {
              const newActivities = [...activities];
              newActivities[index].role = text;
              setActivities((prev) => ({
                ...prev,
                [title.toLowerCase()]: newActivities,
              }));
            }}
            placeholder="Your Role"
          />
        </View>
      ))}
      <Button
        mode="outlined"
        onPress={() => {
          const newActivities = [...activities, { title: "", role: "" }];
          setActivities((prev) => ({
            ...prev,
            [title.toLowerCase()]: newActivities,
          }));
        }}
      >
        Add {title} Activity
      </Button>
    </List.Accordion>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        title="Edit Profile"
        showBackButton={true}
        rightIcon="checkmark"
        onRightIconPress={handleSave}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Avatar.Image size={120} source={{ uri: profileImage }} />
          <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.aboutContent}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.readOnlyText}>{profileData.name}</Text>
          </View>
          <View style={styles.aboutContent}>
            <Text style={styles.label}>Email: </Text>
            <Text style={styles.readOnlyText}>{profileData.email}</Text>
          </View>

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
          />

          <View style={styles.aboutContent}>
            <Text style={styles.label}>Major: </Text>
            <Text style={styles.readOnlyText}>{profileData.major}</Text>
          </View>
          <View style={styles.aboutContent}>
            <Text style={styles.label}>Graduation Year: </Text>
            <Text style={styles.readOnlyText}>
              {profileData.graduationYear}
            </Text>
          </View>

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={profileData.bio}
            onChangeText={(text) => handleInputChange("bio", text)}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.sectionTitle}>Achievements</Text>
          {renderAchievementSection(
            "Leadership",
            profileData.achievements.leadership
          )}
          {renderAchievementSection(
            "Scholarship",
            profileData.achievements.scholarship
          )}
          {renderAchievementSection(
            "Citizenship",
            profileData.achievements.citizenship
          )}

          <Text style={styles.sectionTitle}>Courses</Text>
          <List.Accordion title="Current Courses" style={styles.accordion}>
            {profileData.courses.current.map((course, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={course}
                onChangeText={(text) => {
                  const newCourses = [...profileData.courses.current];
                  newCourses[index] = text;
                  handleInputChange("courses", {
                    ...profileData.courses,
                    current: newCourses,
                  });
                }}
              />
            ))}
            <Button
              mode="outlined"
              onPress={() => {
                const newCourses = [...profileData.courses.current, ""];
                handleInputChange("courses", {
                  ...profileData.courses,
                  current: newCourses,
                });
              }}
            >
              Add Current Course
            </Button>
          </List.Accordion>

          <List.Accordion title="Completed Courses" style={styles.accordion}>
            {profileData.courses.completed.map((course, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={course}
                onChangeText={(text) => {
                  const newCourses = [...profileData.courses.completed];
                  newCourses[index] = text;
                  handleInputChange("courses", {
                    ...profileData.courses,
                    completed: newCourses,
                  });
                }}
              />
            ))}
            <Button
              mode="outlined"
              onPress={() => {
                const newCourses = [...profileData.courses.completed, ""];
                handleInputChange("courses", {
                  ...profileData.courses,
                  completed: newCourses,
                });
              }}
            >
              Add Completed Course
            </Button>
          </List.Accordion>

          <Text style={styles.sectionTitle}>Activities</Text>
          {renderActivitySection("Current", activities.current)}
          {renderActivitySection("Past", activities.past)}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save Changes
        </Button>
        <Button
          mode="outlined"
          onPress={handleDiscard}
          style={styles.discardButton}
        >
          Discard Changes
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={showDiscardDialog}
          onDismiss={() => setShowDiscardDialog(false)}
        >
          <Dialog.Title>Discard Changes?</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to discard your changes?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDiscardDialog(false)}>Cancel</Button>
            <Button onPress={confirmDiscard}>Discard</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={showSaveDialog}
          onDismiss={() => setShowSaveDialog(false)}
        >
          <Dialog.Title>Save Changes?</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to save your changes?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button onPress={confirmSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#8B5CF6",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  aboutContent: {
    backgroundColor: '#eee',
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
    }
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4B5563",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    padding: 20,
  },
  saveButton: {
    marginBottom: 10,
    backgroundColor: "#8B5CF6",
  },
  discardButton: {
    borderColor: "#8B5CF6",
  },
  readOnlyText: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#1F2937",
  },
  accordion: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  activityContainer: {
    marginBottom: 15,
  },
});

export default EditProfileScreen;
