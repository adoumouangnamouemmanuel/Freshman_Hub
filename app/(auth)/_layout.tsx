import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen
        name="admin-choice"
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="signup-request" />
    </Stack>
  );
}
