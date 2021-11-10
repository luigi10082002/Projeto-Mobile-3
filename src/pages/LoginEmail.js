import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Vibration,
  ScrollView
} from "react-native";
import uuid from "react-native-uuid";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../components/Header";
import { COLORS } from "../components/Colors";

export default function LoginEmail() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [empresa, setEmpresa] = useState();
  const [Client, setClient] = useState([]);

  async function Login() {
    const newClient = {
      id: uuid.v4(),
      name: name,
      email: email,
      telefone: telefone,
      empresa: empresa,
    };

    /*
    if(name === "" || telefone === "" || empresa === "") {
      Alert.alert("Erro", "Preencha todos os dados", [
        {
          text: "OK",
        },
      ]);
    } else {
      */
      const storage = await AsyncStorage.getItem("@Client");
      const Client = storage ? JSON.parse(storage) : [];

      /*
      const index = Client.findIndex((element) => element.email == email);
      
      if(index !== -1) {
        Alert.alert("Erro", "Usuário ja registrado", [
          {
            text: "OK",
          },
        ]);
      }
      */

      Alert.alert("Sucesso!", `Os dados forma enviados para o email ${email}`, [
        {
          text: "OK",
        },
      ]);
    
    console.log(Client)
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : null}
      >
        <Header title="Login"/>

      <View style={styles.form}>
        <View style={styles.name}>
          <Text style={styles.textName}>Nome</Text>
          <View style={styles.input}>
          <TextInput
            styles={styles.inputName}
          />
          </View>
        </View>
        
        <View style={styles.email}>
          <Text style={styles.textEmail}>E-mail</Text>
          <View style={styles.input}>
          <TextInput
            styles={styles.inputEmail}
            onChangeText={}
            value={}
            keyboardType='email-address'
          />
          </View>
        </View>

        <View style={styles.telefone}>
          <Text style={styles.textEmail}>Telefone</Text>
          <View style={styles.input}>
          <TextInput
            styles={styles.inputTelefone}
            onChangeText={}
            value={}
            keyboardType="phone-pad"
          />
          </View>
        </View>

        <View style={styles.empresa}>
          <Text style={styles.textEmpresa}>Empresa</Text>
          <View style={styles.input}>
          <TextInput
            styles={styles.inputEmpresa}
          />
          </View>
        </View>
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
    height: 420
  },
  name: {
    alignSelf: 'center',
    width: "90%",
    height: '13%',
    marginTop: "15%"
  },
  email: {
    alignSelf: 'center',
    width: "90%",
    height: '13%',
    marginTop: '13%'
  },
  telefone: {
    alignSelf: 'center',
    width: "90%",
    height: '13%',
    marginTop: '13%'
  },
  empresa: {
    alignSelf: 'center',
    width: "90%",
    height: '13%',
    marginTop: '13%'
  },
  button: {
    backgroundColor: COLORS.Blue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: "center",
    width: "90%",
    height: '10%',
    marginTop: "15%",
    borderRadius: 8,
  },
  textName: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20
  },
  textEmail: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20
  },
  textTelefone: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20
  },
  textEmpresa: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20
  },
  textSave: {
    color: COLORS.White,
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20
  },
  input: {
    backgroundColor: COLORS.Gray_Primary,
    width: "100%",
    height: 50,
    borderRadius: 8,
    padding: 10
  },
  inputName: {
    width: "100%",
    height: '100%'
  },
  inputEmail: {
    width: "100%",
    height: '100%'
  },
  inputTelefone: {
    width: "100%",
    height: '100%'
  },
  inputEmpresa: {
    width: "100%",
    height: '100%'
  },
  buttonSave: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: '100%'
  },
});
