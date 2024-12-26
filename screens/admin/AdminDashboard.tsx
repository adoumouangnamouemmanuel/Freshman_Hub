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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AdminHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <QuickActions />
        {activeSection === "overview" && (
          <>
            <Analytics />
            <SystemHealth />
          </>
        )}
        {activeSection === "users" && <UserManagement />}
        {activeSection === "content" && <ContentModeration />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

export default AdminDashboard;
