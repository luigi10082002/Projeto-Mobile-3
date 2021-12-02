import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert, AsyncStorage, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import api from "../../service/api";
import { COLORS } from "../../components/Colors";

export default function LoginProxy() {
  //client/ProxyERP

  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Produto, setProduto] = useState([]);
  const [items, setItems] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  useEffect(() => {
    async function QuantidadeTotal() {
      if (Produto.length !== 0) {
        const Total = Produto.reduce(function (itens, element) {
          return itens + parseInt(element.qtd);
        }, 0);

        parseInt(Total);
        setItems(Total);
        parseInt(items);
      } else {
        setItems(0);
      }
    }

    QuantidadeTotal();
  }, [Produto || Produto.length]);

  useEffect(() => {
    Alert.alert(
      "Sincronizar",
      "Entre no sistema Proxy ERP e gere o código QR de sincronização de inventário.",
      [
        {
          text: "OK",
        },
      ]
    );
  }, []);

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function handleBarCodeScanned({ data }) {
    setUrl(data);
    setScanned(true);

    const dados = {
      produtos: Produto,
    };
    Alert.alert("Sucesso!", "Os dados foram sincroizados.", [
      {
        text: "OK",
        onPress: async () => {
          await api.post(data, dados);
          GoHome();
        },
      },
    ]);
  }

  function GoHome() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.infos}>
      <Text style={styles.text}>Itens que serão sincronizados</Text>

        <View style={styles.boxProdutos}>
          <Text style={styles.TextProd}>Total de Produtos</Text>
          <Text style={styles.TextNumber}>{Produto.length}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //CSS Views
  container: {
    flex: 1,
  },
  infos: {
    alignSelf: "center",
    height: "20%",
    width: "90%",
    marginTop: "155%",
  },
  boxProdutos: {
    backgroundColor: COLORS.Gray_Primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: "3%",
    width: "45%",
    height: "75%",
    marginTop: "2%",
    borderRadius: 8,
  },
  boxTotal: {
    backgroundColor: COLORS.Gray_Primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: "4%",
    width: "45%",
    height: "75%",
    borderRadius: 8,
  },
  //CSS Texts
  TextNumber: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextProdutos: {
    alignSelf: "center",
    marginTop: "5%",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextProd: {
    alignSelf: "center",
    marginTop: "6%",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextItens: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
  text: {
    color: COLORS.White,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
});
