import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Announcement, UserGroup } from "@/types/announcement";

interface FilterButtonsProps {
  filterType: "all" | "current" | "past";
  setFilterType: (type: "all" | "current" | "past") => void;
  filterCategory: Announcement["type"] | "all";
  setFilterCategory: (category: Announcement["type"] | "all") => void;
  filterUserGroup: UserGroup | "all";
  setFilterUserGroup: (group: UserGroup | "all") => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  filterUserGroup,
  setFilterUserGroup,
}) => {
  const { colors } = useTheme();
  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false);
  const [showUserGroupMenu, setShowUserGroupMenu] = React.useState(false);

  return (
    <View style={styles.filterContainer}>
      {(["all", "current", "past"] as const).map((type) => (
        <Button
          key={type}
          mode={filterType === type ? "contained" : "outlined"}
          onPress={() => setFilterType(type)}
          style={styles.filterButton}
          icon={() => (
            <Feather
              name="clock"
              size={18}
              color={filterType === type ? colors.background : colors.text}
            />
          )}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      ))}
      <Menu
        visible={showCategoryMenu}
        onDismiss={() => setShowCategoryMenu(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setShowCategoryMenu(true)}
            style={styles.filterButton}
            icon={() => <Feather name="tag" size={18} color={colors.text} />}
          >
            {filterCategory === "all" ? "All Categories" : filterCategory}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setFilterCategory("all");
            setShowCategoryMenu(false);
          }}
          title="All Categories"
        />
        <Menu.Item
          onPress={() => {
            setFilterCategory("announcement");
            setShowCategoryMenu(false);
          }}
          title="Announcement"
        />
        <Menu.Item
          onPress={() => {
            setFilterCategory("event");
            setShowCategoryMenu(false);
          }}
          title="All eventsssssssss"
        />
        <Menu.Item
          onPress={() => {
            setFilterCategory("deadline");
            setShowCategoryMenu(false);
          }}
          title="Deadline"
        />
      </Menu>
      <Menu
        visible={showUserGroupMenu}
        onDismiss={() => setShowUserGroupMenu(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setShowUserGroupMenu(true)}
            style={styles.filterButton}
            icon={() => <Feather name="users" size={18} color={colors.text} />}
          >
            {filterUserGroup === "all" ? "All Groups" : filterUserGroup}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setFilterUserGroup("all");
            setShowUserGroupMenu(false);
          }}
          title="All Groups"
        />
        <Menu.Item
          onPress={() => {
            setFilterUserGroup("students");
            setShowUserGroupMenu(false);
          }}
          title="Students"
        />
        <Menu.Item
          onPress={() => {
            setFilterUserGroup("faculty");
            setShowUserGroupMenu(false);
          }}
          title="Faculty"
        />
        <Menu.Item
          onPress={() => {
            setFilterUserGroup("staff");
            setShowUserGroupMenu(false);
          }}
          title="Staff"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
        marginBottom: 16,
    flexWrap: "wrap",
  },
  filterButton: {
      flex: 1,
      gap: 8,
    marginHorizontal: 4,
    marginBottom: 8,
  },
});

export default FilterButtons;
