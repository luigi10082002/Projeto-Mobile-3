import React from "react";
import { StatusBar, YellowBox, AsyncStorage } from "react-native";

import Routes from "./src/routes/index";
import AppLoading from "expo-app-loading";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

//AsyncStorage.clear();
YellowBox.ignoreWarnings([""]);

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="translucent"

      />
      <Routes/>
    </>
  );
}
