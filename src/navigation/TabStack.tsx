import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CalendarScreen from "../screens/CalendarScreen";
import AccountScreen from "../screens/AccountScreen";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Create a stack for screens when user is logged in
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Timer") {
            return <MaterialIcons name="timer" size={size} color={color} />;
          } else if (route.name === "Calendar") {
            return <Feather name="calendar" size={size} color={color} />;
          } else if (route.name === "History") {
            return <MaterialIcons name="history" size={size} color={color} />;
          } else if (route.name === "Account") {
            return <Feather name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
      initialRouteName={"Login"}
    >
      <Tab.Screen name="Timer" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
