import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");

  async function sendEmail() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) Alert.alert(error.message);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <Text style={styles.title}>Forgot your password?</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            Enter your email assocaited with your account and we will send you
            an email to reset your password
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Pressable style={styles.button} onPress={sendEmail}>
          <Text style={{ fontFamily: "Nunito-SemiBold" }}>Submit</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171324",
  },
  inputContainer: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontSize: 30,
    padding: 20,
  },
  text: {
    fontFamily: "Nunito-Regular",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#fa9c05",
    padding: 15,
    marginVertical: 5,
    marginLeft: 20,
    alignItems: "center",
    borderRadius: 5,
    width: 100,
  },
  input: {
    color: "white",
    backgroundColor: "#1f1b2e",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontFamily: "Nunito-Regular",
    width: 350,
  },
});

export default ResetPasswordScreen;
