import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface PrivacyToggleProps {
  isPrivate: boolean;
  onToggle: () => void;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  isPrivate,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isPrivate ? "Private" : "Public"}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={isPrivate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default PrivacyToggle;