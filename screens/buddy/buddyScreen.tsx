import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import {
  Searchbar,
  FAB,
  Portal,
  Dialog,
  Paragraph,
  Button,
  Chip,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BuddyCard from "@/components/buddies/BuddyCard";
import AssignedBuddyCard from "@/components/buddies/AssignedBuddyCard";
import FilterModal from "@/components/buddies/FilterModal";
import { fetchBuddies, fetchAssignedBuddy } from "@/services/buddyService";

interface Buddy {
  id: string;
  name: string;
  avatar: string;
  major: string;
  country: string;
  yearOfStudy: number;
  isConnected: boolean;
}

const BuddiesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [filteredBuddies, setFilteredBuddies] = useState<Buddy[]>([]);
  const [assignedBuddy, setAssignedBuddy] = useState<Buddy | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    major: "",
    country: "",
    yearOfStudy: "",
  });
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "connections">("all");
  const navigation = useNavigation();

  useEffect(() => {
    loadBuddies();
    loadAssignedBuddy();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [buddies, filters, searchQuery, activeTab]);

  const loadBuddies = async () => {
    const fetchedBuddies = await fetchBuddies(filters);
    setBuddies(fetchedBuddies);
  };

  const loadAssignedBuddy = async () => {
    const fetchedAssignedBuddy = await fetchAssignedBuddy();
    setAssignedBuddy(fetchedAssignedBuddy);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = () => {
    setIsFilterVisible(true);
  };

  const applyFilters = (newFilters: {
    major: string;
    country: string;
    yearOfStudy: string;
  }) => {
    setFilters(newFilters);
    setIsFilterVisible(false);
  };

  const applyFiltersAndSearch = useCallback(() => {
    let result = buddies;

    if (activeTab === "connections") {
      result = result.filter((buddy) => buddy.isConnected);
    }

    if (filters.major) {
      result = result.filter((buddy) =>
        buddy.major.toLowerCase().includes(filters.major.toLowerCase())
      );
    }
    if (filters.country) {
      result = result.filter((buddy) =>
        buddy.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }
    if (filters.yearOfStudy) {
      result = result.filter(
        (buddy) => buddy.yearOfStudy.toString() === filters.yearOfStudy
      );
    }

    if (searchQuery) {
      result = result.filter(
        (buddy) =>
          buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          buddy.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
          buddy.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBuddies(result);
  }, [buddies, filters, searchQuery, activeTab]);

  const handleConnect = (buddy: Buddy) => {
    const updatedBuddies = buddies.map((b) =>
      b.id === buddy.id ? { ...b, isConnected: true } : b
    );
    setBuddies(updatedBuddies);
  };

  const handleDisconnect = (buddy: Buddy) => {
    const updatedBuddies = buddies.map((b) =>
      b.id === buddy.id ? { ...b, isConnected: false } : b
    );
    setBuddies(updatedBuddies);
  };

  const handleBuddyPress = (buddy: Buddy) => {
    // navigation.navigate("BuddyProfile", { buddy });
  };

  const renderBuddyCard = ({ item }: { item: Buddy }) => (
    <BuddyCard
      buddy={item}
      onConnect={() => handleConnect(item)}
      onDisconnect={() => handleDisconnect(item)}
      onPress={() => handleBuddyPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search buddies"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.tabContainer}>
        <Chip
          selected={activeTab === "all"}
          onPress={() => setActiveTab("all")}
          style={styles.chip}
        >
          All Buddies
        </Chip>
        <Chip
          selected={activeTab === "connections"}
          onPress={() => setActiveTab("connections")}
          style={styles.chip}
        >
          My Connections
        </Chip>
      </View>
      {assignedBuddy && (
        <AssignedBuddyCard
          buddy={assignedBuddy}
          onPress={() => handleBuddyPress(assignedBuddy)}
        />
      )}
      <FlatList
        data={filteredBuddies}
        renderItem={renderBuddyCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.buddyList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No buddies found</Text>
        }
      />
      <Portal>
        <FilterModal
          visible={isFilterVisible}
          onDismiss={() => setIsFilterVisible(false)}
          onApply={applyFilters}
          filters={filters}
        />
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Buddy Program</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Welcome to the Buddy Program! As a freshman, you've been assigned
              a buddy to help you navigate campus life. Your buddy is an
              upperclassman who can provide guidance and support throughout your
              first year.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Got it</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        style={styles.fab}
        icon={() => <Ionicons name="filter" size={24} color="white" />}
        onPress={handleFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  chip: {
    marginHorizontal: 4,
  },
  buddyList: {
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default BuddiesScreen;
