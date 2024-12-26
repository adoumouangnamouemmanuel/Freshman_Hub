import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface AdminHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { colors } = useTheme();

  const sections = [
    { id: "overview", icon: "grid-outline", label: "Overview" },
    { id: "users", icon: "people-outline", label: "Users" },
    { id: "Announcement", icon: "megaphone-outline", label: "Events" },
    { id: "content", icon: "document-text-outline", label: "Content" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Admin Dashboard
      </Text>
      <View style={styles.tabContainer}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.tab,
              activeSection === section.id && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => onSectionChange(section.id)}
          >
            <Ionicons
              name={section.icon as any}
              size={24}
              color={
                activeSection === section.id ? colors.background : colors.text
              }
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeSection === section.id
                      ? colors.background
                      : colors.text,
                },
              ]}
            >
              {section.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tabText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AdminHeader;
