import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabStack from "./TabStack";
import ScreenTitle from "@components/ScreenTitle";
import ChangePasswordScreen from "@screens/ChangePasswordScreen";
import ChangeEmailScreen from "@screens/ChangeEmailScreen";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

// Create a stack for the authenticaion screen

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen
          name="TabStack"
          options={{ headerShown: false }}
          component={TabStack}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{
            headerTitle: () => (
              <FontAwesome5 name="lock" size={24} color="black" />
            ),
          }}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name="ChangeEmail"
          options={{
            headerTitle: () => (
              <MaterialIcons name="email" size={24} color="black" />
            ),
          }}
          component={ChangeEmailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
