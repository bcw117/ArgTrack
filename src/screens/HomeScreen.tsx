import { AuthContext } from "@/context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { supabase } from "@/lib/supabase";

const HomeScreen = () => {
  const session = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
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
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
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
      <Text style={styles.title}>Hello {username}</Text>
      <Text style={styles.text}>It has been </Text>
      <View style={styles.countDownContainer}>
        <Text style={styles.text}>
          {time.days} days {time.hours} hours
        </Text>
        <Text style={styles.text}>
          {time.minutes} minutes and {time.seconds} seconds
        </Text>
      </View>
      <Text style={styles.text}>since your last argument</Text>
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
  title: {
    color: "white",
    fontFamily: "Nexa-Bold",
    textAlign: "center",
    fontSize: 40,
    padding: 20,
  },
  header: {
    color: "white",
    fontFamily: "Proxima-Nova-Bold",
    textAlign: "left",
    fontSize: 25,
    padding: 20,
  },
  text: {
    color: "white",
    fontFamily: "Proxima-Nova-Bold",
    fontSize: 26,
    padding: 15,
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
