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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";

export default function Historic() {
  const navigation = useNavigation();
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
          await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
        },
      },
    ]);
  }

  function Edit() {
    navigation.navigate("Produto")

  }

  return (
        <View style={styles.container}>
          <Header title="Histórico" />

          <ScrollView>

          <View style={styles.search}>
            <TextInput
              style={styles.input}
            ></TextInput>
            <TouchableOpacity style={styles.btn}>
            <FontAwesome name="search" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.listItems}>
            <FlatList
              data={Produto}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.details}>
                    <TouchableOpacity style={styles.info} onPress={Edit}>
                      <Text style={styles.textCod}>{item.produto}</Text>
                      <View style={styles.details}>
                        <Text>{item.date}</Text>
                        <Text> {item.hora}</Text>
                        <Text> - </Text>
                        <Text>{item.qtd} </Text>
                        <Text>unidade(s)</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.delete}>
                    <TouchableOpacity
                      style={styles.buttonDelete}
                      onPress={handleRemove}
                    >
                      <FontAwesome name="trash" size={30} color="#f00" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          </ScrollView>

        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
    listItems: {
      backgroundColor: '#00f',
    alignSelf: "center",
    marginTop: "3%",
    height: "100%",
    width: "90%",
    },
    card: {
    flex: 1,
    backgroundColor: "#CACACA",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: '2%',
    marginBottom: '2%',
    height: "85%",
    width: "90%",
    padding: 20,
    },
    textCod: {
    fontSize: 15,
    fontWeight: "bold",
    },
    details: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
    },
    delete: {
    width: "13%",
    height: "auto",
    marginTop: "5%",
    },
    buttonDelete: {
    marginLeft: "10%",
    },
    search: {
      flexDirection: 'row',
      width: "90%",
      height: "10%",
      marginTop: "5%",
      marginLeft: "5%",
    },
    input: {
      backgroundColor: "#C0C0C0",
      height: "100%",
      width: "88%",
      paddingHorizontal: '3%',
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8
    },
    btn: {
      backgroundColor: "#C0C0C0",
      justifyContent: "center",
      alignSelf: "center",
      width: "12%",
      height: "100%",
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8
    },
});
