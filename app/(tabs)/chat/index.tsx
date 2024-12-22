import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import {
  BottomNavigation,
  Appbar,
  Searchbar,
  FAB,
  Portal,
  Modal,
  List,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListItem from "@/components/chat/ChatListItem";
import CommunityChat from "@/components/chat/CommunityChat";

const ChatScreen = () => {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewChatModalVisible, setNewChatModalVisible] = useState(false);
  const router = useRouter();

  const [routes] = useState([
    { key: "private", title: "Private", icon: "chat" },
    { key: "community", title: "Community", icon: "account-group" },
  ]);

  const privateChats = [
    {
      id: "1",
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      lastMessage: "Hey, how are you?",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "https://picsum.photos/201",
      lastMessage: "Did you finish the assignment?",
    },
    // Add more mock data as needed
  ];

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "private":
        return (
          <FlatList
            data={privateChats}
            renderItem={({ item }) => (
              <ChatListItem
                name={item.name}
                avatar={item.avatar}
                lastMessage={item.lastMessage}
                onPress={() => router.push(`/chat/private?id=${item.id}`)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        );
      case "community":
        return (
          <CommunityChat
            onChatPress={(id) => router.push(`/chat/community?id=${id}` as any)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Appbar.Header>
        <Appbar.Content title="Chats" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search chats"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.bottomNavigation}
      />
      <Portal>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setNewChatModalVisible(true)}
        />
        <Modal
          visible={isNewChatModalVisible}
          onDismiss={() => setNewChatModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <List.Section>
            <List.Subheader>Start a new chat</List.Subheader>
            <List.Item
              title="New private chat"
              left={() => <List.Icon icon="chat" />}
              onPress={() => {
                setNewChatModalVisible(false);
                router.push("/chat/private?new=true");
              }}
            />
            <List.Item
              title="Join community chat"
              left={() => <List.Icon icon="account-group" />}
              onPress={() => {
                setNewChatModalVisible(false);
                router.push("/chat/community?new=true" as any);
              }}
            />
          </List.Section>
        </Modal>
      </Portal>
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
  bottomNavigation: {
    backgroundColor: "#ffffff",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 100,
    top: 35,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default ChatScreen;
