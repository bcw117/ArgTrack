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

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const sendEmail = () => {
    if (email === "") {
      return Alert.alert("Error", "Fields have not been filled in");
    }
    navigation.navigate("Login");
  };

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
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Pressable style={styles.button} onPress={() => sendEmail}>
          <Text>Submit</Text>
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
    backgroundColor: "white",
  },
  inputContainer: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "SourceSansPro-Bold",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    padding: 20,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    marginLeft: 20,
    alignItems: "center",
    borderRadius: 5,
    width: 100,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontFamily: "Roboto-Regular",
    width: 350,
  },
});

export default ResetPasswordScreen;
