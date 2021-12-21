import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
//import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { COLORS } from "../components/Colors";

export function Header({ title, action, modelo }) {
  const navigation = useNavigation();

  function handleGoBack() {
    const tipo = modelo === "" ? "Home" : modelo;
    const screen = modelo === "Modules" ? "" : modelo === "Produto" ? "" : "";

    navigation.navigate("Home", {
      id: screen,
      screen: "Modules",
      backScreen: "Home",
    });
  }

  return (
    <View style={styles.container}>
      <Feather
        onPress={handleGoBack}
        name="arrow-left"
        size={24}
        color={COLORS.White}
        style={{ marginTop: "15%" }}
      />

      <Text style={styles.title}>{title}</Text>

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 85,
    //paddingTop: getStatusBarHeight(),
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Blue,
  },
  title: {
    fontFamily: "Rajdhani_600SemiBold",
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: COLORS.White,
    marginTop: "15%",
  },
});
