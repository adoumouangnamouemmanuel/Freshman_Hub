import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrivacyToggle from './PrivacyToggle';

interface PersonalInfoProps {
  data: {
    [key: string]: { value: string; isPrivate: boolean };
  };
  onTogglePrivacy: (key: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onTogglePrivacy }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      {Object.entries(data).map(([key, { value, isPrivate }]) => (
        <View key={key} style={styles.infoItem}>
          <View>
            <Text style={styles.label}>
              {key.split(/(?=[A-Z])/).join(" ").toLowerCase()}:
            </Text>
            <Text style={styles.value}>{isPrivate ? "••••••" : value}</Text>
          </View>
          {['dateOfBirth', 'phone', 'address'].includes(key) && (
            <PrivacyToggle
              isPrivate={isPrivate}
              onToggle={() => onTogglePrivacy(key)}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#666',
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default PersonalInfo;

