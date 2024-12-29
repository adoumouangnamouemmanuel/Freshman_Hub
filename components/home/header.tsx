import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { router } from "expo-router";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const HEADER_HEIGHT = 100;

interface HeaderProps {
  temperature: number;
  profileImage: string;
  onProfilePress: () => void;
  scrollY: Animated.SharedValue<number>;
  isScrollingDown: Animated.SharedValue<boolean>;
}

const Header: React.FC<HeaderProps> = ({
  temperature,
  profileImage,
  onProfilePress,
  scrollY,
  isScrollingDown,
}) => {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          translateY: withTiming(isScrollingDown.value ? translateY : 0, {
            duration: 300,
          }),
        },
      ],
    };
  });

  const onPressHelp = () => {
    router.push("/(routes)/help");
  }

  return (
    <AnimatedBlurView
      intensity={50}
      style={[styles.header, headerAnimatedStyle]}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onProfilePress}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onPressHelp}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedBlurView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: HEADER_HEIGHT,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 12,
    gap: 12,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  searchText: {
    color: "#666",
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    backgroundColor: "#f0f2f5",
    borderRadius: "50%",
  },
});

export default Header;
