import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListItem from "@/components/chat/ChatListItem";
import CommunityChat from "@/components/chat/CommunityChat";
import CustomBottomNavigation from "@/components/CustomBottomNavigation";
import Header from "@/components/common/Header";

const ChatScreen = () => {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const routes = [
    { key: "private", title: "Private", icon: "chatbubbles-outline" },
    { key: "community", title: "Community", icon: "people-outline" },
  ];

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

  const renderScene = () => {
    switch (routes[index].key) {
      case "private":
        return (
          <View>
            {privateChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                name={chat.name}
                avatar={chat.avatar}
                lastMessage={chat.lastMessage}
                onPress={() => router.push(`/chat/private?id=${chat.id}`)}
              />
            ))}
          </View>
        );
      case "community":
        return (
          <CommunityChat
            onChatPress={(id) => router.push(`/chat/community?id=${id}`)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Chats"showBackButton={true} />
      {/* <Appbar.Header>
        <Appbar.Content title="Chats" />
      </Appbar.Header> */}
      <Searchbar
        placeholder="Search chats"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.content}>{renderScene()}</View>
      <CustomBottomNavigation
        state={{ index, routes }}
        navigation={{
          emit: (event: { type: string; target?: string }) => ({
            defaultPrevented: false,
          }),
          navigate: (name: string) => {
            const routeIndex = routes.findIndex((route) => route.key === name);
            setIndex(routeIndex);
          },
        }}
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
  content: {
    flex: 1,
  },
});

export default ChatScreen;
