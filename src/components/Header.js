import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export function Header({ title, action }) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("Home", {
      
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
        color={"#fff"}
        style={{ marginTop: "5%" }}
      />

      <Text style={styles.title}>{title}</Text>

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    //paddingTop: getStatusBarHeight(),
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B7DFE",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    marginTop: "5%",
  },
});
