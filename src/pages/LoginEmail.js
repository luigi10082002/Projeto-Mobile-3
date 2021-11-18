import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  CheckBox,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../components/Header";
import { COLORS } from "../components/Colors";

export default function LoginEmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [Client, setClient] = useState([]);
  const [isSelected, setSelection] = useState(false);

  async function Dados() {
    setClient ({
      name: name,
      email: email,
      telefone: telefone,
      empresa: empresa,
    });

    if (name === "") {
      Alert.alert(
        "Preencha todos os campos", 
        `Por favor preencha seu nome`, 
      [
        {
          text: "OK",
        },
      ]);
    } else if (email === "") {
      Alert.alert(
        "Preencha todos os campos", 
        `Por favor preencha seu email`, 
        [
        {
          text: "OK",
        },
      ]);
    } else if (telefone === "") {
      Alert.alert(
        "Preencha todos os campos",
        `Por favor preencha seu telefone`,
        [
          {
            text: "OK",
          },
        ]
      );
    } else if (empresa === "") {
      Alert.alert(
        "Preencha todos os campos",
        `Por favor preencha sua empresa`,
        [
          {
            text: "OK",
          },
        ]
      );
    } else {
      Alert.alert(
        "Sucesso", 
        `Os dados foram enviados para o email ${email}`, 
        [
        {
          text: "OK",
        },
      ]);
      await AsyncStorage.setItem("@Login", Client);
    }
  }

  async function Login() {
    console.log(Client)
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : null}
      >
        <Header title="Login" />

        <View style={styles.form}>
          <View style={styles.name}>
            <Text style={styles.textName}>Nome</Text>
            <View style={styles.input}>
              <TextInput
                styles={styles.inputName}
                onChangeText={setName}
                value={name}
              />
            </View>
          </View>

          <View style={styles.email}>
            <Text style={styles.textEmail}>E-mail</Text>
            <View style={styles.input}>
              <TextInput
                styles={styles.inputEmail}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.telefone}>
            <Text style={styles.textEmail}>Telefone</Text>
            <View style={styles.input}>
              <TextInput
                styles={styles.inputTelefone}
                onChangeText={setTelefone}
                value={telefone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.empresa}>
            <Text style={styles.textEmpresa}>Empresa</Text>
            <View style={styles.input}>
              <TextInput
                styles={styles.inputEmpresa}
                onChangeText={setEmpresa}
                value={empresa}
              />
            </View>
          </View>
        </View>

        <View style={styles.Check}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
            onPress={() => Remeber()}
          />
          <Text>Manter informações</Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonSave} onPress={Dados}>
            <Text style={styles.textSave}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonSave} onPress={Login}>
            <Text style={styles.textSave}>Enviar</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    width: "100%",
    height: 420,
  },
  name: {
    alignSelf: "center",
    width: "90%",
    height: "13%",
    marginTop: "10%",
  },
  email: {
    alignSelf: "center",
    width: "90%",
    height: "13%",
    marginTop: "13%",
  },
  telefone: {
    alignSelf: "center",
    width: "90%",
    height: "13%",
    marginTop: "13%",
  },
  empresa: {
    alignSelf: "center",
    width: "90%",
    height: "13%",
    marginTop: "13%",
  },
  button: {
    backgroundColor: COLORS.Blue,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "10%",
    marginTop: "5%",
    borderRadius: 8,
  },
  textName: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textEmail: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textTelefone: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textEmpresa: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textSave: {
    color: COLORS.White,
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  input: {
    backgroundColor: COLORS.Gray_Primary,
    width: "100%",
    height: 50,
    borderRadius: 8,
    padding: 10,
  },
  inputName: {
    width: "100%",
    height: "100%",
  },
  inputEmail: {
    width: "100%",
    height: "100%",
  },
  inputTelefone: {
    width: "100%",
    height: "100%",
  },
  inputEmpresa: {
    width: "100%",
    height: "100%",
  },
  buttonSave: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  Check: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "45%",
    height: "auto",
    marginTop: "4%",
  },
});
