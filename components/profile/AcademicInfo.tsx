import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EditableField from "./EditableField";

interface AcademicInfoProps {
  gpa: string;
  major: string;
  classYear: string;
  onUpdateGPA: (newGPA: string) => void;
  isGPAPrivate: boolean;
  onToggleGPAPrivacy: () => void;
}

const AcademicInfo: React.FC<AcademicInfoProps> = ({
  gpa,
  major,
  classYear,
  onUpdateGPA,
  isGPAPrivate,
  onToggleGPAPrivacy,
}) => {
  return (
    <View style={styles.container}>
      <EditableField
        label="GPA"
        value={gpa}
        onSave={onUpdateGPA}
        isPrivate={isGPAPrivate}
        onTogglePrivacy={onToggleGPAPrivacy}
      />
      <Text style={styles.info}>Major: {major}</Text>
      <Text style={styles.info}>Class of {classYear}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});

export default AcademicInfo;
