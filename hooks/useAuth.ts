import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockUsers, User } from "@/services/users";

export type AuthUser = Omit<User, "password">;

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: AuthUser }> => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      const userWithoutPassword: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
      };
      setUser(userWithoutPassword);
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false };
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return { user, isLoading, signIn, signOut };
}
