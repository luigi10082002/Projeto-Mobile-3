import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { COLORS } from "../components/Colors";
import Infos from "../components/Infos";
//import splash from "../../assets/splash";

function Home() {
  //Constante de navegação
  const navigation = useNavigation();

  //Constante do array dos produtos
  const [Produto, setProduto] = useState([]);

  //Callback do AsyncStorage dos produtos
  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  //Navegação para a tela de adicionar produto
  function NewProduto() {
    navigation.navigate("Modules");
  }

  //Navegação para a tela de histórico
  function Historic() {
    navigation.navigate("Historic");
  }

  return (
    <View style={styles.container}>
      {/*<KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >*/}
      <View style={styles.boxUser}>
        <Text style={styles.Text}>Olá</Text>
      </View>

      <View style={styles.boxButton}>
        {/*Bootão para adicionar produto */}
        <TouchableOpacity style={styles.ButtonAdd} onPress={NewProduto}>
          <Entypo name="plus" size={35} color="#FFF" />
          <Text style={styles.TextPlus}>NOVO PRODUTO</Text>
        </TouchableOpacity>
      </View>

      <Infos />

      <View style={styles.boxButton}>
        {/*Botão que leva ao histórico*/}
        <TouchableOpacity style={styles.ButtonHistoric} onPress={Historic}>
          <AntDesign name="clockcircleo" size={20} color="#FFF" />
          <Text style={styles.TextPlus}>LISTAR PRODUTOS</Text>
        </TouchableOpacity>
      </View>

      {/*</KeyboardAvoidingView>*/}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS Views
  boxUser: {
    width: "35%",
    height: "17%",
    marginLeft: "4%",
    marginTop: "30%",
  },
  boxButton: {
    width: "85%",
    height: "15%",
    alignSelf: "center",
  },
  //CSS Texts
  Text: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 33,
  },
  TextBold: {
    fontSize: 33,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextPlus: {
    color: COLORS.White,
    fontSize: 20,
    marginLeft: "2%",
    fontFamily: "Rajdhani_600SemiBold",
  },
  //CSS Buttons
  ButtonAdd: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Blue,
    borderRadius: 9,
  },
  ButtonHistoric: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Gray_Secondary,
    borderRadius: 9,
  },
});

export default Home;
