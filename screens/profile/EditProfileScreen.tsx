import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button, Text, Avatar, Dialog, Portal } from "react-native-paper";
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
}

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("https://picsum.photos/200");
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Emmanuel Adoum",
    email: "emmanuel.adoum@ashesi.edu.gh",
    phone: "+233 50 123 4567",
    major: "Computer Engineering",
    graduationYear: "2027",
    bio: "Passionate computer engineering student with a keen interest in artificial intelligence and machine learning. Always eager to learn and collaborate on innovative projects.",
  });

  const handleInputChange = (key: keyof ProfileData, value: string) => {
    setProfileData((prevData) => ({ ...prevData, [key]: value }));
    setIsUnsavedChanges(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile data:", profileData);
    setIsUnsavedChanges(false);
    router.back();
  };

  const handleDiscard = () => {
    if (isUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      router.back();
    }
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
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Major</Text>
          <TextInput
            style={styles.input}
            value={profileData.major}
            onChangeText={(text) => handleInputChange("major", text)}
          />

          <Text style={styles.label}>Graduation Year</Text>
          <TextInput
            style={styles.input}
            value={profileData.graduationYear}
            onChangeText={(text) => handleInputChange("graduationYear", text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={profileData.bio}
            onChangeText={(text) => handleInputChange("bio", text)}
            multiline
            numberOfLines={4}
          />
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
            <Button
              onPress={() => {
                setShowDiscardDialog(false);
                router.back();
              }}
            >
              Discard
            </Button>
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
});

export default EditProfileScreen;
