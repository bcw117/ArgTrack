import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { db } from "../../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

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
  }, []);

  const deleteLog = (id) => {
    deleteDoc(doc(db, "fightLog", id))
      .then(() => {
        let existingLogs = [...logs].filter((log) => log.id !== id);
        setLogs(existingLogs);
      })
      .catch((error) => {
        alert(error);
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
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={history.container}>
      <Text style={history.title}>History</Text>
      <ScrollView style={history.inner}>
        {logs.map((item, key) => {
          return (
            <View style={[history.logContainer, history.shadowProp]} key={key}>
              <Text style={{ fontFamily: "SourceSansPro-Bold" }}>Reason:</Text>
              <TextInput
                style={{
                  fontFamily: "SourceSansPro-Regular",
                  marginVertical: 5,
                }}
                color="black"
                defaultValue={item.reason}
                multiline={true}
                onChangeText={(text) => setUpdatedText(text)}
              ></TextInput>
              <Text
                style={{ fontFamily: "SourceSansPro-Bold", marginVertical: 5 }}
              >
                Date:
              </Text>
              <Text
                style={{ fontFamily: "SourceSansPro-Regular", marginBottom: 3 }}
              >
                {item.date.toDate().toDateString()}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={history.button}
                  onPress={() => updateLog(item.id)}
                >
                  <Text style={{ color: "white" }}>Update Log</Text>
                </Pressable>
                <Pressable
                  style={history.button}
                  onPress={() => deleteLog(item.id)}
                >
                  <Text style={{ color: "white" }}>Delete Log</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const history = StyleSheet.create({
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
