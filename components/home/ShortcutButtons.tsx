import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface ShortcutButton {
  id: string;
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
}

interface ShortcutButtonsProps {
  buttons: ShortcutButton[];
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ShortcutButtons: React.FC<ShortcutButtonsProps> = ({ buttons }) => {
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <AnimatedTouchable
          key={button.id}
          style={styles.button}
          onPress={button.onPress}
          entering={FadeInDown.delay(index * 100).springify()}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: button.color }]}
          >
            <Ionicons name={button.icon as any} size={24} color="#FFF" />
          </View>
          <Text style={styles.label}>{button.label}</Text>
        </AnimatedTouchable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 16,
  },
  button: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});

export default ShortcutButtons;
