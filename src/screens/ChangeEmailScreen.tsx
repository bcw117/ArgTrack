import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "firebaseConfig";

const ChangeEmailScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [newEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = async () => {
    if (newEmail === user.email || newEmail === "") {
      console.log("worked");
      return Alert.alert("Error", "Invalid Email");
    }
    const credentials = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credentials).catch((error) => {
      return Alert.alert("There was an error changing your email");
    });

    updateEmail(user, newEmail)
      .then(() => {
        Alert.alert("Email Updated");
      })
      .catch((error) => {
        Alert.alert("There was an error changing your email");
      });

    setPassword("");
    setEmail("");
    navigation.navigate("TabStack");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>Change your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your new email"
          onChangeText={(newText) => setEmail(newText)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password to confirm"
          secureTextEntry={true}
          onChangeText={(newText) => setPassword(newText)}
        />
        <Pressable style={styles.button} onPress={() => changeEmail()}>
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
  title: {
    fontFamily: "SourceSansPro-Bold",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    padding: 15,
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    width: 100,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontFamily: "Roboto-Regular",
    width: 350,
  },
});

export default ChangeEmailScreen;
