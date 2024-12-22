import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  Avatar,
} from "react-native-paper";
import { Coach } from "@/services/coachingService";

interface ChatModalProps {
  visible: boolean;
  onDismiss: () => void;
  coach: Coach;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "coach";
}

const ChatModal: React.FC<ChatModalProps> = ({ visible, onDismiss, coach }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputText("");

      // Simulate coach response
      setTimeout(() => {
        const coachResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. How can I assist you today?",
          sender: "coach",
        };
        setMessages((prevMessages) => [...prevMessages, coachResponse]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userMessage : styles.coachMessage,
      ]}
    >
      {item.sender === "coach" && (
        <Avatar.Image
          size={24}
          source={{ uri: coach.avatar }}
          style={styles.coachAvatar}
        />
      )}
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Avatar.Image size={40} source={{ uri: coach.avatar }} />
          <Text style={styles.headerText}>{coach.name}</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            Send
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 15,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  coachMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
  },
  coachAvatar: {
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#f0f0f0",
  },
});

export default ChatModal;
