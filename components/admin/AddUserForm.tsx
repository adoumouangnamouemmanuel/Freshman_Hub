import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { User } from "@/types/user";

interface AddUserFormProps {
  onSubmit: (user: Partial<User>) => void;
  onCancel: () => void;
  initialUser?: Partial<User>;
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  onSubmit,
  onCancel,
  initialUser,
}) => {
  const { colors } = useTheme();
  const [user, setUser] = useState<Partial<User>>(
    initialUser || { role: "student" }
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (user.name && user.email && user.role && user.countryOfOrigin) {
      onSubmit(user);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>
          {initialUser ? "Edit User" : "Add New User"}
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Full Name"
          placeholderTextColor={colors.text}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.text}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
          placeholder="Country of Origin"
          placeholderTextColor={colors.text}
          value={user.countryOfOrigin}
          onChangeText={(text) => setUser({ ...user, countryOfOrigin: text })}
        />
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              user.role === "student" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setUser({ ...user, role: "student" })}
          >
            <Text
              style={[
                styles.roleButtonText,
                {
                  color:
                    user.role === "student" ? colors.background : colors.text,
                },
              ]}
            >
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              user.role === "faculty" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setUser({ ...user, role: "faculty" })}
          >
            <Text
              style={[
                styles.roleButtonText,
                {
                  color:
                    user.role === "faculty" ? colors.background : colors.text,
                },
              ]}
            >
              Faculty
            </Text>
          </TouchableOpacity>
        </View>
        {user.role === "student" && (
          <>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
              ]}
              placeholder="Major"
              placeholderTextColor={colors.text}
              value={user.major}
              onChangeText={(text) => setUser({ ...user, major: text })}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.card, color: colors.text },
              ]}
              placeholder="Year of Study"
              placeholderTextColor={colors.text}
              value={user.yearOfStudy?.toString()}
              onChangeText={(text) =>
                setUser({ ...user, yearOfStudy: parseInt(text) || undefined })
              }
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.input, { backgroundColor: colors.card }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: colors.text }}>
                {user.dateOfBirth
                  ? user.dateOfBirth.toLocaleDateString()
                  : "Select Date of Birth"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={user.dateOfBirth || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setUser({ ...user, dateOfBirth: selectedDate });
                  }
                }}
              />
            )}
          </>
        )}
        {user.role === "faculty" && (
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.card, color: colors.text },
            ]}
            placeholder="Courses Taught (comma-separated)"
            placeholderTextColor={colors.text}
            value={user.coursesTaught?.join(", ")}
            onChangeText={(text) =>
              setUser({
                ...user,
                coursesTaught: text.split(",").map((course) => course.trim()),
              })
            }
          />
        )}
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            {initialUser ? "Update" : "Add"} User
          </Button>
          <Button mode="outlined" onPress={onCancel} style={styles.button}>
            Cancel
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  roleButtonText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default AddUserForm;
