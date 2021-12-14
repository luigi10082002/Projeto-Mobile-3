import React from "react";
import {
  View,
  Text,
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
  function setServerEMAIL() {
    Alert.alert("Sincronizar", "Deseja enviar o inventário por email?", [
      {
        text: "CANCELAR",
        style: "cancel",
        onPress: async () => {},
      },
      {
        text: "CONFIRMAR",
        style: "confirmar",
        onPress: async () => {
          CadastroEmail();
        },
      }
    ]);
  }

  function setServerERP() {
    Alert.alert("Sincronizar", "Deseja sincronizar o inventário Proxy ERP?", [
      {
        text: "CANCELAR",
        style: "cancel",
        onPress: async () => {},
      },
      {
        text: "CONFIRMAR",
        style: "confirmar",
        onPress: async () => {
          CadastroProxyERP();
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

      <View style={styles.boxServer}>
        <TouchableOpacity style={styles.DeleteButton} onPress={setServerERP}>
          <Text style={styles.textSincronizar}>SINCRONIZAR INVENTÁRIO PROXY ERP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />

      <View style={styles.boxServer}>
        <TouchableOpacity style={styles.DeleteButton} onPress={setServerEMAIL}>
          <Text style={styles.textSincronizar}>SINCRONIZAR INVENTÁRIO EMAIL</Text>
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
