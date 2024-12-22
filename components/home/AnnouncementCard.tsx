import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface AnnouncementCardProps {
  title: string;
  content: string;
  type?: "quote" | "announcement";
  onPress?: () => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
  type = "announcement",
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View
        entering={FadeIn.duration(800)}
        style={[styles.container, animatedStyle]}
      >
        <LinearGradient
          colors={
            type === "quote" ? ["#8B5CF6", "#7C3AED"] : ["#F472B6", "#EC4899"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          {type === "quote" && (
            <View style={styles.quoteDecoration}>
              <Text style={styles.quoteMarks}>"</Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.9,
    lineHeight: 24,
  },
  quoteDecoration: {
    position: "absolute",
    right: 20,
    bottom: -20,
  },
  quoteMarks: {
    fontSize: 100,
    color: "rgba(255, 255, 255, 0.1)",
    fontWeight: "bold",
  },
});

export default AnnouncementCard;
