import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS } from "../components/Colors";
import Modal from "../components/ModalItem";

export default function ListItems({ show }) {
  const [modal, setModal] = useState(show);

  //Constante do array
  const [Produto, setProduto] = useState([]);

  //Constante do código do produto
  const [codigo, setCodigo] = useState("");

  //Cosntante de seleção de item do modal
  const [prodItem, setprodItem] = useState([]);

  const [vDate, setDate] = useState("");

  const [vHora, setHora] = useState("");

  const [list, setList] = useState(); //Lista a ser renderizada

  useEffect(() => {}, [vDate, vHora, list, codigo]);

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

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
    setList(Produto);
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
    <>
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
      <Modal
        show={modal}
        produtos={prodItem}
        close={() => setModal(false)}
        date={vDate}
        hora={vHora}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  listItems: {
    alignSelf: "center",
    height: "73%",
    width: "90%",
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.Gray_Primary,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: "2%",
    height: 80,
    width: 324,
    padding: 20,
  },
  details: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
  },
  delete: {
    width: "20%",
    height: 60,
    marginRight: "5%",
    backgroundColor: COLORS.Red,
    marginTop: "3%",
    borderRadius: 8,
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
    backgroundColor: COLORS.Gray_Primary,
    justifyContent: "center",
    alignSelf: "center",
    width: "12%",
    height: "100%",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
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
