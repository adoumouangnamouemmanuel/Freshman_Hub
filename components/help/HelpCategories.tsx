import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from 'expo-router';

interface HelpCategoriesProps {
  onCategoryPress: (category: string) => void;
}

const HelpCategories: React.FC<HelpCategoriesProps> = ({ onCategoryPress }) => {
  // const router = useRouter();

  const helpCategories = [
    { title: "Academic Support", icon: "school", color: "#4CAF50" },
    { title: "Mental Health", icon: "heart", color: "#E91E63" },
    { title: "Financial Aid", icon: "cash", color: "#FFC107" },
    { title: "Campus Life", icon: "home", color: "#2196F3" },
    { title: "Career Services", icon: "briefcase", color: "#9C27B0" },
    { title: "IT Support", icon: "laptop", color: "#FF5722" },
  ];

  const renderHelpCategory = (category: { title: string; icon: string; color: string }) => (
    <TouchableOpacity
      key={category.title}
      style={styles.categoryCard}
      onPress={() => onCategoryPress(category.title)}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        <Ionicons name={category.icon as any} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.categoryTitle}>{category.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoriesContainer}>
      {helpCategories.map(renderHelpCategory)}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default HelpCategories;
