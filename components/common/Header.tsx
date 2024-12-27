import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  rightIcon,
  onRightIconPress,
}) => {
  const router = useRouter();

  return (
    <BlurView intensity={50} style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.button} />
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.button}>
          <Ionicons name={rightIcon as any} size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.button} />
      )}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default Header;
