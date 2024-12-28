import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, ListRenderItem } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationFilters from "@/components/notifications/NotificationFilters";
import NotificationItem, { Notification } from "@/components/notifications/NotificationItem";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
 useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";

import Header from "@/components/home/header";

const HEADER_HEIGHT = 100;
const FILTERS_HEIGHT = 60;

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New message",
    message: "You have a new message from John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Assignment due",
    message: 'Your assignment "React Native Basics" is due tomorrow',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: true,
    type: "warning",
  },
  {
    id: "3",
    title: "Grade posted",
    message: 'Your grade for "Advanced JavaScript" has been posted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: "success",
  },
  {
    id: "4",
    title: "System maintenance",
    message:
      "The system will be undergoing maintenance tonight from 2 AM to 4 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "error",
  },
  {
    id: "5",
    title: "New course available",
    message:
      'A new course "Machine Learning Fundamentals" is now open for registration',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: false,
    type: "info",
  },
  {
    id: "6",
    title: "Campus event",
    message: "Don't miss the annual Spring Festival this weekend!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    type: "success",
  },
  {
    id: "7",
    title: "Library reminder",
    message:
      "The books you borrowed are due in 3 days. Please return or renew them.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    read: false,
    type: "warning",
  },
  {
    id: "8",
    title: "Software update",
    message:
      "Please update your student portal app to the latest version for new features",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    read: true,
    type: "info",
  },
];

const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const isScrollingDown = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      isScrollingDown.value = currentScrollY > lastScrollY.value;
      lastScrollY.value = currentScrollY;
      scrollY.value = currentScrollY;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: isScrollingDown.value ? translateY : 0 }],
    };
  });

  const filtersStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  const handleNotificationPress = useCallback((id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !notification.read;
    if (activeFilter === "Read") return notification.read;
    return true;
  });

  const renderItem: ListRenderItem<Notification> = useCallback(
    ({ item }) => (
      <NotificationItem notification={item} onPress={handleNotificationPress} />
    ),
    [handleNotificationPress]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Animated.View style={[styles.headerContainer, headerStyle]}>
        <Header
          temperature={25}
          profileImage="https://picsum.photos/100"
          onProfilePress={() => {}}
          scrollY={scrollY}
          isScrollingDown={isScrollingDown}
        />
      </Animated.View>
      <Animated.View style={[styles.filtersContainer, filtersStyle]}>
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </Animated.View>
      <Animated.FlatList
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + FILTERS_HEIGHT }}
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: HEADER_HEIGHT,
  },
  filtersContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: FILTERS_HEIGHT,
  },
});

export default NotificationsScreen;