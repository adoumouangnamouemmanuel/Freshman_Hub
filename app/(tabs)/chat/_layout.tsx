import React from "react";
import { Stack } from "expo-router";
import { Portal, FAB } from "react-native-paper";
import { usePathname, useRouter } from "expo-router";

export default function ChatLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const isChatTab = pathname === "/chat";

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="private" options={{ headerShown: false }} />
        <Stack.Screen name="community" options={{ headerShown: false }} />
      </Stack>
      {isChatTab && (
        <Portal>
          <FAB
            icon="plus"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 70,
            }}
            onPress={() => router.push("/chat/new-chat")}
          />
        </Portal>
      )}
    </>
  );
}