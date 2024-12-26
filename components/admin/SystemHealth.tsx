import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SystemHealth: React.FC = () => {
  const { colors } = useTheme();

  const healthItems = [
    {
      label: "Server Status",
      status: "Operational",
      icon: "server-outline",
      color: "#4CAF50",
    },
    {
      label: "Database",
      status: "Healthy",
      icon: "cube-outline",
      color: "#4CAF50",
    },
    {
      label: "API Response Time",
      status: "120ms",
      icon: "timer-outline",
      color: "#FFC107",
    },
    {
      label: "Storage",
      status: "65% Used",
      icon: "hardware-chip-outline",
      color: "#FF9800",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>System Health</Text>
      <View style={styles.healthGrid}>
        {healthItems.map((item, index) => (
          <View
            key={index}
            style={[styles.healthItem, { backgroundColor: colors.card }]}
          >
            <Ionicons name={item.icon as any} size={24} color={item.color} />
            <Text style={[styles.healthLabel, { color: colors.text }]}>
              {item.label}
            </Text>
            <Text style={[styles.healthStatus, { color: item.color }]}>
              {item.status}
            </Text>
          </View>
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
  healthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  healthItem: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  healthLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  healthStatus: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default SystemHealth;
