import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const FAQCard = () => {
  const router = useRouter();

  return (
    <Card style={styles.faqCard}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Ionicons
            name="help-circle"
            size={24}
            color="#4CAF50"
            style={styles.icon}
          />
          <Title>Frequently Asked Questions</Title>
        </View>
        <Paragraph style={styles.description}>
          Find quick answers to common questions about Ashesi University.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => router.push("/help/faq")}
          style={styles.button}
        >
          View FAQs
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  faqCard: {
    margin: 16,
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
  },
});

export default FAQCard;
