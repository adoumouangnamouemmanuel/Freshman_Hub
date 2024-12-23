import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { List, Avatar, Text } from "react-native-paper";

const communityChats = [
  {
    id: "1",
    name: "Freshman General",
    participants: 150,
    lastMessage: "Welcome to the new semester!",
  },
  {
    id: "2",
    name: "Computer Science",
    participants: 75,
    lastMessage: "Anyone need help with the coding assignment?",
  },
  {
    id: "3",
    name: "Campus Events",
    participants: 200,
    lastMessage: "Don't forget about the upcoming career fair!",
  },
  // Add more mock data as needed
];

interface CommunityChatProps {
  onChatPress: (id: string) => void;
}

const CommunityChat: React.FC<CommunityChatProps> = ({ onChatPress }) => {
  return (
    <FlatList
      data={communityChats}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          description={item.lastMessage}
          left={() => (
            <Avatar.Text size={48} label={item.name.substring(0, 2)} />
          )}
          right={() => (
            <Text style={styles.participantsText}>
              {item.participants} members
            </Text>
          )}
          onPress={() => onChatPress(`/chat/community?id=${item.id}`)}
          style={styles.item}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    marginBottom: 1,
  },
  participantsText: {
    fontSize: 12,
    color: "#666",
    alignSelf: "center",
  },
});

export default CommunityChat;
