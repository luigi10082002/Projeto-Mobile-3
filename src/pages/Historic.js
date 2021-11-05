import React, { useState, useEffect, useCallback } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";
import Modal from "../components/ModalItem";
import { COLORS } from "../components/Colors";
import ListItem from "../components/ListItems";

export default function Historic() {
  //Constante de navegação
  //const navigation = useNavigation();

  //Constante do Modal
  const [modal, setModal] = useState(false);

  //Constante do array
  const [Produto, setProduto] = useState([]);

  //Constante do código do produto
  const [codigo, setCodigo] = useState("");

  //Cosntante de seleção de item do modal
  const [prodItem, setprodItem] = useState([]);

  const [vDate, setDate] = useState("");

  const [vHora, setHora] = useState("");

  const [list, setList] = useState(); //Lista a ser renderizada

  const[comparar, setComparar] = useState();

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

  useEffect(() => {}, [vDate, vHora, list]);

  //Callback do AsyncStorage dos produtos
  useFocusEffect(
    useCallback(() => {
      loadSpots();
      setDataHora();
    }, [Produto])
  );

  useFocusEffect(
    useCallback(() => {
      LoadProduto();
    }, [Produto.length])
  );

  useEffect(() => {
    if (codigo === "") {
      setList(Produto);
    } else {
      const itemPesquisado = list.filter(
        (item) => item.produto.toLowerCase().indexOf(codigo.toLowerCase()) > -1);
  
      setList(itemPesquisado);
    }
  }, [codigo]);

  //Lógica que compara o código pesquisado com os códigos que foram adicionados
  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  function LoadProduto() {
    setList(Produto)

    const result = Produto.every( e => e === list)
    setComparar(result);
    console.log(comparar);
  }

  async function handleRemove(item) {
    const id = list.findIndex((element) => element.id == item.id);
    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não",
        style: "Cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          list.splice(id, 1);
          await AsyncStorage.setItem("@Produtos", JSON.stringify(list));
        },
      },
    ]);
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header title="Histórico" />

        {/*Input de pesquisa*/}

        <View style={styles.searchBox}>
          <Text style={styles.txtSearch}></Text>
          <ScrollView>
            <View style={styles.search}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onChangeText={setCodigo}
                value={codigo}
                placeholder="Pesquisa"
                //keyboardType="numeric"
              />
              {/*Botão de pesquisar*/}
              <View style={styles.icon}>
                <Text style={styles.btn}>
                  <FontAwesome name="search" size={30} color="#000" />
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/*<ListItem/>*/}

        <Animated.View
          style={{
            alignSelf: "center",
            marginTop: "5%",
            height: "81%",
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 1 }}
          onScroll={scrollHandler}
          scrollEventThrottle={10} // 1000 / 60 = 16. (1 segundo / 60 que é a quantidade de frames por segundo para ter uma animação de 60 frames)
        >
          {/*Lista de produtos*/}
          <View style={styles.listItems}>
            <FlatList
              data={list}
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
                        <FontAwesome5 name="trash" size={30} color="#fff" />
                      </RectButton>
                    </View>
                  )}
                >
                  <View style={styles.card}>
                    <View style={styles.details}>
                      <RectButton
                      style={styles.buttonInfo}
                        onPress={(e) => {
                          setModal(true);
                          setprodItem(item);
                        }}
                      >
                        {/*<TouchableOpacity onPress={(e) => {Edit(item)}}>*/}
                        <Text style={styles.textCod}>{item.produto}</Text>
                        <View style={styles.details}>
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
                  </View>
                </Swipeable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  //CSS Views
  search: {
    flexDirection: "row",
    width: "90%",
    height: "100%",
    marginLeft: "5%",
  },
  listItems: {
    alignSelf: "center",
    height: "85%",
    width: "90%",
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.Gray_Primary,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: "2%",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  details: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  delete: {
    width: "20%",
    height: "70%",
    backgroundColor: COLORS.Red,
    marginTop: "3%",
    borderRadius: 8,
  },
  icon: {
    backgroundColor: COLORS.Gray_Primary,
    justifyContent: "center",
    alignSelf: "center",
    width: "12%",
    height: "100%",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  //CSS Texts
  textCod: {
    fontSize: 15,
    fontWeight: "bold",
  },
  txtSearch: {
    fontSize: 20,
    marginLeft: "5%",
  },
  //CSS Buttons
  buttonDelete: {
    alignSelf: "center",
    marginTop: "25%",
  },
  btn: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "60%",
    width: "100%",
    height: "100%",
  },
  buttonInfo: {
    width: "100%",
    height: "100%",
  },
  //CSS Inputs
  input: {
    backgroundColor: COLORS.Gray_Primary,
    height: 60,
    width: "88%",
    paddingHorizontal: "5%",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
});
