import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  unreadCount: number;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeFilter,
  onFilterChange,
  unreadCount,
}) => {
  const { colors } = useTheme();

  const filters = ["All", "Unread", "Read"];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <Button
          key={filter}
          mode={activeFilter === filter ? "contained" : "outlined"}
          onPress={() => onFilterChange(filter)}
          style={styles.filterButton}
          labelStyle={{
            color: activeFilter === filter ? colors.background : colors.primary,
          }}
        >
          {filter === "Unread" ? `${filter} (${unreadCount})` : filter}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filterButton: {
    minWidth: 80,
  },
});

export default NotificationFilters;