import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { KeyboardAvoidingView } from "react-native";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/context/AuthContext";

const CalendarScreen = () => {
  const session = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

  async function logReason() {
    if (!date || !text) {
      return Alert.alert("You have not entered a valid reason or date");
    }

    let tempDate = new Date(date);
    tempDate = new Date(
      tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset())
    );

    const { error, data } = await supabase.rpc("addlog", {
      given_id: session.user.id,
      given_reason: text,
      given_date: date,
    });

    if (error) Alert.alert(error.message);

    return Alert.alert("Successfully logged");
  }

  useEffect(() => {
    setDate(moment().format("YYYY-MM-DD"));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <Text style={styles.title}>Calendar</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            style={{
              paddingVertical: 20,
              width: Dimensions.get("window").width,
            }}
            theme={{
              calendarBackground: "#171324",
              dayTextColor: "#fff",
              monthTextColor: "#fff",
              textMonthFontWeight: "bold",
              textDisabledColor: "#444",
            }}
            onDayPress={(day) => {
              setDate(moment(day.dateString).format("YYYY-MM-DD"));
            }}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "blue",
              },
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.textBoxContainer}>
            <Text
              style={{
                color: "white",
                fontFamily: "Nunito-Bold",
                fontSize: 17.5,
                padding: 5,
                marginBottom: 5,
              }}
            >
              Reason:
            </Text>
            <TextInput
              style={styles.textInputBox}
              multiline={true}
              placeholder="Type your problem here!"
              placeholderTextColor="#b7b8b6"
              onChangeText={(newText) => setText(newText)}
              defaultValue={text}
            />
            <Pressable style={styles.submitButton}>
              <Text style={styles.submitText} onPress={logReason}>
                Submit
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#171324",
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    fontSize: 40,
    padding: 10,
  },
  calendarContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  textBoxContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textInputBox: {
    fontFamily: "Nunito-Regular",
    color: "white",
    alignItems: "center",
    backgroundColor: "#1d1d2d",
    borderRadius: 10,
    textAlignVertical: "top",
    padding: 6,
    width: 350,
    height: 180,
  },
  submitButton: {
    width: 70,
    marginTop: 10,
    marginLeft: 3,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fa9c05",
  },
  submitText: {
    color: "black",
    fontFamily: "Proxima-Nova",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CalendarScreen;
