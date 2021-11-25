import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { COLORS } from "../components/Colors";

const { height } = Dimensions.get("window");

export default function Modal({ show, close, produtos, date, hora }) {
  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState();
  const [modal, setModal] = useState(show);
  const [Produto, setProduto] = useState([]);
  const [list, setList] = useState(); //Lista a ser renderizada

  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 10 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 10 }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, { toValue: 0, duration: 0 }),
      Animated.timing(state.container, { toValue: height, duration: 10 }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  useFocusEffect(
    useCallback(() => {
      setCodigo(produtos.produto);
      setQtd(produtos.qtd);
    }, [produtos])
  );

  async function Add() {
    if (qtd <= 0 || codigo == "") {
      Alert.alert("Erro", "O produto não contem as informações necessárias", [
        {
          text: "OK",
        },
      ]);
    } else {
      //Verifica se tem alguma coisa na storage
      const storage = await AsyncStorage.getItem("@Produtos");
      const Produto = storage ? JSON.parse(storage) : [];

      const index = Produto.findIndex((element) => element.id == produtos.id);

      if (index >= 0) {
        Produto[index].qtd = parseInt(qtd);
        Produto[index].produto = codigo;
        Produto[index].dtalteracao = `${date} - ${hora}`;
        await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
      }
    }
  }

  async function Save() {
    //verificar se qtd > 0
    //verificar se codigo diferente de branco
    Alert.alert("Aviso", `Você alterou o produto salvar assim mesmo?`, [
      {
        text: "CANCELAR",
      },
      {
        text: "CONFIRMAR",
        onPress: async () => {
          Add();
        },
      },
    ]);
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.container_modal}>
          <KeyboardAvoidingView
            ebehavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.header}>
              <Text style={styles.textHeader}>Edição de Produto</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.textCod}>Código</Text>
              <Text style={styles.textQtd}>Quantidade</Text>
            </View>

            <View style={styles.input}>
              <TextInput
                style={styles.labelCod}
                autoCorrect={false}
                value={codigo}
                onChangeText={setCodigo}
                maxLength={13}
                textAlign="right"
              />

              <TextInput
                style={styles.labelQtd}
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={setQtd}
                value={qtd}
                maxLength={4}
                textAlign="right"
              />
            </View>

            <View style={styles.buttonSave}>
              <TouchableOpacity style={styles.save} onPress={Save}>
                <Text style={styles.textSave}>SALVAR</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonClose}>
              <TouchableOpacity style={styles.Close} onPress={close}>
                <AntDesign name="closecircleo" size={40} color='#f00' />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  //CSS Views
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Black_Secondary,
    position: "absolute",
  },
  container_modal: {
    flex: 1,
  },
  modal: {
    backgroundColor: COLORS.White,
    position: "absolute",
    height: "35%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0
  },
  info: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "2%",
    height: "auto",
    width: "90%",
  },
  input: {
    flexDirection: "row",
    marginLeft: "5%",
    width: "100%",
    height: 40,
  },
  buttonSave: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "90%",
    height: 50,
  },
  header: {
    backgroundColor: COLORS.Blue,
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonClose: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    height: 42,
    width: 42,
  },
  //CSS dos Textos
  textQtd: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "32%",
    marginLeft: "50%",
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
    color: COLORS.White,
    fontSize: 20,
  },
  textHeader: {
    fontFamily: "Rajdhani_600SemiBold",
    textAlign: "center",
    fontSize: 20,
    color: COLORS.White,
  },
  //CSS dos Inputs
  labelQtd: {
    backgroundColor: COLORS.Gray_Tertiary,
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "29%",
    marginLeft: "5%",
  },
  labelCod: {
    backgroundColor: COLORS.Gray_Tertiary,
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "56%",
  },
  //CSS do Botão SALVAR
  save: {
    backgroundColor: COLORS.Blue,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
