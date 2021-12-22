import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import { Header } from "../../components/Header";
import { styles } from "./styles";
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

  useEffect(() => {
    const numero = telefone.replace(/\D/g, "");
    // (11)1111-1111
    const DDD = numero.replace(/^(\d{2})(\d)/g, "($1)$2");
    const final = DDD.replace(/(\d)(\d{4})$/, "$1-$2");
    setTelefone(final);
  }, [telefone]);

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }
  
  async function Dados() {
    const login = {
      key: "email",
      name: name,
      email: email,
      telefone: telefone,
      empresa: empresa,
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
      Alert.alert("Sucesso", `Os dados foram enviados para o email ${email}`, [
        {
          text: "OK",
        },
      ]);
    }
    setClient(login);

    const dados = {
      cliente: Client,
      produtos: Produto,
    };

    await api.post(Url, dados);
  }

  function Carousel() {
    navigation.navigate("Index", {
      screen: "Index",
      id: 1,
      data: dataHome
    });
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header title="Login" />

        <ScrollView>

          <View style={styles.form}>
            <View style={styles.name}>
              <Text style={styles.textName}>Nome</Text>
              <View style={styles.input}>
                <TextInput
                  styles={styles.inputName}
                  onChangeText={setName}
                  value={name}
                  placeholder="Nome"
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
                  placeholder="Email"
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
                  maxLength={14}
                  placeholder="DDD+Número"
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
                  placeholder="Empresa"
                />
              </View>
            </View>

            <View style={styles.button}>
              <TouchableOpacity style={styles.buttonSave} onPress={Dados}>
                <Text style={styles.textSave}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
