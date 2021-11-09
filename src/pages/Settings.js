import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import { Header } from "../components/Header";

export default function Settings() {
  const [modal, setModal] = useState(false);

  //Constantes do Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //Lógica de login com o servidor
  function setServer() {
    Alert.alert("Sincronizar", "Deseja sincronizar o inventário?", [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: async () => {
          setIsEnabled(false);
        },
      },
      {
        text: "Confirmar",
        onPress: async () => {},
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
        <Text style={styles.text}>Sincronizar inventário</Text>

        <Switch
          trackColor={{ false: "#767577", true: "#4B7DFE" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          onChange={setServer}
        />
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
    color: "#f00",
  },
  //CSS Line
  separador: {
    backgroundColor: "#000",
    width: "100%",
    height: 1,
  },
});
