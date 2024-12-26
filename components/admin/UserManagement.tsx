import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import UserItem from "./UserItem";
import AddUserForm from "./AddUserForm";
import { User } from "@/types/user";
import { MOCK_USERS } from "@/constants/mockData";

const UserManagement: React.FC = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (newUser: Partial<User>) => {
    const userToAdd: User = {
      ...newUser,
      id: (users.length + 1).toString(),
    } as User;
    setUsers([...users, userToAdd]);
    setShowAddUser(false);
  };

  const handleEditUser = (updatedUser: Partial<User>) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setUsers(users.filter((user) => user.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
      <Button
        mode="contained"
        onPress={() => setShowAddUser(true)}
        style={styles.addButton}
      >
        Add User
      </Button>
      {(showAddUser || editingUser) && (
        <AddUserForm
          onSubmit={editingUser ? handleEditUser : handleAddUser}
          onCancel={() => {
            setShowAddUser(false);
            setEditingUser(null);
          }}
          initialUser={editingUser || undefined}
        />
      )}
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onEdit={(user) => setEditingUser(user)}
            onDelete={handleDeleteUser}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.userList}
        contentContainerStyle={styles.userListContent}
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
  addButton: {
    marginBottom: 16,
  },
  userList: {
    flex: 1,
  },
  userListContent: {
    paddingBottom: 16,
  },
});

export default UserManagement;
