import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Dialog, Button, List, Text } from "react-native-paper";
import { Linking } from "react-native";

interface EmergencyDialogProps {
  visible: boolean;
  onDismiss: () => void;
}

const EmergencyDialog: React.FC<EmergencyDialogProps> = ({
  visible,
  onDismiss,
}) => {
  const emergencyContacts = [
    {
      title: "Campus Security",
      description: "24/7 Emergency Line",
      phone: "+233 302 610 330",
      email: "security@ashesi.edu.gh",
      icon: "shield",
    },
    {
      title: "Health Center",
      description: "Medical Emergencies",
      phone: "+233 302 610 340",
      email: "healthcenter@ashesi.edu.gh",
      icon: "medical-bag",
    },
    {
      title: "Counseling Services",
      description: "Mental Health Support",
      phone: "+233 302 610 350",
      email: "counseling@ashesi.edu.gh",
      icon: "account-heart",
    },
  ];

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      <Dialog.Title>Emergency Contacts</Dialog.Title>
      <Dialog.ScrollArea style={styles.scrollArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <List.Item
                title={contact.title}
                description={contact.description}
                left={(props) => <List.Icon {...props} icon={contact.icon} />}
              />
              <View style={styles.contactInfo}>
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Button
                    onPress={() => handleCall(contact.phone)}
                    icon="phone"
                    mode="contained"
                    style={styles.contactButton}
                    labelStyle={styles.buttonLabel}
                  >
                    {contact.phone}
                  </Button>
                </View>
                <View style={styles.contactRow}>
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Button
                    onPress={() => handleEmail(contact.email)}
                    icon="email"
                    mode="contained"
                    style={styles.contactButton}
                    labelStyle={styles.buttonLabel}
                  >
                    {contact.email}
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    maxHeight: "80%",
  },
  scrollArea: {
    paddingHorizontal: 0,
  },
  scrollViewContent: {
    paddingHorizontal: 24,
  },
  contactItem: {
    marginBottom: 16,
  },
  contactInfo: {
    marginLeft: 54,
  },
  contactRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  contactLabel: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  contactButton: {
    width: "100%",
  },
  buttonLabel: {
    fontSize: 15,
  },
});

export default EmergencyDialog;
