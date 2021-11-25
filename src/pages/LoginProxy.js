import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert, AsyncStorage } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import api from "../service/api";

export default function LoginProxy() {
  //client/ProxyERP

  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Url, setUrl] = useState();
  const [Produto, setProduto] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

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

    Alert.alert("Sucesso!", "Os dados foram sincroizados.", [
      {
        text: "OK",
        onPress: async () => {
          GoHome();
        },
      },
    ]);

    await api.post(Url, Produto);
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
    </View>
  );
}

const styles = StyleSheet.create({
  //CSS Views
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
