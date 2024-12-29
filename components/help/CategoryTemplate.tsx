import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
import Header from "@/components/common/Header";

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface CategoryTemplateProps {
  title: string;
  description: string;
  services: Service[];
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  title,
  description,
  services,
}) => {
  const router = useRouter();
  const contact = {
    phone: "+233 302 610 330",
    email: "emmanuel.adoum@ashesi.edu.gh",
  };

  const handleCall = (phoneNumber: string) => {
      Linking.openURL(`tel:${phoneNumber}`);
    };
  
    const handleEmail = (email: string) => {
      Linking.openURL(`mailto:${email}`);
    };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Header title={title} showBackButton={true} />
      {/* Removed header */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Card style={styles.infoCard}>
          <Card.Content>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
        </Card>
        {services.map((service, index) => (
          <Card key={index} style={styles.serviceCard}>
            <Card.Content>
              <View style={styles.serviceHeader}>
                <Ionicons
                  name={service.icon as any}
                  size={24}
                  color="#4CAF50"
                />
                <Title style={styles.serviceTitle}>{service.title}</Title>
              </View>
              <Paragraph>{service.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  /* Implement navigation or action */
                }}
              >
                Learn More
              </Button>
            </Card.Actions>
          </Card>
        ))}
        <Card style={styles.contactCard}>
          <Card.Content>
            <Title>Need More Help?</Title>
            <Paragraph>
              If you need additional support or have specific questions, don't
              hesitate to contact our support team.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button icon="email" onPress={() => handleEmail(contact.email)}>
              Email Support
            </Button>
            <Button icon="phone" onPress={() => handleCall(contact.phone)}>
              Call Support
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    margin: 16,
  },
  serviceCard: {
    margin: 16,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceTitle: {
    marginLeft: 8,
  },
  contactCard: {
    margin: 16,
    marginBottom: 32,
  },
});

export default CategoryTemplate;
