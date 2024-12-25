import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if there's a user in AsyncStorage
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication logic
    if (email === "admin@ashesi.edu.gh" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        name: "Admin User",
        email: "admin@ashesi.edu.gh",
        role: "ADMIN",
      };
      setUser(adminUser);
      await AsyncStorage.setItem("user", JSON.stringify(adminUser));
    } else if (email.endsWith("@ashesi.edu.gh")) {
      const newUser: User = {
        id: "2",
        name: "Ashesi User",
        email: email,
        role: "STUDENT",
      };
      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
