import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
  views: number;
}

interface ShortVideosProps {
  videos: VideoItem[];
  onVideoPress: (videoId: string) => void;
}

const ShortVideos: React.FC<ShortVideosProps> = ({ videos, onVideoPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus Life</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video, index) => (
          <Animated.View
            key={video.id}
            entering={FadeInRight.delay(index * 100).springify()}
          >
            <TouchableOpacity
              style={styles.videoCard}
              onPress={() => onVideoPress(video.id)}
            >
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.playButton}>
                <Ionicons name="play" size={20} color="#FFF" />
              </View>
              <View style={styles.duration}>
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {video.title}
                </Text>
                <Text style={styles.views}>
                  {video.views.toLocaleString()} views
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#8B5CF6",
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  videoCard: {
    width: 200,
    borderRadius: 16,
    backgroundColor: "#FFF",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  playButton: {
    position: "absolute",
    top: 50,
    left: "50%",
    transform: [{ translateX: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  duration: {
    position: "absolute",
    right: 8,
    bottom: 48,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "#FFF",
    fontSize: 12,
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  views: {
    fontSize: 12,
    color: "#666",
  },
});

export default ShortVideos;
