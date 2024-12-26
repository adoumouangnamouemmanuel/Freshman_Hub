import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/types/user";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onEdit, onDelete }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.userItem, { backgroundColor: colors.card }]}>
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: colors.text }]}>
          {user.name}
        </Text>
        <Text style={[styles.userEmail, { color: colors.text }]}>
          {user.email}
        </Text>
        <Text style={[styles.userRole, { color: colors.primary }]}>
          {user.role}
        </Text>
        <Text style={[styles.userDetail, { color: colors.text }]}>
          Country: {user.countryOfOrigin}
        </Text>
        {user.role === "student" && (
          <>
            <Text style={[styles.userDetail, { color: colors.text }]}>
              Major: {user.major}
            </Text>
            <Text style={[styles.userDetail, { color: colors.text }]}>
              Year: {user.yearOfStudy}
            </Text>
            <Text style={[styles.userDetail, { color: colors.text }]}>
              DOB: {user.dateOfBirth?.toLocaleDateString()}
            </Text>
          </>
        )}
        {user.role === "faculty" && (
          <Text style={[styles.userDetail, { color: colors.text }]}>
            Courses: {user.coursesTaught?.join(", ")}
          </Text>
        )}
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity onPress={() => onEdit(user)}>
          <Ionicons name="create-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(user.id)}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={colors.notification}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
  },
  userRole: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  userDetail: {
    fontSize: 12,
    marginTop: 2,
  },
  userActions: {
    flexDirection: "row",
    gap: 16,
  },
});

export default UserItem;
