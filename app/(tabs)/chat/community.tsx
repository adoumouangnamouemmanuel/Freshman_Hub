import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Appbar, TextInput, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CommunityChat = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState("");

  // Mock data for messages
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Welcome to the community chat!",
      sender: "System",
      timestamp: "10:00 AM",
    },
    { id: "2", text: "Hi everyone!", sender: "User1", timestamp: "10:01 AM" },
    {
      id: "3",
      text: "Hello! Excited to be here.",
      sender: "User2",
      timestamp: "10:02 AM",
    },
    // Add more mock messages as needed
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        {
          id: Date.now().toString(),
          text: message,
          sender: "Me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...messages,
      ]);
      setMessage("");
    }
  };

  const renderMessage = ({ item }: { item: { id: string; text: string; sender: string; timestamp: string } }) => (
    <View style={styles.messageBubble}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Freshman General" />
      </Appbar.Header>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <IconButton
          icon="send"
          size={24}
          onPress={sendMessage}
          disabled={!message.trim()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 10,
    color: "#999",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
});

export default CommunityChat;
