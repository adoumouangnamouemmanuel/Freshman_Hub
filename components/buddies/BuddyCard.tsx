import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Buddy {
  avatar: string;
  name: string;
  major: string;
  country: string;
  yearOfStudy: number;
  isConnected: boolean;
}

interface BuddyCardProps {
  buddy: Buddy;
  onConnect: () => void;
  onDisconnect: () => void;
  onPress: () => void;
}

const BuddyCard: React.FC<BuddyCardProps> = ({ buddy, onConnect, onDisconnect, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <Image source={{ uri: buddy.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Title>{buddy.name}</Title>
          <Paragraph>{buddy.major}</Paragraph>
          <Paragraph>{buddy.country}</Paragraph>
          <Paragraph>Year {buddy.yearOfStudy}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        {buddy.isConnected ? (
          <Button
            mode="outlined"
            onPress={onDisconnect}
            icon={() => (
              <Ionicons name="person-remove" size={18} color="#6200ee" />
            )}
          >
            Disconnect
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={onConnect}
            icon={() => <Ionicons name="person-add" size={18} color="white" />}
          >
            Connect
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 4,
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
  actions: {
    justifyContent: "flex-end",
  },
});

export default BuddyCard;
