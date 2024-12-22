import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  BottomNavigation,
  FAB,
  Portal,
  Modal,
  List,
  Avatar,
  Searchbar,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ChatListItem from "@/components/chat/ChatListItem";
import CommunityChat from "@/components/chat/CommunityChat";

const ChatScreen = () => {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewChatModalVisible, setNewChatModalVisible] = useState(false);
  const navigation = useNavigation();

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
                onPress={() =>
                  // navigation.navigate("PrivateChat", { chatId: item.id })
                  null
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        );
      case "community":
        return <CommunityChat />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
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
                // navigation.navigate("NewPrivateChat");
              }}
            />
            <List.Item
              title="Join community chat"
              left={() => <List.Icon icon="account-group" />}
              onPress={() => {
                setNewChatModalVisible(false);
                // navigation.navigate("JoinCommunityChat");
              }}
            />
          </List.Section>
        </Modal>
      </Portal>
    </View>
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
    right: 0,
    bottom: 70,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default ChatScreen;
