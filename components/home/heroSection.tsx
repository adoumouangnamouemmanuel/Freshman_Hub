import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface HeroSectionProps {
  onWelcomePress: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onWelcomePress }) => (
  <View style={styles.heroSection}>
    <Image
      source={{ uri: "https://picsum.photos/800/400" }}
      style={styles.heroImage}
    />
    <View style={styles.heroContent}>
      <Text style={styles.heroTitle}>Freshmen Hub</Text>
      <Text style={styles.heroSubtitle}>The University Buddy App</Text>
    </View>
    <TouchableOpacity style={styles.welcomeButton} onPress={onWelcomePress}>
      <Text style={styles.welcomeButtonText}>Welcome</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  heroSection: {
    height: 200,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "white",
  },
  welcomeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#ff9800",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  welcomeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HeroSection;
