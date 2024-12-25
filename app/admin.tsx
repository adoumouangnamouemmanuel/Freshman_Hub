import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Card } from "react-native-paper";

type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

const AdminPanel: React.FC = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@ashesi.edu.gh", role: "STUDENT" },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@ashesi.edu.gh",
      role: "FACULTY",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@ashesi.edu.gh",
      role: "ADMIN",
    },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT" as "STUDENT" | "FACULTY",
  });

  const handleCreateUser = () => {
    const newUserWithId = { ...newUser, id: String(users.length + 1) };
    setUsers([...users, newUserWithId]);
    setNewUser({ name: "", email: "", password: "", role: "STUDENT" });
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <Card style={styles.userItem}>
      <Card.Content>
        <Text style={[styles.userName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.userEmail, { color: colors.text }]}>
          {item.email}
        </Text>
        <Text style={[styles.userRole, { color: colors.primary }]}>
          {item.role}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Admin Panel</Text>

      <Card style={styles.createUserForm}>
        <Card.Title title="Create New User" />
        <Card.Content>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Name"
            placeholderTextColor={colors.text}
            value={newUser.name}
            onChangeText={(text) => setNewUser({ ...newUser, name: text })}
          />
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Email"
            placeholderTextColor={colors.text}
            value={newUser.email}
            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Password"
            placeholderTextColor={colors.text}
            value={newUser.password}
            onChangeText={(text) => setNewUser({ ...newUser, password: text })}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={() =>
              setNewUser({
                ...newUser,
                role: newUser.role === "STUDENT" ? "FACULTY" : "STUDENT",
              })
            }
            style={styles.roleButton}
          >
            Role: {newUser.role}
          </Button>
          <Button
            mode="contained"
            onPress={handleCreateUser}
            style={styles.createButton}
          >
            Create User
          </Button>
        </Card.Content>
      </Card>

      <Text style={[styles.subtitle, { color: colors.text }]}>User List</Text>
      <FlatList
        data={users}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  createUserForm: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  roleButton: {
    marginBottom: 10,
  },
  createButton: {
    marginTop: 10,
  },
  userList: {
    flex: 1,
  },
  userItem: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
  },
  userRole: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default AdminPanel;
