import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
// import { useAuthContext } from "@/components/auth/authProvider";
import { Button } from "react-native-paper";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const { signOut } = useAuthContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map/index"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "location" : "location-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="buddies/index"
        options={{
          title: "Buddies",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              color={color}
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="notifications/index"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="notification/index"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
