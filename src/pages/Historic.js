import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TextInput,
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

export default function Historic() {
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
      LoadProduto();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  //Lógica que compara o código pesquisado com os códigos que foram adicionados
  function LoadProduto() {
    if (codigo === "") {
      setList(Produto);
    } else {
      const itemPesquisado = list.filter(
        (item) => item.produto.toLowerCase().indexOf(codigo.toLowerCase()) > -1
      );

      setList(itemPesquisado);
    }
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

        <Animated.View
          style={{
            alignSelf: "center",
            height: "82%",
            width: "100%",
            marginTop: "5%"
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
                    <RectButton
                      style={styles.details}
                      onPress={(e) => {
                        setModal(true);
                        setprodItem(item);
                      }}
                    >
                      <Text style={styles.textCod}>{item.produto}</Text>
                      <View style={styles.infos}>
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
                    <View style={styles.indicator}/>
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
    height: "80%",
    width: "90%",
  },
  delete: {
    width: "18%",
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
  card: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: "2%",
    height: 75,
    width: "100%",
  },
  infos: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  indicator: {
    width: '1%',
    height: '100%',
    position: "absolute",
    backgroundColor: COLORS.Red,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "center",
    marginLeft: '98%',
  },
  //CSS Texts
  textCod: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: "5%",
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
  details: {
    backgroundColor: COLORS.Gray_Primary,
    borderRadius: 8,
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
