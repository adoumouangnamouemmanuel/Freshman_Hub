import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Title, Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

interface MeetingSchedulerProps {
  visible: boolean;
  onDismiss: () => void;
  coach: { name: string };
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ visible, onDismiss, coach }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState("");

  const onDateChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSchedule = () => {
    // Implement the logic to schedule the meeting
    console.log(
      "Scheduling meeting with",
      coach.name,
      "on",
      date,
      "Notes:",
      notes
    );
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Title style={styles.title}>Schedule Meeting with {coach?.name}</Title>
        <Button
          onPress={() => setShowDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
        >
          {date.toLocaleString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TextInput
          label="Meeting Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          style={styles.notesInput}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onDismiss} style={styles.button}>
            Cancel
          </Button>
          <Button
            onPress={handleSchedule}
            mode="contained"
            style={styles.button}
          >
            Schedule
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
    marginBottom: 20,
    textAlign: "center",
  },
  dateButton: {
    marginBottom: 20,
  },
  notesInput: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    minWidth: 100,
  },
});

export default MeetingScheduler;
