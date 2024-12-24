import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";

const SupportSection: React.FC = () => {
  const router = useRouter();

  type SupportOption = {
    icon: "school" | "people" | "map" | "help-circle";
    title: string;
    color: string;
    route: string;
  };

  const supportOptions: SupportOption[] = [
    {
      icon: "school",
      title: "Academic Coaching",
      color: "#8B5CF6",
      route: "(routes)/coaching",
    },
    {
      icon: "people",
      title: "Buddy System",
      color: "#EC4899",
      route: "(routes)/buddies",
    },
    {
      icon: "map",
      title: "Campus Navigation",
      color: "#10B981",
      route: "/navigation",
    },
    {
      icon: "help-circle",
      title: "Help Center",
      color: "#F59E0B",
      route: "(routes)/help",
    },
  ];

  return (
    <Animated.View
      entering={FadeInUp.duration(800).springify()}
      style={styles.container}
    >
      <Text style={styles.title}>Support & Resources</Text>
      <View style={styles.optionsContainer}>
        {supportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => router.push(option.route as any)}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: option.color }]}
            >
              <Ionicons name={option.icon} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionTitle}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  option: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SupportSection;
