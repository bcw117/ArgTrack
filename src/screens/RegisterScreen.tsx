import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const RegisterScreen = () => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setconfirmationPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    if (fullname === "" || username === "" || email === "" || password === "") {
      return Alert.alert("Error", "Not all fields filled in");
    } else if (confirmationPassword != password) {
      return Alert.alert(
        "Error",
        "There was a problem with entering one of the fields"
      );
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else addToDatabase(session);

    setLoading(false);
  }

  async function addToDatabase(session) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: username, full_name: fullname })
      .eq("id", session.user.id);
    if (error) return Alert.alert(error.message);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={styles.inner}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Nexa-Bold",
            fontSize: 25,
            marginBottom: 25,
          }}
        >
          Register
        </Text>
        <View>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFullName(text)}
          />
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setconfirmationPassword(text)}
            secureTextEntry={true}
          />

          <Pressable style={styles.button} onPress={signUpWithEmail}>
            <Text style={styles.text}>Register</Text>
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
  input: {
    color: "white",
    fontFamily: "Nunito-Regular",
    flexDirection: "row",
    backgroundColor: "#1f1b2e",
    borderRadius: 7.5,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#fa9c05",
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontFamily: "Nunito-SemiBold",
    fontWeight: "bold",
    color: "white",
  },
});

export default RegisterScreen;
