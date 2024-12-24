import React from "react";
import { Stack } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HelpLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="academic-support" />
      <Stack.Screen name="mental-health" />
      <Stack.Screen name="financial-aid" />
      <Stack.Screen name="campus-life" />
      <Stack.Screen name="career-services" />
      <Stack.Screen name="it-support" />
    </Stack>
  );
}
