import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Buddy {
  avatar: string;
  name: string;
  major: string;
  yearOfStudy: number;
}

interface AssignedBuddyCardProps {
  buddy: Buddy;
  onPress: () => void;
}

const AssignedBuddyCard: React.FC<AssignedBuddyCardProps> = ({ buddy, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <Image source={{ uri: buddy.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Title>{buddy.name}</Title>
          <Paragraph>{buddy.major}</Paragraph>
          <Paragraph>Year {buddy.yearOfStudy}</Paragraph>
        </View>
        <Ionicons name="star" size={24} color="#FFD700" style={styles.star} />
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          onPress={onPress}
          icon={() => (
            <Ionicons name="chatbubble-ellipses" size={18} color="white" />
          )}
        >
          Chat with Your Buddy
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
    backgroundColor: "#e6f2ff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  star: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  actions: {
    justifyContent: "center",
  },
});

export default AssignedBuddyCard;
