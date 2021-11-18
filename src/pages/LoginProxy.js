import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

export default function LoginProxy() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Url, setUrl] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function handleBarCodeScanned({ data }) {
    setUrl(data)
    setScanned(true);
    Alert.alert("Sincronizar", "Entre no sistema ERP e gere o código QR de sincronização de inventário.", [
      {
        text: "OK",
      },
    ]);

    Alert.alert("Sucesso!", "Os dados foram sincroizados.", [
      {
        text: "OK",
      },
    ]);
    Linking.openURL(data)
  };

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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  }
});
