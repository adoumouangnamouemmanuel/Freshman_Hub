import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useAuthContext } from "@/components/auth/authProvider";
import { Button } from "react-native-paper";

interface HeaderProps {
  temperature: number;
  profileImage: string;
  onProfilePress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  temperature,
  profileImage,
  onProfilePress,
}) => {
  const profileAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));
  const { signOut } = useAuthContext();

  return (
    <BlurView intensity={50} style={styles.container}>
      <View style={styles.mainHeader}>
        <View>
          <Animated.Text
            entering={FadeIn.duration(800)}
            style={styles.welcomeText}
          >
            Welcome, Freshman!
            <Button onPress={signOut} mode="text" compact>
              Logout
            </Button>
          </Animated.Text>

          <View style={styles.temperatureContainer}>
            <Ionicons name="sunny" size={20} color="#000" />
            <Text style={styles.temperature}>{temperature}°C</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onProfilePress}>
          <Animated.View
            style={[styles.profileContainer, profileAnimatedStyle]}
          >
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryText: {
    fontSize: 12,
    marginLeft: 4,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  temperature: {
    fontSize: 16,
    fontWeight: "500",
  },
  profileContainer: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
