import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

export default function SignUpRequestScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [reason, setReason] = useState("");
  const { colors } = useTheme();

  const handleSubmit = () => {
    // Here you would typically send this data to your backend
    console.log({ name, email, studentId, reason });
    Alert.alert(
      "Request Submitted",
      "Your sign-up request has been submitted for review.",
      [{ text: "OK", onPress: () => router.replace("/(auth)/login") }]
    );
  };

  const isSubmitDisabled = !name || !email || !studentId || !reason;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>
          Sign Up Request
        </Text>
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Student ID"
          value={studentId}
          onChangeText={setStudentId}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Reason for Request"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={4}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          disabled={isSubmitDisabled}
        >
          Submit Request
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
