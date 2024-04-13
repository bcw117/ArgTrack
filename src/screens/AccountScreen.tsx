import React, { useContext, useEffect, useState } from "react";
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
import { auth, db } from "firebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContext";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const AccountScreen = ({ navigation }) => {
  const userData = useContext(AuthContext);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState(userData.displayName);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      Alert.alert("There was an error signing out");
    });
  };

  const getName = () => {
    const docRef = doc(db, "users", userData.id);
    getDoc(docRef)
      .then((results) => {
        let data = results.data();
        setName(data.name);
      })
      .catch((error) => {
        return Alert.alert(error);
      });
  };

  const changeUserData = () => {
    setDoc(
      doc(db, "users", userData.id),
      {
        name: name,
      },
      { merge: true }
    );

    updateProfile(auth.currentUser, {
      displayName: displayName,
    });

    userData.displayName = displayName;

    Alert.alert("Success", "Your changes have been saved!");
  };

  useEffect(() => {
    getName();
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
            onChangeText={(text) => setDisplayName(text)}
          >
            {userData.displayName}
          </TextInput>
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Email: </Text>
          <Text
            style={{ flex: 1, borderRadius: 5, padding: 4, fontSize: 14.5 }}
          >
            {userData.email}
          </Text>
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Verified Status: </Text>
          {userData.isVerified ? (
            <MaterialIcons name="verified" size={24} color="green" />
          ) : (
            <Feather name="x-circle" size={24} color="red" />
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
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("EmailVerification")}
          >
            <Text style={styles.buttonText}>Verify Email</Text>
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
