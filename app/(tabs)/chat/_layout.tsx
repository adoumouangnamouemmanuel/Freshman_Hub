import React from "react";
import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="private" options={{ headerShown: false }} />
      {/* <Stack.Screen name="community" options={{ headerShown: false }} /> */}
    </Stack>
  );
}