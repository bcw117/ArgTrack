import React from "react";
import RootNavigation from "./src/navigation/index";
import { useFonts } from "expo-font";

function App() {
  const [loaded] = useFonts({
    "Nexa-Bold": require("./assets/fonts/Nexa-Heavy.ttf"),
    "LemonMilk-Bold": require("./assets/fonts/LEMONMILK-Bold.otf"),
    "SourceSansPro-Regular": require("./assets/fonts/SourceSansPro-Regular.otf"),
    "SourceSansPro-Bold": require("./assets/fonts/SourceSansPro-Bold.otf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Proxima-Nova": require("./assets/fonts/Proxima-Nova.otf"),
  });

  if (!loaded) {
    return null;
  }

  return <RootNavigation />;
}

export default App;
