import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  View,
} from "react-native";
import ArgumentLog from "@components/ArgumentLog";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ArgumentLogScreen = () => {
  const session = useContext(AuthContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getUserLogs();
  }, []);

  async function getUserLogs() {
    const { data, error } = await supabase.rpc("getlogs", {
      given_id: session.user.id,
    });

    if (error) return Alert.alert(error.message);

    setLogs(data);
  }

  async function deleteLog(id: number) {
    const { error } = await supabase.from("argumentlog").delete().eq("id", id);
    if (error) return Alert.alert(error.message);

    return Alert.alert("Argument has been successfully deleted");
  }

  async function updateLog(id: number, text: string) {
    const updates = {
      user_id: session?.user.id,
      reason: text,
    };
    const { error } = await supabase
      .from("argumentlog")
      .update(updates)
      .eq("id", id);
    if (error) return Alert.alert(error.message);
    return Alert.alert("Argument has been successfully updated");
  }

  if (!logs) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Argument Log</Text>
        <View
          style={[
            styles.container,
            { justifyContent: "center", marginBottom: 20 },
          ]}
        >
          <MaterialCommunityIcons
            name="text-box-multiple-outline"
            size={60}
            color="white"
          />
          <Text style={styles.header}>Currently No Logs</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Argument Log</Text>
      <ScrollView style={styles.inner}>
        {logs.map((item, key) => {
          return (
            <ArgumentLog
              item={item}
              key={key}
              updateLog={updateLog}
              deleteLog={deleteLog}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#171324",
  },
  inner: {
    width: "100%",
  },
  logContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    fontSize: 40,
    padding: 20,
  },
  header: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    padding: 20,
    fontFamily: "Proxima-Nova-Bold",
  },
  button: {
    backgroundColor: "#3B71F3",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: "45%",
    marginRight: 8,
    marginTop: 7,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default ArgumentLogScreen;
