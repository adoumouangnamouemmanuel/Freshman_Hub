import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const QuickActions: React.FC = () => {
  const { colors } = useTheme();

  const actions = [
    { id: "add-user", icon: "person-add-outline", label: "Add User" },
    { id: "announcements", icon: "megaphone-outline", label: "Announcements" },
    { id: "reports", icon: "bar-chart-outline", label: "Reports" },
    { id: "settings", icon: "settings-outline", label: "Settings" },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionButton, { backgroundColor: colors.card }]}
            onPress={() => console.log(`${action.label} pressed`)}
          >
            <Ionicons
              name={action.icon as any}
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.actionText, { color: colors.text }]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default QuickActions;
