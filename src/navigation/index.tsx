import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import AppStack from "@/navigation/AppStack";
import AuthStack from "@/navigation/AuthStack";
import { AuthContext } from "@/context/AuthContext";

import { auth } from "firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";

export interface UserData {
  displayName: string;
  email: string;
  isVerified: boolean;
  id: string;
}

const RootNavigation = () => {
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState<UserData>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserData({
          displayName: user.displayName,
          email: user.email,
          isVerified: user.emailVerified,
          id: user.uid,
        });
      } else {
        setUser(undefined);
        setUserData(undefined);
      }
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return user ? (
    <AuthContext.Provider value={userData}>
      <AppStack />
    </AuthContext.Provider>
  ) : (
    <AuthStack />
  );
};

export default RootNavigation;
