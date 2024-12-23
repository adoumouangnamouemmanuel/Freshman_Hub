import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Route {
  key: string;
  title: string;
  icon: string;
}

interface CustomBottomNavigationProps {
  state: {
    index: number;
    routes: Route[];
  };
  navigation: {
    emit: (event: { type: string; target?: string }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

const CustomBottomNavigation: React.FC<CustomBottomNavigationProps> = ({
  state,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.key);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={route.icon as any}
              size={24}
              color={isFocused ? "#007AFF" : "#8E8E93"}
            />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: "#8E8E93",
  },
  labelFocused: {
    color: "#007AFF",
  },
});

export default CustomBottomNavigation;
