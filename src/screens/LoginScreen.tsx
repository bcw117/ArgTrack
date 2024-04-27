import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.inner}
      >
        <Text style={styles.title}>ArgTrack</Text>
        <Text style={styles.text}>Email</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={styles.text}>Password</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <Ionicons name="eye" size={18} color="#504b5e" />
            ) : (
              <Ionicons name="eye-off" size={18} color="#504b5e" />
            )}
          </Pressable>
        </View>
        <Pressable
          style={styles.forgotPasswordContainer}
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          <Text
            style={{
              color: "#fa9c05",
              textDecorationLine: "underline",
              fontFamily: "Nunito-SemiBold",
            }}
          >
            Forgot your password?
          </Text>
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Pressable style={styles.button} onPress={signInWithEmail}>
            <Text style={{ color: "black", fontFamily: "Nunito-Bold" }}>
              Sign In
            </Text>
          </Pressable>
        </View>
        <View style={styles.signUp}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#fa9c05", fontFamily: "Nunito-Bold" }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171324",
    height: "100%",
    width: "100%",
  },
  inner: {
    alignContent: "center",
    width: "90%",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontFamily: "Nexa-Bold",
    fontSize: 50,
    marginBottom: 25,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#1f1b2e",
    borderRadius: 7.5,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginVertical: 5,
  },
  inputText: {
    fontFamily: "Nunito-Regular",
    width: "95%",
    color: "white",
  },
  forgotPasswordContainer: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#fa9c05",
    paddingVertical: 15,
    width: "90%",
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  signUp: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Nunito-SemiBold",
    fontWeight: "bold",
    color: "white",
  },
});

export default LoginScreen;
