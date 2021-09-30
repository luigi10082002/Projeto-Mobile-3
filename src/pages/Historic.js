import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";

export default function Historic() {
  const [Produto, setProduto] = useState([]);

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

  async function handleRemove(item) {
    const id = Produto.findIndex((element) => element.id == item.id);

    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não ",
        style: "cancel",
      },
      {
        text: "Sim ",
        onPress: async () => {
          Produto.splice(id, 1);
          await AsyncStorage.setItem("@Produto", JSON.stringify(Produto));
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header title="Histórico" />

      <View style={styles.listItems}>
        <FlatList
          data={Produto}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.details}>
                <TouchableOpacity style={styles.info}>
                  <Text style={styles.textCod}>{item.produto}</Text>
                  <View style={styles.details}>
                    <Text>{item.data}</Text>
                    <Text> {item.hora}</Text>
                    <Text> - </Text>
                    <Text>{item.qtd}</Text>
                    <Text>unidade(s)</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.delete}>
                <TouchableOpacity style={styles.buttonDelete}>
                  <FontAwesome name="trash" size={35} color="#f00" />
                </TouchableOpacity>
              </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItems: {
    alignSelf: "center",
    marginTop: "30%",
    height: "70%",
    width: "90%",
  },
  card: {
    backgroundColor: "#C0C0C0",

    flexDirection: 'row',
    borderRadius: 8,
    height: '100%',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  textCod: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row'
  },
});
