import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomMarkerProps {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  onPress: (location: any) => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  id,
  name,
  description,
  latitude,
  longitude,
  onPress,
}) => {
  return (
    <Marker
      key={id}
      coordinate={{ latitude, longitude }}
      title={name}
      description={description}
      onPress={() => onPress({ id, name, description, latitude, longitude })}
    >
      <View style={styles.markerContainer}>
        <MaterialCommunityIcons name="map-marker" size={36} color="#FF5252" />
        <Text style={styles.markerText}>{name}</Text>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
  },
  markerText: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomMarker;
