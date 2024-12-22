import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const WeatherWidget = () => {
  const [weather, setWeather] = useState({ temp: 25, condition: "sunny" });

  useEffect(() => {
    // Fetch real weather data here
    // For now, we'll use dummy data
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "weather-sunny";
      case "cloudy":
        return "weather-cloudy";
      case "rainy":
        return "weather-rainy";
      default:
        return "weather-partly-cloudy";
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={getWeatherIcon(weather.condition)}
        size={24}
        color="#000"
      />
      <Text style={styles.temperature}>{weather.temp}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  temperature: {
    marginLeft: 5,
    fontSize: 16,
  },
});
