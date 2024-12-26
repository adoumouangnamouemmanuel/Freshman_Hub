import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
}

const Announcements: React.FC = () => {
  const { colors } = useTheme();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date(),
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: "", content: "" });
      setIsAdding(false);
    }
  };

  const deleteAnnouncement = (id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this announcement?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            setAnnouncements(announcements.filter((a) => a.id !== id)),
        },
      ]
    );
  };

  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <View style={[styles.announcementItem, { backgroundColor: colors.card }]}>
      <View>
        <Text style={[styles.announcementTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.announcementContent, { color: colors.text }]}>
          {item.content}
        </Text>
        <Text style={[styles.announcementDate, { color: colors.text }]}>
          {item.date.toLocaleDateString()}
        </Text>
      </View>
      <Button
        icon="delete"
        onPress={() => deleteAnnouncement(item.id)}
        color={colors.notification}
      >
        Delete
      </Button>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Announcements</Text>
      <Button
        mode="contained"
        onPress={() => setIsAdding(true)}
        style={styles.addButton}
      >
        Add Announcement
      </Button>
      {isAdding && (
        <View style={styles.addForm}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Announcement Title"
            placeholderTextColor={colors.text}
            value={newAnnouncement.title}
            onChangeText={(text) =>
              setNewAnnouncement({ ...newAnnouncement, title: text })
            }
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Announcement Content"
            placeholderTextColor={colors.text}
            value={newAnnouncement.content}
            onChangeText={(text) =>
              setNewAnnouncement({ ...newAnnouncement, content: text })
            }
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={addAnnouncement}
              style={styles.button}
            >
              Add
            </Button>
            <Button
              mode="outlined"
              onPress={() => setIsAdding(false)}
              style={styles.button}
            >
              Cancel
            </Button>
          </View>
        </View>
      )}
      <FlatList
        data={announcements}
        renderItem={renderAnnouncementItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 16,
  },
  addForm: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  list: {
    flex: 1,
  },
  announcementItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  announcementContent: {
    fontSize: 14,
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default Announcements;
