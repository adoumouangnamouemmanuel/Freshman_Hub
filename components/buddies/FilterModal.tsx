import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Title, TextInput, Button } from "react-native-paper";

interface FilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  onApply: (filters: {
    major: string;
    country: string;
    yearOfStudy: string;
  }) => void;
  filters: { major: string; country: string; yearOfStudy: string };
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onDismiss,
  onApply,
  filters,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onApply(localFilters);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Title style={styles.title}>Filter Buddies</Title>
        <TextInput
          label="Major"
          value={localFilters.major}
          onChangeText={(text) =>
            setLocalFilters({ ...localFilters, major: text })
          }
          style={styles.input}
        />
        <TextInput
          label="Country"
          value={localFilters.country}
          onChangeText={(text) =>
            setLocalFilters({ ...localFilters, country: text })
          }
          style={styles.input}
        />
        <TextInput
          label="Year of Study"
          value={localFilters.yearOfStudy}
          onChangeText={(text) =>
            setLocalFilters({ ...localFilters, yearOfStudy: text })
          }
          style={styles.input}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onDismiss} style={styles.button}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleApply} style={styles.button}>
            Apply Filters
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 8,
  },
});

export default FilterModal;
