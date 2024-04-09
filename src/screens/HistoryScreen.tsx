import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { db } from "firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ArgumentLog from "@components/ArgumentLog";

const HistoryScreen = () => {
  const [logs, setLogs] = useState([]);
  const [updatedText, setUpdatedText] = useState("");

  useEffect(() => {
    const collectionRef = collection(db, "fightLog");
    getDocs(collectionRef)
      .then((snapshot) => {
        let temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push({ ...doc.data(), id: doc.id });
        });
        setLogs(temp);
      })
      .catch((error) => {
        alert(error);
      });
  });

  const deleteLog = (id) => {
    deleteDoc(doc(db, "fightLog", id))
      .then(() => {
        let existingLogs = [...logs].filter((log) => log.id !== id);
        setLogs(existingLogs);
        Alert.alert("Log has been deleted");
      })
      .catch((error) => {
        Alert.alert("There was an error deleting that log");
      });
  };

  const updateLog = (id) => {
    alert(updatedText);
    const documentRef = doc(db, "fightLog", id);
    if (updatedText) {
      updateDoc(documentRef, {
        reason: updatedText,
      })
        .then(() => {
          let existingLogs = [...logs];
          const updateIndex = logs.findIndex((log) => (log.id = id));
          existingLogs[updateIndex].reason = updatedText;
          setLogs(existingLogs);
          setUpdatedText(undefined);
          Alert.alert("Log has been updated");
        })
        .catch((error) => {
          Alert.alert("There was an error updating that log");
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>History</Text>
      <ScrollView style={styles.inner}>
        {logs.map((item, key) => {
          return (
            <ArgumentLog
              item={item}
              key={key}
              setUpdatedText={setUpdatedText}
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
    backgroundColor: "white",
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
    fontFamily: "Nexa-Bold",
    fontWeight: "bold",
    fontSize: 40,
    padding: 20,
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

export default HistoryScreen;
