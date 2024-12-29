import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "@/components/common/Header";
import HelpCategories from "@/components/help/HelpCategories";
import FAQCard from "@/components/help/FAQCard";
import EmergencyDialog from "@/components/help/EmergencyDialog";

export default function HelpCenterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmergencyDialogVisible, setIsEmergencyDialogVisible] =
    useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Help Center" showBackButton={true} />
      <ScrollView style={styles.scrollView}>
        <Searchbar
          placeholder="Search for help"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <FAQCard />
        <HelpCategories
          onCategoryPress={(category) =>
            router.push(
              `/help/${category.toLowerCase().replace(" ", "-")}` as any
            )
          }
        />
      </ScrollView>
      <EmergencyDialog
        visible={isEmergencyDialogVisible}
        onDismiss={() => setIsEmergencyDialogVisible(false)}
      />
      <FAB
        style={styles.fab}
        icon="phone"
        label="Emergency"
        onPress={() => setIsEmergencyDialogVisible(true)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF5252",
  },
});
