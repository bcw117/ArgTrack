import { AuthContext } from "@/context/AuthContext";
import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";

const EmailVerification = ({ navigation }) => {
  const session = useContext(AuthContext);
  // const resendEmail = () => {
  //   sendEmailVerification(auth.currentUser).then(() => {
  //     Alert.alert("Email sent");
  //   });
  // };
  // const checkVerified = () => {
  //   reload(auth.currentUser);
  //   if (auth.currentUser.emailVerified) {
  //     navigation.goBack();
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.subText}>
          We have sent an email to {session.user.email} to verify your email
          address and activate your account.
        </Text>
        <Text style={styles.subText}>
          Click to proceed when the email is verified or resend verification
          email.
        </Text>
      </View>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Resend Email</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Proceed</Text>
      </Pressable>
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
  innerContainer: {
    width: 360,
    marginTop: 25,
  },
  title: {
    fontFamily: "Nexa-Bold",
    color: "white",
    textAlign: "center",
    fontSize: 35,
  },
  subText: {
    fontFamily: "Proxima-Nova",
    color: "white",
    textAlign: "center",
    fontSize: 15,
    paddingBottom: 25,
  },
  button: {
    backgroundColor: "#fa9c05",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
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
