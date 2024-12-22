import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LOCATIONS } from "@/services/locations";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ASHESI_REGION = {
  //,
  latitude: 5.760499362071252,
  longitude: -0.21985883325666603,
  latitudeDelta: 0.1035,
  longitudeDelta: 0.1035,
};

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    id: number;
    name: string;
    description: string;
    images: string[];
  } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);
  const bottomSheetHeight = useRef(new Animated.Value(150)).current;
  const mapRef = useRef<MapView>(null);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  const onMarkerPress = (location: { latitude: number; longitude: number; id: number; name: string; description: string; images: string[] }) => {
    setSelectedLocation(location);
    setIsExpanded(false);
    Animated.spring(bottomSheetHeight, {
      toValue: 150,
      useNativeDriver: false,
    }).start();

    mapRef.current?.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      1000
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.spring(bottomSheetHeight, {
      toValue: isExpanded ? 150 : 400,
      useNativeDriver: false,
    }).start();
  };

  const openFullScreenGallery = (index: number) => {
    setFullScreenImageIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreenGallery = () => {
    setIsFullScreen(false);
  };

  const renderLocationItem = ({ item }: { item: { latitude: number; longitude: number; id: number; name: string; description: string; images: string[] } }) => (
    <TouchableOpacity
      style={[
        styles.locationCard,
        selectedLocation &&
          selectedLocation.id === item.id &&
          styles.activeLocationCard,
      ]}
      onPress={() => onMarkerPress(item)}
    >
      <Image source={{ uri: item.images[0] }} style={styles.locationImage} />
      <Text style={styles.locationName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderGalleryItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => openFullScreenGallery(index)}
      style={styles.galleryImageWrapper}
    >
      <Image source={{ uri: item }} style={styles.galleryImage} />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        LOCATIONS.map((location) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={ASHESI_REGION}
        minZoomLevel={2}
        maxZoomLevel={5}
      >
        {LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            onPress={() => onMarkerPress(location)}
          >
            <View style={styles.markerContainer}>
              <MaterialCommunityIcons
                name="map-marker"
                size={36}
                color="#FF5252"
              />
              <Text style={styles.markerText}>{location.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search locations"
          onChangeText={onSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <Animated.View
        style={[styles.bottomContainer, { height: bottomSheetHeight }]}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,1)"]}
          style={styles.bottomContainerGradient}
        >
          <View style={styles.bottomHeader}>
            <Text style={styles.bottomHeaderText}>
              {selectedLocation ? selectedLocation.name : "Ashesi University"}
            </Text>
            <TouchableOpacity onPress={toggleExpand}>
              <MaterialCommunityIcons
                name={isExpanded ? "chevron-down" : "chevron-up"}
                size={24}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
          {selectedLocation ? (
            <View style={styles.selectedLocationContainer}>
              <Text style={styles.selectedLocationDescription}>
                {selectedLocation.description}
              </Text>
              <FlatList
                data={selectedLocation.images}
                renderItem={renderGalleryItem}
                keyExtractor={(item, index) =>
                  `${selectedLocation.id}-${index}`
                }
                horizontal={!isExpanded}
                numColumns={isExpanded ? 3 : 1}
                key={isExpanded ? "expanded" : "collapsed"}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.galleryContainer}
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedLocation(null)}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="#007AFF"
                />
                <Text style={styles.backButtonText}>Back to all locations</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={LOCATIONS}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={!isExpanded}
              numColumns={isExpanded ? 2 : 1}
              key={isExpanded ? "expanded" : "collapsed"}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.locationContainer}
            />
          )}
        </LinearGradient>
      </Animated.View>
      <Modal
        visible={isFullScreen}
        transparent={true}
        onRequestClose={closeFullScreenGallery}
      >
        <View style={styles.fullScreenContainer}>
          <FlatList
            data={selectedLocation ? selectedLocation.images : []}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
            keyExtractor={(item, index) => `fullscreen-${index}`}
            horizontal
            pagingEnabled
            initialScrollIndex={fullScreenImageIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFullScreenGallery}
          >
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchBar: {
    elevation: 5,
    borderRadius: 20,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  bottomContainerGradient: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bottomHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
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
  selectedLocationContainer: {
    flex: 1,
  },
  selectedLocationDescription: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  galleryContainer: {
    paddingHorizontal: 10,
  },
  galleryImageWrapper: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  galleryImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  fullScreenImage: {
    width,
    height,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
  },
  backButtonText: {
    marginLeft: 5,
    color: "#007AFF",
    fontSize: 16,
  },
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
