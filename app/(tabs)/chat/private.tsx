import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Appbar, TextInput, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivateChatScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState("");

  // Mock data for messages
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey there!", sender: "other", timestamp: "10:00 AM" },
    { id: "2", text: "Hi! How are you?", sender: "me", timestamp: "10:01 AM" },
    {
      id: "3",
      text: "I'm good, thanks! How about you?",
      sender: "other",
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
          sender: "me",
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
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="John Doe" />
        <Appbar.Action icon="phone" onPress={() => {}} />
        <Appbar.Action icon="video" onPress={() => {}} />
      </Appbar.Header>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <IconButton icon="paperclip" size={24} onPress={() => {}} />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <IconButton icon="microphone" size={24} onPress={() => {}} />
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
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
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
    marginHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
});

export default PrivateChatScreen;
