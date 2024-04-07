import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabStack from "./TabStack";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";

// Create a stack for the authenticaion screen

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
