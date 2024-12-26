import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";

const Settings: React.FC = () => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNotifications = () =>
    setNotifications((previousState) => !previousState);
  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>
          Enable Notifications
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={notifications ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={notifications}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => console.log("Save settings")}
        style={styles.saveButton}
      >
        Save Settings
      </Button>
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
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 18,
  },
  saveButton: {
    marginTop: 24,
  },
});

export default Settings;
