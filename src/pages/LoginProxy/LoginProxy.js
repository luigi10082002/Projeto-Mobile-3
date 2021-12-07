import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert, AsyncStorage, Text, TouchableOpacity } from "react-native";
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
  const [Url, setUrl] = useState()

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

  function GoHome() {
    navigation.navigate("Home");
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

    Alert.alert("Sucesso!", `Os ${Produto.length} produtos foram sincroizados.`, [
      {
        text: "Cancelar",
        style: "Cancel",
        onPress: async () => {
          GoHome();
        }
      },
      {
        text: "Confirmar",
        onPress: async () => {
          await api.post(data, dados);
          GoHome();
        },
      },
    ]);
  }

  useEffect(() => {
    Alert.alert(
      "Sincronizar",
      `Entre no sistema Proxy ERP e gere o código QR de sincronização de inventário.`,
      [
        {
          text: "OK",
        },
      ]
    );
  }, []);
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
  },
  Itens: {
    width: "70%",
    height: "2%",
    marginTop: "25%",
    position: "absolute",
    alignSelf: "center",
  },
  //CSS Texts
  text: {
    color: COLORS.Red,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
});
