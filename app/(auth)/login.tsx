import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { useAuthContext } from "@/components/auth/authProvider";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { colors } = useTheme();
  const { signIn } = useAuthContext();

  const logoScale = useSharedValue(0);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1);
    formOpacity.value = withTiming(1, { duration: 1000, easing: Easing.ease });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  const handleLogin = async () => {
    console.log("Attempting login with:", email);
    const result = await signIn(email, password);
    console.log("Login result:", result);
    if (result.success && result.user) {
      console.log("Login successful");
      if (result.user.role === "admin") {
        console.log("Redirecting to admin choice");
        router.replace("/(auth)/admin-choice");
      } else {
        console.log("Redirecting to tabs");
        router.replace("/(tabs)");
      }
    } else {
      console.log("Login failed");
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  const isLoginDisabled = !email || !password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Image
            source={require("../../assets/images/freshman-hub-logo.png")}
            style={styles.logo}
          />
        </Animated.View>
        <Animated.View style={[styles.formContainer, formStyle]}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry={!isPasswordVisible}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? "eye-off" : "eye"}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={isLoginDisabled}
          >
            Login
          </Button>
          <View style={styles.forgotPasswordContainer}>
            <TouchableWithoutFeedback
              onPress={() => console.log("Forgot password")}
            >
              <Text style={[styles.forgotPassword, { color: colors.primary }]}>
                Forgot Password?
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
        <View style={styles.footer}>
          <Text style={{ color: colors.text }}>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/signup-request")}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotPassword: {
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
