import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const { colors } = useTheme();

  const filters = ["All", "Unread", "Read"];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
          {filter}
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
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  filterButton: {
    minWidth: 80,
  },
});

export default NotificationFilters;