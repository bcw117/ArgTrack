import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

const ArgumentLog = ({ item, uKey, setUpdatedText, updateLog, deleteLog }) => {
  return (
    <View style={[styles.logContainer, styles.shadowProp]} key={uKey}>
      <Text style={{ fontFamily: "SourceSansPro-Bold" }}>Reason:</Text>
      <TextInput
        style={{
          color: "black",
          fontFamily: "SourceSansPro-Regular",
          marginVertical: 5,
        }}
        defaultValue={item.reason}
        multiline={true}
        onChangeText={(text) => setUpdatedText(text)}
      ></TextInput>
      <Text style={{ fontFamily: "SourceSansPro-Bold", marginVertical: 5 }}>
        Date:
      </Text>
      <Text style={{ fontFamily: "SourceSansPro-Regular", marginBottom: 3 }}>
        {item.date.toDate().toDateString()}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.button} onPress={() => updateLog(item.id)}>
          <Text style={{ color: "white" }}>Update Log</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => deleteLog(item.id)}>
          <Text style={{ color: "white" }}>Delete Log</Text>
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

export default ArgumentLog;
