import { Stack } from "expo-router";

export default function SupportCenterLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen name="coaching/index" options={{ headerShown: false }} />
          <Stack.Screen name="buddies/index" options={{ headerShown: false }} />
          <Stack.Screen name="campus-navigation/index" options={{ headerShown: false }} />
      <Stack.Screen name="help" options={{ headerShown: false }} />
    </Stack>
  );
}
