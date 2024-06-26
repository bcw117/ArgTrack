import { useState } from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";

const ArgumentLog = ({ item, updateLog, deleteLog }) => {
  const [text, setText] = useState(item.reason);
  return (
    <View style={styles.logContainer}>
      <Text style={styles.header}>Reason:</Text>
      <TextInput
        style={styles.text}
        defaultValue={item.reason}
        multiline={true}
        onChangeText={(text) => setText(text)}
      ></TextInput>
      <Text style={styles.header}>Date:</Text>
      <Text style={styles.text}>{item.loggeddate}</Text>
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={styles.button}
          onPress={() => updateLog(item.id, text)}
        >
          <Text style={styles.buttonText}>Update Log</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => deleteLog(item.id)}>
          <Text style={styles.buttonText}>Delete Log</Text>
        </Pressable>
      </View>
    </View>
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
    backgroundColor: "#1d1d2d",
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Nexa-Bold",
    fontWeight: "bold",
    fontSize: 40,
    padding: 20,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
    color: "black",
  },
  header: {
    fontFamily: "Nunito-Bold",
    color: "white",
  },
  text: {
    fontFamily: "Nunito-Regular",
    color: "#c9c9c9",
  },
  button: {
    backgroundColor: "#fa9c05",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: "45%",
    marginRight: 8,
    marginTop: 7,
  },
});

export default ArgumentLog;
