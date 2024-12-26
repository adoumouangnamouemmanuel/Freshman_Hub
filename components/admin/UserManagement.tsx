import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual API call
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Student" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Faculty" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Student" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={[styles.userItem, { backgroundColor: colors.card }]}>
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.userEmail, { color: colors.text }]}>
          {item.email}
        </Text>
        <Text style={[styles.userRole, { color: colors.primary }]}>
          {item.role}
        </Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity onPress={() => console.log(`Edit user ${item.id}`)}>
          <Ionicons name="create-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(`Delete user ${item.id}`)}>
          <Ionicons name="trash-outline" size={24} color={colors.notification} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        User Management
      </Text>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Ionicons name="search-outline" size={24} color={colors.text} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search users..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  userList: {
    flex: 1,
  },
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
  userActions: {
    flexDirection: "row",
    gap: 16,
  },
});

export default UserManagement;
