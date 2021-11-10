import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Modal,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "../components/Header";
import { COLORS } from "../components/Colors";

export default function Settings() {
  //Constante de navegação
  const navigation = useNavigation();

  function CadastroEmail() {
    navigation.navigate("LoginEmail")
  }

  function CadastroProxy() {
    navigation.navigate("LoginProxy")
  }

  //Lógica de login com o servidor
  function setServer() {
   
      Alert.alert("Sincronizar", "Deseja sincronizar o inventário?", [
        {
          text: "CANCELAR",
          style: "cancel",
          onPress: async () => {
          },
        },
        {
          text: "E-MAIL",
          onPress: async () => {
            CadastroEmail();
          },
        },
        {
          text: "PROXY",
          onPress: async () => {
            CadastroProxy();
          },
        },
      ]);
    
  }

  //Lógica de deletar o inventário todo
  function setDelete() {
    Alert.alert("Remover Itens", "Deseja remover todos os itens?", [
      {
        text: "Cancelar",
        style: "Cancel",
      },
      {
        text: "Confirmar",
        onPress: async () => {
          AsyncStorage.clear();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header title="Configurações" />

      <View style={styles.boxDelete}>
        <TouchableOpacity style={styles.DeleteButton} onPress={setServer}>
          <Text style={styles.textSincronizar}>SINCRIONIZAR INVENTÁRIO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />

      <View style={styles.boxDelete}>
        <TouchableOpacity style={styles.DeleteButton} onPress={setDelete}>
          <Text style={styles.textDelete}>EXCLUIR TODOS OS PRODUTOS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separador} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS Views
  boxServer: {
    width: "100%",
    height: "13%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  boxDelete: {
    width: "100%",
    height: "13%",
  },
  //CSS Buttons
  DeleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  //CSS Texts
  text: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
    marginLeft: "5%",
    alignSelf: "center",
  },
  textDelete: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
    color: COLORS.Red,
  },
  textSincronizar: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
    color: COLORS.Black,
  },
  //CSS Line
  separador: {
    backgroundColor: COLORS.Black,
    width: "100%",
    height: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
