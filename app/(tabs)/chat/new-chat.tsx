import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Appbar, List, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const NewChatScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const contacts = [
    { id: "1", name: "John Doe", avatar: "https://picsum.photos/200" },
    { id: "2", name: "Jane Smith", avatar: "https://picsum.photos/201" },
    // Add more contacts as needed
  ];

  const renderItem = ({ item }: { item: { id: string; name: string; avatar: string } }) => (
    <List.Item
      title={item.name}
      left={(props) => <List.Icon {...props} icon="account" />}
      onPress={() => router.push(`/chat/private?id=${item.id}`)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="New Chat" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search contacts"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
});

export default NewChatScreen;
