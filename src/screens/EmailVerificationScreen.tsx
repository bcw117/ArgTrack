import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { auth } from "firebaseConfig";
import { sendEmailVerification, reload } from "firebase/auth";

const EmailVerification = ({ navigation }) => {
  const resendEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      Alert.alert("Email sent");
    });
  };

  const checkVerified = () => {
    reload(auth.currentUser);
    if (auth.currentUser.emailVerified) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.subText}>
          We have sent an email to {auth.currentUser.email} to verify your email
          address and activate your account.
        </Text>
        <Text style={styles.subText}>
          Click to proceed when email is verified or resend verification email.
        </Text>
      </View>
      <Pressable style={styles.button} onPress={() => resendEmail()}>
        <Text>Resend Email</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => checkVerified()}>
        <Text>Proceed</Text>
      </Pressable>
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
  innerContainer: {
    width: 360,
    marginTop: 25,
  },
  title: {
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontSize: 35,
  },
  subText: {
    fontFamily: "Proxima-Nova",
    textAlign: "center",
    fontSize: 15,
    paddingBottom: 25,
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  input: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    fontFamily: "Roboto-Regular",
  },
});

export default EmailVerification;
