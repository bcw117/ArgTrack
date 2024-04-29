import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";

const HomeScreen = () => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    isRunning: true,
  });

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
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171324",
    alignItems: "center",
    height: "100%",
  },
  countDownContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dates: {
    color: "white",
    fontFamily: "LemonMilk-Bold",
    fontSize: 20,
    padding: 15,
  },
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontSize: 40,
    padding: 20,
  },
  button: {
    margin: 30,
    padding: 10,
    backgroundColor: "#fa9c05",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    fontFamily: "Nunito-SemiBold",
  },
  timer: {
    fontSize: 20,
    padding: 20,
  },
});

export default HomeScreen;
