import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import AdminHeader from "@/components/admin/AdminHeader";
import QuickActions from "@/components/admin/QuickActions";
import UserManagement from "@/components/admin/UserManagement";
import Analytics from "@/components/admin/Analytics";
import SystemHealth from "@/components/admin/SystemHealth";
import ContentModeration from "@/components/admin/ContentModeration";

const AdminDashboard: React.FC = () => {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <QuickActions />
            <Analytics />
            <SystemHealth />
          </ScrollView>
        );
      case "users":
        return <UserManagement />;
      case "content":
        return <ContentModeration />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AdminHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

export default AdminDashboard;
