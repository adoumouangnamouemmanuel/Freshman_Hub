import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

interface NotificationItemProps {
  notification: Notification;
  onPress: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const { colors } = useTheme();

  const getIconName = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "information-circle";
      case "warning":
        return "warning";
      case "success":
        return "checkmark-circle";
      case "error":
        return "alert-circle";
      default:
        return "ellipse";
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return colors.primary;
      case "warning":
        return colors.notification;
      case "success":
        return colors.primary;
      case "error":
        return colors.notification;
      default:
        return colors.text;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: notification.read ? colors.card : colors.background,
        },
      ]}
      onPress={() => onPress(notification.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(notification.type)}
          size={24}
          color={getIconColor(notification.type)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {notification.title}
        </Text>
        <Text
          style={[styles.message, { color: colors.text }]}
          numberOfLines={2}
        >
          {notification.message}
        </Text>
        <Text style={[styles.timestamp, { color: colors.text }]}>
          {notification.timestamp.toLocaleString()}
        </Text>
      </View>
      {!notification.read && (
        <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default NotificationItem;