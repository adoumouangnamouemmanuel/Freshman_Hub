import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface ContentItem {
  id: string;
  type: "post" | "comment";
  content: string;
  author: string;
  flags: number;
}

const ContentModeration: React.FC = () => {
  const { colors } = useTheme();
  const [selectedType, setSelectedType] = useState<"all" | "post" | "comment">(
    "all"
  );

  // Mock data - replace with actual API call
  const contentItems: ContentItem[] = [
    {
      id: "1",
      type: "post",
      content: "This is a flagged post",
      author: "User1",
      flags: 3,
    },
    {
      id: "2",
      type: "comment",
      content: "This is a flagged comment",
      author: "User2",
      flags: 2,
    },
    {
      id: "3",
      type: "post",
      content: "Another flagged post",
      author: "User3",
      flags: 5,
    },
    {
      id: "4",
      type: "post",
      content: "Another flagged post",
      author: "User3",
      flags: 5,
    },
    {
      id: "5",
      type: "post",
      content: "Another flagged post",
      author: "User3",
      flags: 5,
    },
    {
      id: "6",
      type: "post",
      content: "Another flagged post",
      author: "User3",
      flags: 5,
    },
    {
      id: "7",
      type: "comment",
      content: "Another flagged post",
      author: "User3",
      flags: 5,
    },
  ];

  const filteredContent = contentItems.filter(
    (item) => selectedType === "all" || item.type === selectedType
  );

  const renderContentItem = ({ item }: { item: ContentItem }) => (
    <View style={[styles.contentItem, { backgroundColor: colors.card }]}>
      <View style={styles.contentInfo}>
        <Text style={[styles.contentType, { color: colors.primary }]}>
          {item.type.toUpperCase()}
        </Text>
        <Text style={[styles.contentText, { color: colors.text }]}>
          {item.content}
        </Text>
        <Text style={[styles.contentAuthor, { color: colors.text }]}>
          By: {item.author}
        </Text>
        <Text style={[styles.contentFlags, { color: colors.notification }]}>
          Flags: {item.flags}
        </Text>
      </View>
      <View style={styles.contentActions}>
        <TouchableOpacity onPress={() => console.log(`Approve ${item.id}`)}>
          <Ionicons
            name="checkmark-circle-outline"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(`Remove ${item.id}`)}>
          <Ionicons
            name="close-circle-outline"
            size={24}
            color={colors.notification}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Content Moderation
      </Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === "all" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setSelectedType("all")}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color: selectedType === "all" ? colors.background : colors.text,
              },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === "post" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setSelectedType("post")}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                  selectedType === "post" ? colors.background : colors.text,
              },
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === "comment" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setSelectedType("comment")}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                  selectedType === "comment" ? colors.background : colors.text,
              },
            ]}
          >
            Comments
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredContent}
        renderItem={renderContentItem}
        keyExtractor={(item) => item.id}
        style={styles.contentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  contentList: {
    flex: 1,
  },
  contentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  contentInfo: {
    flex: 1,
  },
  contentType: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 4,
  },
  contentAuthor: {
    fontSize: 14,
    fontStyle: "italic",
  },
  contentFlags: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  contentActions: {
    flexDirection: "row",
    gap: 16,
  },
});

export default ContentModeration;
