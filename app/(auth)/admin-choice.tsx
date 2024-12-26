import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { useAuthContext } from "@/components/auth/authProvider";

export default function AdminChoiceScreen() {
  const { colors } = useTheme();
  const { user } = useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/(tabs)");
    }
  }, [user]);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      navigation.removeListener("beforeRemove", () => {});
    };
  }, [navigation]);

  if (!user || user.role !== "admin") {
    return null; // or a loading indicator
  }

  const handleChoice = (choice: "admin" | "faculty") => {
    if (choice === "admin") {
      router.push("/admin");
    } else {
      router.push("/(tabs)");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Choose Login Type
      </Text>
      <Button
        mode="contained"
        onPress={() => handleChoice("admin")}
        style={styles.button}
      >
        Login as Admin
      </Button>
      <Button
        mode="outlined"
        onPress={() => handleChoice("faculty")}
        style={styles.button}
      >
        Login as Faculty
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
  },
});
