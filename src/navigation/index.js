import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

import { auth } from "../../firebaseConfig";
import { onIdTokenChanged, reload } from "firebase/auth";

// Create a root navigation that handles what stacks to render

const RootNavigation = () => {
  // Get state variables to check if user is signed in or not
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  // Check to see if user has signed in or not
  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsVerified(user.emailVerified);
      } else {
        setUser(null);
      }
      // isLoading is set to false once page has figured out if user is signed in or not
      setIsLoading(false);
    });
  }, [isLoading, user, isVerified]); // If isLoading or user is updated, run useEffect again

  // Show a loading screen while page checks if user is signed in
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  // Render page based on if user is signed in or not
  return user && isVerified ? <AppStack /> : <AuthStack />;
};

export default RootNavigation;
