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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Header } from "../components/Header";
import Modal from "../components/ModalItem";

export default function Modules() {
  //Constante de navegação
  const navigation = useNavigation();

  //Constante do Modal
  const [modal, setModal] = useState(false);

  //Constantes do scanner
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  //Constantes que armazenam os dados dos produto
  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState("");

  //Cosntante de seleção de item do modal
  const [prodItem, setprodItem] = useState([]);

  const[vDate, setDate] =  useState('');

  const[vHora, setHora] =  useState('');

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

    const  hora =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();

    setDate(date);
    setHora(hora);
  }

  //Separação dos ultimos produtos para a lista de "ultimos produtos adicionados"
  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];
    const last = storage.reverse();
    //const array = last.splice(0, 3);
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
      //Alerta que o produto foi salvo e limpa os campos
      {/*Alert.alert("Produto Salvo", `Seu produto foi salvo`, [
        {
          text: "OK",
        },
      ]);*/}

      setCodigo("");
      setQtd(1);
    }
  }

  //Lógica para remover o produto
  async function handleRemove(item) {
   // console.log(item);
    const id = Produto.findIndex(element => element.id == item.id);
   
    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não",
        style: "Cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          //Produto.splice(id, 1);
          Produto.splice(id, 1);
          await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
        },
      },
    ]);
  }

  {
    /*
    function Edit(item) {
      navigation.navigate("Produto", {
        screen: "Produto",
        produto: item,
      });
    }
  */
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : null}
      >
        <Header title="Contagem de Invenatario" />

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

{/*
        <View style={styles.info}>
          <Text style={styles.textQtd}>Quantidade</Text>
          <Text style={styles.textCod}>Código</Text>
        </View>
        <View style={styles.inputQtd}>
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
        <View style={styles.inputCod}>
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
       
*/}

        <View style={styles.Infos}>
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
        </View>

        {/*Botão de salvar*/}
        <View style={styles.buttonSave}>
          <TouchableOpacity style={styles.save} onPress={Save}>
            <Text style={styles.textSave}>SALVAR</Text>
          </TouchableOpacity>
        </View>

        {/*Legenda da área de "últimos itens adicionados"*/}
        <View style={styles.listProdutos}>
          <Text style={styles.textList}>ÚLTIMOS ITENS</Text>
        </View>

        <Animated.View
          style={{
            width: "100%",
            alignSelf: "center",

          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 1 }}
          onScroll={scrollHandler}
          scrollEventThrottle={10} // 1000 / 60 = 16. (1 segundo / 60 que é a quantidade de frames por segundo para ter uma animação de 60 frames)
        >

        {/*Lista de produtos*/}
        <View style={styles.listItems}>
          <FlatList
            data={Produto}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Swipeable
                  overshootRight={false}
                  renderRightActions={() => (
                    <View style={styles.delete}>
                    <RectButton
                      style={styles.buttonDelete}
                      onPress={(e) => {
                        handleRemove(item);
                      }}
                    >
                      <FontAwesome5 name="trash" size={30} color="#fff"/>
                    </RectButton>
                  </View>
              )}>
              <View style={styles.card}>
                <View style={styles.details}>
                  <RectButton
                    onPress={(e) => {
                      setModal(true);
                      setprodItem(item);
                    }}
                  >
                    {/*<TouchableOpacity onPress={(e) => {Edit(item)}}>*/}
                    <Text style={styles.codigo}>{item.produto}</Text>
                    <View style={styles.details}>
                    {!item.dtalteracao ? 
                          <><Text>{item.date}</Text><Text> {item.hora}</Text></>
                          :
                          <Text>{item.dtalteracao}</Text>
                        }
                      <Text> - </Text>
                      <Text>{item.qtd} </Text>
                      <Text>unidade(s)</Text>
                    </View>
                  </RectButton>
                </View>
              </View>
              </Swipeable>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        </Animated.View>
      </KeyboardAvoidingView>
      {/*Modal para a edição de item*/}
      <Modal show={modal} produtos={prodItem} close={() => setModal(false)} date={vDate} hora={vHora}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //CSS das Views
  scanner: {
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    width: "90%",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: "5%",
  },
  btn: {
    width: "100%",
    height: "100%",
    marginTop: "20%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
  Infos: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
    height: 64,
    width: "90%",
  },
  Qtd: {
    width: '30%',
    height: '100%',
  },
  Cod: {
    marginLeft: '5%',
    width: '65%',
    height: '100%',
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
  listItems: {
    alignSelf: "center",
    height: 261,
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
  detailsProd: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
  },
  details: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
  },
  delete: {
    width: '20%',
    height: '75%',
    backgroundColor: "#f00",
    marginRight: '5%',
    marginTop: '3%',
    borderRadius: 8,
    position: "relative",
  },
  //CSS dos Textos
  textQtd: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textCod: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textSave: {
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFF",
    fontSize: 20,
  },
  textList: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  codigo: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
    color: "#fff",
  },
  //CSS dos Inputs
  labelQtd: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    paddingHorizontal: "5%",
    height: "61%",
    width: '100%',
  },
  labelCod: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    paddingHorizontal: "5%",
    height: "61%",
    width: '100%',
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
  button: {
    backgroundColor: "#4B7DFE",
    width: "45%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonDelete: {
    alignSelf: "center",
    marginTop: "25%",
  },
});
