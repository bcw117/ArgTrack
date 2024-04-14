import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  // Assign state variables to screen
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    isRunning: true,
  });

  // Reset the timer
  const reset = () => {
    setTime({
      ...time,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    });
  };

  // For every second, update time metrics
  useEffect(() => {
    // Set interval for timer
    let interval;
    if (time.isRunning) {
      interval = setInterval(() => {
        setTime({ ...time, seconds: time.seconds + 1 });
        if (time.seconds == 59) {
          setTime({ ...time, seconds: 0, minutes: time.minutes + 1 });
        }
        if (time.minutes == 59) {
          setTime({ ...time, minutes: 0, hours: time.hours + 1 });
        }
        if (time.hours == 23) {
          setTime({ ...time, hours: 0, days: time.days + 1 });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time]);
  // Rerun function everytime state is changed

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Time Since Last Argument</Text>
      <View style={styles.countDownContainer}>
        <Text style={styles.dates}>{time.days} days</Text>
        <Text style={styles.dates}>{time.hours} hours</Text>
        <Text style={styles.dates}>{time.minutes} minutes</Text>
        <Text style={styles.dates}>{time.seconds} seconds</Text>
      </View>
      <Pressable style={styles.button} onPress={reset}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          Reset
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
  },

  countDownContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dates: {
    fontFamily: "LemonMilk-Bold",
    fontSize: 20,
    padding: 15,
  },
  title: {
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    padding: 20,
  },
  button: {
    margin: 30,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
  },
  timer: {
    fontSize: 20,
    padding: 20,
  },
});

export default HomeScreen;
