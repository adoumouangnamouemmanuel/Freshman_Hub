import React from "react";
import { View, StyleSheet } from "react-native";
import EditableField from "./EditableField";

interface PersonalInfoProps {
  data: {
    [key: string]: { value: string; isPrivate: boolean };
  };
  onUpdate: (key: string, newValue: string) => void;
  onTogglePrivacy: (key: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  data,
  onUpdate,
  onTogglePrivacy,
}) => {
  return (
    <View style={styles.container}>
      {Object.entries(data).map(([key, { value, isPrivate }]) => (
        <EditableField
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onSave={(newValue) => onUpdate(key, newValue)}
          isPrivate={isPrivate}
          onTogglePrivacy={() => onTogglePrivacy(key)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default PersonalInfo;
