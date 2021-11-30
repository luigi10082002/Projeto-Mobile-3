import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Infos from "../../components/Infos";
import { styles } from "./styles"

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

      <View style={styles.boxButton}>
        {/*Bootão para adicionar produto */}
        <TouchableOpacity style={styles.ButtonAdd} onPress={NewProduto}>
          <Entypo name="plus" size={35} color="#FFF" />
          <Text style={styles.TextADD}>ADICIONAR ITENS</Text>
        </TouchableOpacity>
      </View>

      <Infos />

      <View style={styles.Button}>
        {/*Botão que leva ao histórico*/}
        <TouchableOpacity style={styles.ButtonHistoric} onPress={Historic}>
          <AntDesign name="clockcircleo" size={20} color="#FFF" />
          <Text style={styles.TextList}>ITENS LISTADOS</Text>
        </TouchableOpacity>
      </View>

      {/*</KeyboardAvoidingView>*/}
    </View>
  );
}

export default Home;
