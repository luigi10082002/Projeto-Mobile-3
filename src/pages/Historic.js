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
    <>
      <ScrollView>
        <View style={styles.container}>
          <Header title="Histórico" />
          <View style={styles.box}>
        <Text style={styles.text}>Pesquisa</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
        />
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="search" size={25} color="#000"/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Produto}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <View style={styles.card}>
              <Text>{item.produto}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: '5%',
    marginLeft: '5%',
    width: '50%',
    height: '1%',
  },
  text: {
    fontSize: 25,
  },
  input: {
    marginTop: '8%',
    width: '90%',
    height:'13%',
    marginLeft: '5%',
    flexDirection: 'row',
  },
  inputText: {
    backgroundColor: '#C0C0C0',
    width: '90%',
    height: '100%',
    paddingHorizontal: '5%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  icon: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  card : {
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    width: '80%',
    height: '60%',
    padding: '3%',
    borderRadius: 8,
  },
  list: {
    backgroundColor: "#f00",

    marginTop: '5%',
  },
  codigo: {
    marginTop: '2%',
    width: '20%',
    height: '20%',
  },
  details: {
    flexDirection: 'row',
    marginTop: '4%',
    height: '70%',
    alignContent: 'stretch',
  },
  info: {
    fontSize: 16,
  },
  trash: {
    width: '10%',
    height: '70%',
    marginLeft: '18%',
    alignItems: 'center'
  },
});
