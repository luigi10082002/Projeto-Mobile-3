import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
//import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { COLORS } from "../components/Colors";

import dataHome from "../lib/DataHome";
import dataModules from "../lib/DataAddItem";
import { dataList } from "../lib/DataList";
import dataSettings from "../lib/DataSettings";

export function Header({ title, action, modelo, id }) {
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

  function Carousel() {
    //console.log(dataList)
    
    if(id === 2) {
      navigation.navigate("Index", {
        screen: "Index",
        id: 2,
        data: dataModules
      });
    } else if(id === '3') {
      navigation.navigate("Index", {
        screen: "Index",
        id: '3',
        data: dataList
      });
    } else if(id === 4) {
      navigation.navigate("Index", {
        screen: "Index",
        id: 4,
        data: dataSettings
      });
    } else {
      navigation.navigate("Index", {
        screen: "Index",
        data: dataHome
      });
    }
    
  }

  return (
    <View style={styles.container}>
      <Feather
        onPress={handleGoBack}
        name="arrow-left"
        size={24}
        color={COLORS.White}
        style={{ marginTop: "12.5%", marginHorizontal: "5%" }}
      />

      <Text style={styles.title}>{title}</Text>
        
        <FontAwesome
        name="question-circle"
        onPress={Carousel}
        size={25}
        color="#FFF"
        style={{ marginTop: "12%" }}
      />

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    //paddingTop: getStatusBarHeight(),
    //paddingHorizontal: 10,
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
    marginTop: "12.5%",
  },
});
