import React from "react";
import { Dialog, Button, List } from "react-native-paper";

interface EmergencyDialogProps {
  visible: boolean;
  onDismiss: () => void;
}

const EmergencyDialog: React.FC<EmergencyDialogProps> = ({
  visible,
  onDismiss,
}) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Emergency Contacts</Dialog.Title>
      <Dialog.Content>
        <List.Item
          title="Campus Security"
          description="24/7 Emergency Line"
          left={(props) => <List.Icon {...props} icon="shield" />}
          onPress={() => {
            /* Implement call function */
          }}
        />
        <List.Item
          title="Health Center"
          description="Medical Emergencies"
          left={(props) => <List.Icon {...props} icon="medical-bag" />}
          onPress={() => {
            /* Implement call function */
          }}
        />
        <List.Item
          title="Counseling Services"
          description="Mental Health Support"
          left={(props) => <List.Icon {...props} icon="account-heart" />}
          onPress={() => {
            /* Implement call function */
          }}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default EmergencyDialog;
