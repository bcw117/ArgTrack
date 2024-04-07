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
} from "react-native";
import { auth } from "../../firebaseConfig";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import BackButton from "../components/BackButton";

const ChangePasswordScreen = ({ navigation }) => {
  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const confirmNewPassword = async () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      prevPass
    );

    reauthenticateWithCredential(auth.currentUser, credential).catch(
      (error) => {
        alert(error);
      }
    );

    if (newPass === prevPass) {
      return Alert.alert(
        "Password Error",
        "Your new password cannot be the same as your old password"
      );
    } else if (newPass !== confirmPass) {
      return Alert.alert(
        "Password Error",
        "Your confirmation password does not match"
      );
    }

    try {
      await updatePassword(auth.currentUser, newPass);
      alert("Your password has been updated");
    } catch (error) {
      alert(error);
    } finally {
      setPrevPass("");
      setNewPass("");
      setConfirmPass("");
      navigation.navigate("TabStack");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation}></BackButton>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>Change your Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Previous Password"
            onChangeText={(newText) => setPrevPass(newText)}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            onChangeText={(newText) => setNewPass(newText)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(newText) => setConfirmPass(newText)}
          />
        </View>
        <Pressable style={styles.button} onPress={() => confirmNewPassword()}>
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
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    marginLeft: 5,
    alignItems: "center",
    borderRadius: 5,
    width: 100,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontFamily: "Roboto-Regular",
    width: 350,
  },
});

export default ChangePasswordScreen;
