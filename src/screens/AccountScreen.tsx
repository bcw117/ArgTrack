import { useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

export default function AccountScreen({ navigation }) {
  const session = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
      return supabase.auth.refreshSession();
    }
  }

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!username.length || !name.length)
        return Alert.alert("You cannot leave any of the fields empty");

      const updates = {
        id: session?.user.id,
        username: username,
        full_name: name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <Text style={styles.title}>Account</Text>
        <View style={styles.inner}>
          <Text style={styles.field}>Name: </Text>
          <TextInput
            style={styles.input}
            value={loading ? "Loading..." : name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Username: </Text>
          <TextInput
            style={styles.input}
            value={loading ? "Loading..." : username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Email: </Text>
          <Text
            style={{
              color: "white",
              flex: 1,
              borderRadius: 5,
              padding: 4,
              fontSize: 14.5,
            }}
          >
            {session?.user?.email}
          </Text>
        </View>
        <View style={styles.inner}>
          <Text style={styles.field}>Verified Status: </Text>
          {session.user.user_metadata.email_verified ? (
            <MaterialIcons name="verified" size={24} color="green" />
          ) : (
            <View style={styles.verifyContainer}>
              <Feather
                style={{ paddingHorizontal: 10 }}
                name="x-circle"
                size={24}
                color="red"
              />
              <Pressable
                style={styles.verifyButton}
                onPress={() => navigation.navigate("EmailVerification")}
              >
                <Text style={styles.verifyText}>Verify Email</Text>
              </Pressable>
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
          <Pressable style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
            <MaterialIcons
              name="logout"
              size={24}
              color="black"
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#171324",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
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
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: "#30284a",
    padding: 4,
    color: "white",
  },
  verifyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifyText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 12.5,
  },
  verifyButton: {
    backgroundColor: "#fa9c05",
    padding: 7,
    borderRadius: 5,
  },
  field: {
    fontFamily: "Nunito-Bold",
    color: "white",
    fontSize: 17.5,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#fa9c05",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
  },
});
