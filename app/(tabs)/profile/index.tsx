import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import  ProfileScreen  from "@/screens/profile/profileScreen";

const ProfileScreens: React.FC = () => {
  const router = useRouter();
  const { user, login, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    try {
      login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {isAuthenticated ? (
        <>
          <Text style={styles.text}>Welcome, {user?.name}</Text>
          <Text style={styles.text}>Role: {user?.role}</Text>
          <Button mode="contained" onPress={logout} style={styles.button}>
            Logout
          </Button>
          {user?.role === "STUDENT" && (
            <Button
              mode="contained"
              onPress={() => router.push("/profile")}
              style={styles.button}
            >
              Your profile
            </Button>
          )}
          {user?.role === "ADMIN" && (
            <Button
              mode="contained"
              onPress={() => router.push("/admin")}
              style={styles.button}
            >
              Admin Panel
            </Button>
          )}
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
        </>
      )}
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
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default ProfileScreens;
