import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Vibration,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import uuid from "react-native-uuid";
import { useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { Header } from "../../components/Header";
import Modal from "../../components/modal/ModalItem"
import { styles } from "./styles";

export default function Modules() {
  //Constante do Modal
  const [modal, setModal] = useState(false);

  //Constantes do scanner
  const [scanned, setScanned] = useState(true);

  //Constantes que armazenam os dados dos produto
  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState("");
  const [local, setLocal] = useState("");

  //Cosntante de seleção de item do modal
  const [prodItem, setprodItem] = useState([]);

  const [vDate, setDate] = useState("");

  const [vHora, setHora] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  //Constante que armazena o produto no array
  const [Produto, setProduto] = useState([]);

  useEffect(() => {
    //Verificação da leitura do scanner
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [codigo, scanned, qtd, vDate, vHora]);

  //Callback do AsyncStorage dos produtos
  useFocusEffect(
    useCallback(() => {
      loadSpots();
      setDataHora();
    }, [Produto])
  );

  const setDataHora = () => {
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

    setDate(date);
    setHora(hora);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //Separação dos ultimos produtos para a lista de "ultimos produtos adicionados"
  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];
    const array = storage.reverse();
    const last = array.splice(0, 3);
    setProduto(last);
  }

  //Lógica do scanner
  async function handleBarCodeScanned({ data }) {
    setCodigo(data);
    setQtd(1);
    setScanned(true);
  }

  //Lógica que captura o código
  function handleBarCodeSetScanned() {
    setScanned(false);
    setTimeout(() => {
      setScanned(true);
    }, 1000);
  }

  //Parametros que são armazenados dos produtos
  async function Save() {
    const newProd = {
      id: uuid.v4(),
      produto: codigo,
      qtd: qtd,
      date: vDate,
      hora: vHora,
      local: local,
    };

    //Verificação se algum campo do produto está vazio
    if (qtd <= 0 || codigo == "") {
      Alert.alert("Erro", "O produto não contem as informações necessárias", [
        {
          text: "OK",
        },
      ]);
    } else {
      //Adiciona o produto no array
      if (qtd <= 0) {
        qtd = 1;
      }
      const storage = await AsyncStorage.getItem("@Produtos");
      const Produto = storage ? JSON.parse(storage) : [];

      //Compara se tem um produto com o mesmo código do produto que vai ser adicionado
      const index = Produto.findIndex((element) => element.produto == codigo);

      //Soma os produtos que têm o mesmo código
      if (index >= 0) {
        Produto[index].qtd = parseInt(Produto[index].qtd) + parseInt(qtd);
        await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
      } else {
        await AsyncStorage.setItem(
          "@Produtos",
          JSON.stringify([...Produto, newProd])
        );
      }

      /*
      Alerta que o produto foi salvo e limpa os campos
      Alert.alert("Produto Salvo", `Seu produto foi salvo`, [
        {
          text: "OK",
        },
      ]);
      */

      setCodigo("");
      setQtd(1);
      setLocal("");
      Vibration.vibrate();
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header title="Contagem de Inventário" />

        <ScrollView>
          {/*Scanner*/}
          <View style={styles.scanner}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 600, width: 600 }}
            />

            {/*Botão de captura de código*/}
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleBarCodeSetScanned}
              >
                <Text style={styles.buttonText}>CAPTURAR</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Infos}>
            <View style={styles.Local}>
              <Text style={styles.textLocal}>Local</Text>
              <TextInput
                style={styles.labelLocal}
                autoCorrect={false}
                onChangeText={setLocal}
                value={local}
                placeholder="Local"
                textAlign="right"
              />
            </View>
          </View>

          <View style={styles.Infos}>
            <View style={styles.Cod}>
              <Text style={styles.textCod}>Código</Text>
              <TextInput
                style={styles.labelCod}
                autoCorrect={false}
                onChangeText={setCodigo}
                value={codigo}
                keyboardType="numeric"
                placeholder="Código"
                maxLength={13}
                textAlign="right"
              />
            </View>

            <View style={styles.Qtd}>
              <Text style={styles.textQtd}>Quantidade</Text>
              <TextInput
                style={styles.labelQtd}
                autoCorrect={false}
                onChangeText={setQtd}
                value={qtd}
                keyboardType="numeric"
                placeholder="1"
                maxLength={4}
                textAlign="right"
              />
            </View>
          </View>

          {/*Botão de salvar*/}
          <View style={styles.buttonSave}>
            <TouchableOpacity style={styles.save} onPress={Save}>
              <Text style={styles.textSave}>ADICIONAR</Text>
            </TouchableOpacity>
          </View>

          {/*Legenda da área de "últimos itens adicionados"*/}
          <View style={styles.listProdutos}>
            <Text style={styles.textList}>ÚLTIMOS ITENS</Text>
          </View>

          {/*Lista de produtos*/}
          <View style={styles.listItems}>
            <FlatList
              data={Produto}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <RectButton
                    style={styles.details}
                    onPress={(e) => {
                      setModal(true);
                      setprodItem(item);
                    }}
                  >
                    <Text style={styles.CodProd}>{item.produto}</Text>
                    <View style={styles.infosProd}>
                    <Text>{item.local} </Text>
                      {!item.dtalteracao ? (
                        <>
                          <Text>{item.date}</Text>
                          <Text> {item.hora}</Text>
                        </>
                      ) : (
                        <Text>{item.dtalteracao}</Text>
                      )}
                      <Text> - </Text>
                      <Text>{item.qtd} </Text>
                      <Text>unidade(s)</Text>
                    </View>
                  </RectButton>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/*Modal para a edição de item*/}
      <Modal
        show={modal}
        produtos={prodItem}
        close={() => setModal(false)}
        date={vDate}
        hora={vHora}
      />
    </View>
  );
}
