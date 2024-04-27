import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const ChangeEmailScreen = ({ navigation }) => {
  const [newEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function changeEmail() {
    const response = await supabase.rpc("verify_user_password", {
      password: password,
    });

    if (response.data == false) {
      return Alert.alert("Password Incorrect");
    } else {
      const checkEmailQuery = await supabase.rpc("check_email", {
        newemail: newEmail,
      });
      if (!checkEmailQuery.data) {
        const { data, error } = await supabase.auth.updateUser({
          email: newEmail,
        });

        if (error) return Alert.alert(error.message);

        Alert.alert("We have sent an email to both account to verify changes");
        navigation.navigate("Account");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <Text style={styles.title}>Change your Email</Text>
        <Text style={styles.text}>New Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setEmail(newText)}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newText) => setPassword(newText)}
        />
        <Pressable style={styles.button} onPress={changeEmail}>
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
    backgroundColor: "#171324",
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontSize: 30,
    padding: 15,
  },
  button: {
    backgroundColor: "#fa9c05",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    width: 100,
  },
  input: {
    borderColor: "#30284a",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontFamily: "Nunito-Regular",
    color: "white",
    width: 350,
  },
  text: {
    fontFamily: "Nunito-SemiBold",
    color: "white",
  },
});

export default ChangeEmailScreen;
