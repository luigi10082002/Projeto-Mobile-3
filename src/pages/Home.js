import React, { useState, useCallback } from "react";
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

function Home() {
  //Constante de navegação
  const navigation = useNavigation();

  //Constante do array dos produtos
  const [Produto, setProduto] = useState([]);

  //Navegação para a tela de adicionar produto
  function NewProduto() {
    navigation.navigate("Modules");
  }

  //Navegação para a tela de histórico
  function Historic() {
    navigation.navigate("Historic");
  }

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

  return (
    <View style={styles.container}>
      {/*<KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >*/}
      <View style={styles.boxUser}>
        <Text style={styles.Text}>Olá</Text>
        <Text style={styles.TextBold}>Usuário</Text>
      </View>

      <View style={styles.boxProdutos}>
        <Text style={styles.TextProdutos}>Total de produtos</Text>
        <Text style={styles.TextNumber}>{Produto.length}</Text>
      </View>

      <View style={styles.boxButton}>
        {/*Bootão para adicionar produto */}
        <TouchableOpacity style={styles.ButtonAdd} onPress={NewProduto}>
          <Entypo name="plus" size={35} color="#FFF" />
          <Text style={styles.TextPlus}>NOVO PRODUTO</Text>
        </TouchableOpacity>
      </View>

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
  boxProdutos: {
    flexDirection: "row",
    backgroundColor: "#DCDCDC",
    width: "85%",
    height: "15%",
    alignSelf: "center",
    marginTop: "5%",
    borderRadius: 8,
  },
  boxButton: {
    width: "85%",
    height: "15%",
    alignSelf: "center",
    marginTop: "4%",
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
  TextNumber: {
    alignSelf: "center",
    marginLeft: "18%",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextProdutos: {
    alignSelf: "center",
    marginLeft: "8%",
    fontSize: 20,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextPlus: {
    color: "#fff",
    fontSize: 20,
    marginLeft: "2%",
    fontFamily: "Rajdhani_600SemiBold",
  },
  //CSS Buttons
  ButtonAdd: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B7DFE",
    borderRadius: 9,
  },
  ButtonHistoric: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#696969",
    borderRadius: 9,
  },
});

export default Home;
