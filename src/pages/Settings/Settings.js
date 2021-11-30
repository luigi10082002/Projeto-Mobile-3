import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { COLORS } from "../../components/Colors";
import { styles } from "./styles"

export default function Settings() {
  //Constante de navegação
  const navigation = useNavigation();

  function CadastroEmail() {
    navigation.navigate("LoginEmail");
  }

  function CadastroProxyERP() {
    navigation.navigate("LoginProxy");
  }

  //Lógica de login com o servidor
  function setServer() {
    Alert.alert("Sincronizar", "Deseja sincronizar o inventário?", [
      {
        text: "CANCELAR",
        style: "cancel",
        onPress: async () => {},
      },
      {
        text: "PROXY ERP",
        onPress: async () => {
          CadastroProxyERP();
        },
      },
      {
        text: "E-MAIL",
        onPress: async () => {
          CadastroEmail();
        },
      }
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

      <View style={styles.boxServer}>
        <TouchableOpacity style={styles.DeleteButton} onPress={setServer}>
          <Text style={styles.textSincronizar}>SINCRIONIZAR INVENTÁRIO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />

      <View style={styles.boxDelete}>
        <TouchableOpacity style={styles.DeleteButton} onPress={setDelete}>
          <Text style={styles.textDelete}>EXCLUIR TODOS OS ITENS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separador}/>
    </View>
  );
}
