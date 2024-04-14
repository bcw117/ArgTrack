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
import { auth } from "firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((e) => {
      Alert.alert("Error", "Incorrect email or password");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.inner}
      >
        <Text style={styles.title}>ArgTrack</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <Pressable
          style={styles.forgotPasswordContainer}
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Forgot your password?
          </Text>
        </Pressable>
        <View>
          <Pressable style={styles.button} onPress={handleSignIn}>
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.text}>Don't have an account? Create one</Text>
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
    backgroundColor: "#f9fbfc",
    height: "100%",
    width: "100%",
  },
  inner: {
    alignContent: "center",
    width: "90%",
  },
  title: {
    textAlign: "center",
    fontFamily: "Nexa-Bold",
    fontSize: 50,
    marginBottom: 25,
  },
  input: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  forgotPasswordContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});

export default LoginScreen;
