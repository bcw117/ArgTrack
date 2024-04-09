import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";

const AccountScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState(
    auth.currentUser.emailVerified
  );

  // Check user sign-out
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      alert(error);
    });
  };

  const getUserData = () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef)
      .then((results) => {
        let userData = results.data();
        setName(userData.name);
        setEmail(auth.currentUser.email);
      })
      .catch((error) => {
        return alert(error);
      });
  };

  const changeUserData = () => {
    setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        name: name,
      },
      { merge: true }
    );
    updateProfile(auth.currentUser, {
      displayName: username,
    });

    Alert.alert("Success", "Your changes have been saved!");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.title}>Account</Text>
        <View style={styles.inner}>
          <Text style={styles.field}>Name: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
          >
            {name}
          </TextInput>
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Username: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserName(text)}
          >
            {username}
          </TextInput>
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Email: </Text>
          <Text
            style={{ flex: 1, borderRadius: 5, padding: 4, fontSize: 14.5 }}
          >
            {email}
          </Text>
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Verified Status: </Text>
          {verifiedStatus ? (
            <View
              style={{
                backgroundColor: "#5bf07b",
                paddingVertical: 2,
                paddingHorizontal: 3,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#0fd419" }}>✓</Text>
            </View>
          ) : (
            <View
              style={{
                borderColor: "#f73914",
                paddingVertical: 1,
                paddingHorizontal: 3,
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "red" }}>X</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("ChangeEmail")}
          >
            <Text style={styles.buttonText}>Change Email</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => changeUserData()}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleSignOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Nexa-Bold",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
    padding: 10,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    width: 325,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
  },
  field: {
    fontSize: 17.5,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Proxima-Nova",
    fontWeight: "bold",
  },
});

export default AccountScreen;
