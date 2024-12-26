import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthContext } from "./authProvider";

export function AuthStatus() {
  const { user } = useAuthContext();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (user) {
      setShowStatus(true);
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 3000); // Display for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!showStatus) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Successfully logged in as: {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 255, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
