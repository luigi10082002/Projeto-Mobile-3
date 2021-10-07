import React, { useState, useEffect, useCallback } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import uuid from "react-native-uuid";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { Header } from "../components/Header";

export default function Modules() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

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
  }, [codigo, scanned, qtd]);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];
    storage.splice(4, 1);
    setProduto(storage);
  }

  async function handleBarCodeScanned({ data }) {
    setCodigo(data);
    setQtd(1);
    setScanned(true);
  }

  function handleBarCodeSetScanned() {
    setScanned(false);
    setTimeout(() => {
      setScanned(true);
    }, 1000);  }

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
        text: "OK",
      },
    ]);

    setCodigo("");
  }

  async function handleRemove(item) {
    const id = Produto.findIndex((element) => element.id == item.id);
    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não",
        style: "Cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          Produto.splice(id, 1);
          await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
        },
      },
    ]);
  }

  function Edit(item) {
    navigation.navigate("Produto", {
      screen: "Produto",
      produto: item,
    });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header title="Contagem de Invenatario" />

        <View style={styles.scanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 500, width: 500 }}
          />

          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleBarCodeSetScanned}
            >
              <Text style={styles.buttonText}>CAPTURAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.textQtd}>Quantidade</Text>
          <Text style={styles.textCod}>Código</Text>
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.labelQtd}
            autoCorrect={false}
            onChangeText={setQtd}
            value={qtd}
            keyboardType="numeric"
            placeholder="Quantidade"
          />

          <TextInput
            style={styles.labelCod}
            autoCorrect={false}
            onChangeText={setCodigo}
            value={codigo}
            keyboardType="numeric"
            placeholder="Código"
          />
        </View>

        <View style={styles.buttonSave}>
          <TouchableOpacity style={styles.save} onPress={Save}>
            <Text style={styles.textSave}>SALVAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listProdutos}>
          <Text style={styles.textList}>ÚLTIMOS ITENS</Text>
        </View>

        <View style={styles.listItems}>
          <ScrollView>
            <FlatList
              data={Produto}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.detailsProd}>
                    <TouchableOpacity
                      onPress={(e) => {
                        Edit(item);
                      }}
                    >
                      <Text style={styles.codigo}>{item.produto}</Text>
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
                      onPress={(e) => {
                        handleRemove(item);
                      }}
                    >
                      <Entypo name="trash" size={30} color="#f00" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    height: 30,
    width: 320,
  },
  input: {
    flexDirection: "row",
    alignSelf: "center",
    width: 320,
    height: 45,
  },
  buttonSave: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "90%",
    height: 50,
  },
  listProdutos: {
    marginTop: "5%",
    marginLeft: "5%",
    width: "40%",
    height: 35,
  },
  //CSS dos Textos
  textQtd: {
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textCod: {
    marginLeft: "5%",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textSave: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  textList: {
    fontSize: 20,
  },
  //CSS dos Inputs
  labelQtd: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "32%",
  },
  labelCod: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "63%",
    marginLeft: "5%",
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

  scanner: {
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    width: "75%",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: "5%",
  },
  button: {
    backgroundColor: "#4B7DFE",
    width: "45%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btn: {
    width: "100%",
    height: "100%",
    marginTop: "25%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listItems: {
    alignSelf: "center",
    height: 255,
    width: "95%",
  },
  card: {
    flex: 1,
    backgroundColor: "#DCDCDC",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: "2%",
    height: 80,
    width: "90%",
    padding: 20,
  },
  codigo: {
    fontSize: 15,
    fontWeight: "bold",
  },
  details: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
  },
  detailsProd: {
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
});
