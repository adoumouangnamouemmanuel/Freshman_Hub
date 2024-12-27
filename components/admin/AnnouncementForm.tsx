import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Chip, Menu } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Announcement,
  UserGroup,
  StudentYear,
  Faculty,
} from "@/types/announcement";

interface AnnouncementFormProps {
  announcement: Partial<Announcement>;
  setAnnouncement: React.Dispatch<React.SetStateAction<Partial<Announcement>>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  announcement,
  setAnnouncement,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const { colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTargetMenu, setShowTargetMenu] = useState(false);

  const updateAnnouncement = (key: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTargetGroup = (group: UserGroup) => {
    const updatedGroups = announcement.targetGroups?.includes(group)
      ? announcement.targetGroups.filter((g) => g !== group)
      : [...(announcement.targetGroups || []), group];
    updateAnnouncement("targetGroups", updatedGroups);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {isEditing ? "Edit Announcement" : "Add New Announcement"}
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
        placeholder="Title"
        placeholderTextColor={colors.text}
        value={announcement.title}
        onChangeText={(text) => updateAnnouncement("title", text)}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
          styles.contentInput,
        ]}
        placeholder="Content"
        placeholderTextColor={colors.text}
        value={announcement.content}
        onChangeText={(text) => updateAnnouncement("content", text)}
        multiline
      />
      <TouchableOpacity
        style={[styles.input, { backgroundColor: colors.card }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: colors.text }}>
          {announcement.date
            ? announcement.date.toLocaleDateString()
            : "Select Date"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={announcement.date || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              updateAnnouncement("date", selectedDate);
            }
          }}
        />
      )}
      <View style={styles.typeContainer}>
        {(["announcement", "event", "deadline"] as const).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              announcement.type === type && { backgroundColor: colors.primary },
            ]}
            onPress={() => updateAnnouncement("type", type)}
          >
            <Text
              style={{
                color:
                  announcement.type === type ? colors.background : colors.text,
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.label, { color: colors.text }]}>Target Groups:</Text>
      <View style={styles.targetGroupsContainer}>
        {(["all", "faculty", "students", "staff"] as const).map((group) => (
          <Chip
            key={group}
            selected={announcement.targetGroups?.includes(group)}
            onPress={() => toggleTargetGroup(group)}
            style={styles.targetChip}
          >
            {group}
          </Chip>
        ))}
      </View>
      {announcement.targetGroups?.includes("students") && (
        <>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Target Majors (comma-separated)"
            placeholderTextColor={colors.text}
            value={announcement.targetMajors?.join(", ")}
            onChangeText={(text) =>
              updateAnnouncement(
                "targetMajors",
                text.split(",").map((s) => s.trim())
              )
            }
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Target Years (1-5, comma-separated)"
            placeholderTextColor={colors.text}
            value={announcement.targetYears?.join(", ")}
            onChangeText={(text) =>
              updateAnnouncement(
                "targetYears",
                text
                  .split(",")
                  .map((s) => parseInt(s.trim()) as StudentYear)
                  .filter((n) => !isNaN(n))
              )
            }
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Target Courses (comma-separated)"
            placeholderTextColor={colors.text}
            value={announcement.targetCourses?.join(", ")}
            onChangeText={(text) =>
              updateAnnouncement(
                "targetCourses",
                text.split(",").map((s) => s.trim())
              )
            }
          />
        </>
      )}
      {announcement.targetGroups?.includes("faculty") && (
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Target Faculties (comma-separated)"
          placeholderTextColor={colors.text}
          value={announcement.targetFaculties?.join(", ")}
          onChangeText={(text) =>
            updateAnnouncement(
              "targetFaculties",
              text.split(",").map((s) => s.trim() as Faculty)
            )
          }
        />
      )}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onSubmit} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  contentInput: {
    height: 80,
    textAlignVertical: "top",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  targetGroupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  targetChip: {
    margin: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default AnnouncementForm;
