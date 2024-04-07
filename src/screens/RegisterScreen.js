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
} from "react-native";
import { auth } from "../../firebaseConfig";
import {
  reload,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setconfirmationPassword] = useState("");

  // Create a new user using inputs from user and store in database
  const signUp = () => {
    if (fullname === "" || username === "" || email === "" || password === "") {
      return Alert.alert("Error", "Not all fields filled in");
    } else if (confirmationPassword != password) {
      return Alert.alert(
        "Error",
        "There was a problem with entering one of the fields"
      );
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        setDoc(doc(db, "users", cred.user.uid), {
          id: cred.user.uid,
          name: fullname,
          email: email,
        });

        updateProfile(auth.currentUser, {
          displayName: username,
        });

        sendEmailVerification(auth.currentUser).then(() => {
          Alert.alert(
            "Verification Email",
            "We have sent an email to verify your email address"
          );
        });
        navigation.navigate("EmailVerification");
      })

      .catch((error) => {
        Alert.alert("Error", "Problem with registration fields");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.inner}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Nexa-Bold",
            fontSize: 25,
            marginBottom: 25,
          }}
        >
          Register
        </Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(text) => setconfirmationPassword(text)}
            secureTextEntry={true}
          />

          <Pressable style={styles.button} onPress={signUp}>
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
    backgroundColor: "#f9fbfc",
    height: "100%",
    width: "100%",
  },
  inner: {
    alignContent: "center",
    width: "90%",
  },
  input: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
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

export default RegisterScreen;
