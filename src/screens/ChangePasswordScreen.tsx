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
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen = ({ navigation }) => {
  const [prevPass, setPrevPass] = useState("");
  const [showPrevPass, setShowPrevPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirmationPass, setShowConfirmationPass] = useState(false);

  async function changePassword() {
    if (confirmPass != newPass) {
      return Alert.alert("There was an error changing your password");
    }

    const { data, error } = await supabase.rpc("change_user_password", {
      current_plain_password: prevPass,
      new_plain_password: newPass,
    });

    if (error) {
      return Alert.alert(error.message);
    }

    if (data) {
      setPrevPass("");
      setNewPass("");
      setConfirmPass("");
      const { error } = await supabase.auth.signOut();
      if (error) return Alert.alert(error.message);
      return Alert.alert("Your password has been changed");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <Text style={styles.title}>Change your Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Previous Password</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={prevPass}
              onChangeText={(text) => setPrevPass(text)}
              secureTextEntry={!showPrevPass}
            />
            <Pressable
              onPress={() => {
                setShowPrevPass(!showPrevPass);
              }}
            >
              {showPrevPass ? (
                <Ionicons name="eye" size={18} color="#504b5e" />
              ) : (
                <Ionicons name="eye-off" size={18} color="#504b5e" />
              )}
            </Pressable>
          </View>
          <Text style={styles.text}>New Password</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={newPass}
              onChangeText={(text) => setNewPass(text)}
              secureTextEntry={!showNewPass}
            />
            <Pressable
              onPress={() => {
                setShowNewPass(!showNewPass);
              }}
            >
              {showNewPass ? (
                <Ionicons name="eye" size={18} color="#504b5e" />
              ) : (
                <Ionicons name="eye-off" size={18} color="#504b5e" />
              )}
            </Pressable>
          </View>
          <Text style={styles.text}>Confirm Password</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
              secureTextEntry={!showConfirmationPass}
            />
            <Pressable
              onPress={() => {
                setShowConfirmationPass(!showConfirmationPass);
              }}
            >
              {showConfirmationPass ? (
                <Ionicons name="eye" size={18} color="#504b5e" />
              ) : (
                <Ionicons name="eye-off" size={18} color="#504b5e" />
              )}
            </Pressable>
          </View>
        </View>
        <Pressable style={styles.button} onPress={changePassword}>
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
  inputContainer: {
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontSize: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "#fa9c05",
    padding: 15,
    marginVertical: 5,
    marginLeft: 5,
    alignItems: "center",
    borderRadius: 5,
    width: 100,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1b2e",
    borderRadius: 7.5,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginVertical: 5,
  },
  inputText: {
    fontFamily: "Nunito-Regular",
    width: "90%",
    color: "white",
  },
  text: {
    color: "white",
    fontFamily: "Nunito-SemiBold",
  },
});

export default ChangePasswordScreen;
