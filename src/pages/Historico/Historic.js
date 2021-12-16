import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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

import { Header } from "../../components/Header";
import Modal from "../../components/modal/ModalItem";
import { styles } from "./styles"

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
            height: "83%",
            width: "100%",
            marginTop: "7%"
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
                    <View style={styles.indicator}>
                    <FontAwesome5 name="angle-double-left" size={30} color="#f00"/>
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
