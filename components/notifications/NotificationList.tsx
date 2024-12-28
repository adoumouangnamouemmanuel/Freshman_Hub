import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import NotificationItem, { Notification } from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationPress: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationPress,
}) => {
  const { colors } = useTheme();

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No notifications
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationItem notification={item} onPress={onNotificationPress} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default NotificationList;