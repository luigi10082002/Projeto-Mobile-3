import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  FlatList,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Header } from "../components/Header";

export default function Modules() {
  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState();

  const date =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  const hora =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();

  const [Produto, setProduto] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function Capture({ data }) {
    setScanned(true);
    const newProd = {
      id: uuid.v4(),
      produto: data,
      qtd: 1,
      date: date,
      hora: hora,
    };

    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    const index = Produto.findIndex((element) => element.produto == data);

    if (index >= 0) {
      Produto[index].qtd = parseInt(Produto[index].qtd) + 1;
      await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Produtos",
        JSON.stringify([...Produto, newProd])
      );
    }

    Alert.alert("Confirmação", "Produto Salva Com Sucesso", [
      {
        text: "OK",
        onPress: () => setScanned(false),
      },
    ]);
  }

  async function Save() {
    const newProd = {
      id: uuid.v4(),
      produto: codigo,
      qtd: qtd,
      data: date,
      hora: hora,
    };

    //Verifica se tem alguma coisa na storage
    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    const index = Produto.findIndex((element) => element.produto == codigo);

    if (index >= 0) {
      Produto[index].qtd = parseInt(Produto[index].qtd) + parseInt(qtd);
      await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Produtos",
        JSON.stringify([...Produto, newProd])
      );
    }
    Alert.alert("Produto Salvo", `Seu produto foi salvo`, [
      {
        text: "Ok",
      },
    ]);
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Header title="Contagem de invenatario" />
          <View style={styles.info}>
            <Text style={styles.textCod}>Código</Text>
            <Text style={styles.textQtd}>Quantidade</Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.labelCod}
              autoCorrect={false}
              onChangeText={setCodigo}
              value={codigo}
            ></TextInput>

            <TextInput
              style={styles.labelQtd}
              autoCorrect={false}
              onChangeText={setQtd}
            ></TextInput>
          </View>

          <View style={styles.buttonSave}>
            <TouchableOpacity style={styles.save} onPress={Save}>
              <Text style={styles.textSave}>SALVAR</Text>
            </TouchableOpacity>
          </View>

          <Text>A</Text>
          <Text>A</Text>
          <Text>A</Text>
          <Text>A</Text>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS das Views
  info: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
    height: "auto",
    width: "90%",
  },
  input: {
    flexDirection: "row",
    marginLeft: "5%",
    width: "100%",
    height: "15%",
  },
  buttonSave: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "90%",
    height: "15%",
  },
  //CSS dos Textos
  textQtd: {
    marginLeft: "48%",
    height: "auto",
    width: "32%",
    fontSize: 20,
  },
  textCod: {
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textSave: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  //CSS dos Inputs
  labelQtd: {
    backgroundColor: "#CACACA",
    borderRadius: 8,
    paddingHorizontal: "3%",
    marginLeft: "5%",
    height: "100%",
    width: "29%",
  },
  labelCod: {
    backgroundColor: "#CACACA",
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "56%",
  },
  //CSS do Botão SALVAR
  save: {
    backgroundColor: "#4B7DFE",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
