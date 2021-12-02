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
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { COLORS } from "../../components/Colors";
import { styles } from "./styles"
import api from "../../service/api";

export default function LoginEmail() {
  //client/Email

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [Client, setClient] = useState([]);
  const [Produto, setProduto] = useState([]);
  const [Url, setUrl] = useState(
    "https://sistema.homologa.proxy.com.br/batch/testes/post.php"
  );

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  function ValidarEmail() {
    const user = email.split("@")[0];
    const domimnio = email.split("@")[1];
    const complemento = email.split(".");
    const complement = complemento.last()
    
    console.log(complemento)
  }

  function validateEmail() {
    const test = "."

    console.log(test.length)
  }

  async function Dados() {
    const login = {
      key: "email",
      name: name,
      email: email,
      telefone: telefone,
      empresa: empresa
    };

    if (name === "") {
      Alert.alert("Preencha todos os campos", `Por favor preencha seu nome`, [
        {
          text: "OK",
        },
      ]);
    } else if (email === "") {
      Alert.alert("Preencha todos os campos", `Por favor preencha seu email`, [
        {
          text: "OK",
        },
      ]);
    } else if (email !== "") {
      ValidarEmail()
    }
    else if (telefone === "") {
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
      Alert.alert("Sucesso", `Os dados foram enviados para o email ${email}`, [
        {
          text: "OK",
        },
      ]);
    }
    setClient(login)
    
    const dados = {
      "cliente": Client, 
      "produtos": Produto
    }

    //await api.post(Url, dados);
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
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
              <Text style={styles.textTelefone}>Telefone</Text>
              <View style={styles.input}>
                <TextInput
                  styles={styles.inputTelefone}
                  onChangeText={setTelefone}
                  value={telefone}
                  keyboardType="phone-pad"
                  maxLength={9}
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

            <View style={styles.button}>
              <TouchableOpacity style={styles.buttonSave} onPress={Dados}>
                <Text style={styles.textSave}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
    </View>
  );
}

