import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Alert,
  AsyncStorage,
  Text,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BarcodeMask from 'react-native-barcode-mask';

import api from "../../service/api";
import { styles } from "./styles";
import { HeaderSemGuia } from "../../components/Header";

export default function LoginProxy() {
  //client/ProxyERP

  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Produto, setProduto] = useState([]);
  const [Url, setUrl] = useState();
  const [id, setId] = useState("");

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
      id: id,
      //produtos: Produto,
    };

    await api.post(data, dados);

    Alert.alert(
      "Sucesso!",
      `Os ${Produto.length} produtos foram sincronizados.`,
      [
        {
          text: "Cancelar",
          style: "Cancel",
          onPress: async () => {
            GoHome();
          },
        },
        {
          text: "Confirmar",
          onPress: async () => {
            GoHome();
          },
        },
      ]
    );
  }

  {/*useEffect(() => {
    Alert.alert(
      "Sincronizar",
      `Entre no sistema Proxy ERP e gere o código QR de sincronização de inventário.`,
      [
        {
          text: "OK",
        },
      ]
    );
  }, []);*/}

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderSemGuia title="SINCRONIZAÇÃO PROXY ERP" id={3} />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: '100%', width: '100%' }}
      >
        <View style={{position: 'absolute', backgroundColor: '#fff', height: 88}}>
        <Text style={styles.txt}>Entre no sistema Proxy ERP e gere o código QR de sincronização de inventário.</Text>
        </View>

        <BarcodeMask edgeColor="#1151CC" showAnimatedLine/>

      </BarCodeScanner>
    </View>
  );
}
