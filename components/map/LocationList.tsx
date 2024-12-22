import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

interface Location {
  id: number;
  name: string;
  images: string[];
}

interface LocationListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationPress: (location: Location) => void;
  isExpanded: boolean;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  selectedLocation,
  onLocationPress,
  isExpanded,
}) => {
  const renderLocationItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={[
        styles.locationCard,
        selectedLocation &&
          selectedLocation.id === item.id &&
          styles.activeLocationCard,
      ]}
      onPress={() => onLocationPress(item)}
    >
      <Image source={{ uri: item.images[0] }} style={styles.locationImage} />
      <Text style={styles.locationName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={locations}
      renderItem={renderLocationItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={!isExpanded}
      numColumns={isExpanded ? 2 : 1}
      key={isExpanded ? "expanded" : "collapsed"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.locationContainer}
    />
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    paddingHorizontal: 10,
  },
  locationCard: {
    width: 120,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeLocationCard: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  locationImage: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  locationName: {
    padding: 5,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default LocationList;
