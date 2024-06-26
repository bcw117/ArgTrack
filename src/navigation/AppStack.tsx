import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabStack from "./TabStack";
import ChangePasswordScreen from "@screens/ChangePasswordScreen";
import ChangeEmailScreen from "@screens/ChangeEmailScreen";
import EmailVerificationScreen from "@screens/EmailVerificationScreen";
import { FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabStack">
        <Stack.Screen
          name="TabStack"
          options={{ headerShown: false }}
          component={TabStack}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{
            headerTitle: () => (
              <FontAwesome5 name="lock" size={24} color="white" />
            ),
            headerStyle: {
              backgroundColor: "#171324",
            },
            headerTintColor: "white",
          }}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name="ChangeEmail"
          options={{
            headerTitle: () => (
              <MaterialIcons name="email" size={24} color="white" />
            ),
            headerStyle: {
              backgroundColor: "#171324",
            },
            headerTintColor: "white",
          }}
          component={ChangeEmailScreen}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerificationScreen}
          options={{
            headerTitle: () => (
              <Octicons name="unverified" size={24} color="white" />
            ),
            headerStyle: {
              backgroundColor: "#171324",
            },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
