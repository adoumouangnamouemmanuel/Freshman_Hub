import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrivacyToggle from "./PrivacyToggle";

interface AcademicInfoProps {
  gpa: string;
  major: string;
  classYear: string;
  isGPAPrivate: boolean;
  onToggleGPAPrivacy: () => void;
}

const AcademicInfo: React.FC<AcademicInfoProps> = ({
  gpa,
  major,
  classYear,
  isGPAPrivate,
  onToggleGPAPrivacy,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Academic Information</Text>
      <View style={styles.infoItem}>
        <View>
          <Text style={styles.label}>GPA:</Text>
          <Text style={styles.value}>{isGPAPrivate ? "••••••" : gpa}</Text>
        </View>
        <PrivacyToggle isPrivate={isGPAPrivate} onToggle={onToggleGPAPrivacy} />
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.label}>Major:</Text>
        <Text style={styles.value}>{major}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.label}>Class Year:</Text>
        <Text style={styles.value}>{classYear}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default AcademicInfo;
