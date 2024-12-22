import React from "react";
import { StyleSheet } from "react-native";
import { List, Avatar } from "react-native-paper";

interface ChatListItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
  onPress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  avatar,
  lastMessage,
  onPress,
}) => {
  return (
    <List.Item
      title={name}
      description={lastMessage}
      left={() => <Avatar.Image size={48} source={{ uri: avatar }} />}
      onPress={onPress}
      style={styles.item}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    marginBottom: 1,
  },
});

export default ChatListItem;
