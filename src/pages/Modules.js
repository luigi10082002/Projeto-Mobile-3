import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, AsyncStorage, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import uuid from "react-native-uuid";

import { Header } from '../components/Header';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function Confirm() {
    const newProd = {
      id: uuid.v4(),
      //id de identificação do produto
      produto: codigo,
      //código do produto
      qtd: qtd,
      //quantidade do produto
      date: data,
      hora: hora
    };

    //Verifica se tem alguma coisa na storage
    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    const index = Produto.findIndex((element) => element.produto == codigo);

    if (index >= 0) {
      Produto[index].qtd = parseInt(Produto[index].qtd) + parseInt(qtd);
      await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Produtos",
        JSON.stringify([...Produto, newProd])
      );
    }

    const delet = await AsyncStorage.getItem("@Historic");
    const Historic = delet ? JSON.parse(delet) : [];

    const list = Historic.findIndex((element) => element.produto == codigo);

    if (list >= 0) {
      Historic[list].qtd = parseInt(Historic[list].qtd) + parseInt(qtd);
      await AsyncStorage.setItem("@Historic", JSON.stringify(Produto));
    } else {
      await AsyncStorage.setItem(
        "@Historic",
        JSON.stringify([...Produto, newProd])
      );
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <Header title="Histórico"/>
      <ScrollView>
      <View style={styles.scanner}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}}
        />
        
        <View style={styles.btn}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CAPTURAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.textQtd}>Quantidade</Text>
        <Text style={styles.textCod}>Código</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.inputQtd}
          autoCorrect={false}
          onChangeText={setQtd}
        ></TextInput>

        <TextInput
          style={styles.inputCod}
          autoCorrect={false}
          onChangeText={setCodigo}
          value={String(codigo)}
        ></TextInput>
      </View>

      <View style={styles.btnSave}>
        <TouchableOpacity style={styles.save}>
          <Text style={styles.saveText}>SALVAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.legenda}>
        <Text style={styles.text}>ÚLTIMOS ITENS</Text>
      </View>

      <View style={styles.itens}>
      
    
  </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scanner: {

    alignItems: 'center',
    height: '25%',
    width: '90%',
    overflow: 'hidden',
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: '5%',
  },
  button: {
    
    backgroundColor: '#4B7DFE',
    width: '45%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btn: {
    width: '100%',
    height: '100%',
    marginTop: '21%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  info: {

    flexDirection: 'row',
    width: '90%',
    height: '4%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  textQtd: {

    fontSize: 25,
  },
  textCod: {

    fontSize: 25,
    marginLeft: '6%',
  },
  input: {

    width: '90%',
    height: '5%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  inputQtd: {

    backgroundColor: '#C0C0C0',
    width: '40%',
    height: '100%',
    paddingHorizontal: '3%',
    borderRadius: 8
  },
  inputCod: {

    backgroundColor: '#C0C0C0',
    marginLeft: '6%',
    width: '53%',
    height: '100%',
    borderRadius: 8,
    paddingHorizontal: '3%'
  },
  btnSave: {

    backgroundColor: '#4B7DFE',
    marginTop: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '90%',
    height: '6%',
  },
  saveText: {

    color: '#fff',
    alignSelf: 'center',
    marginTop: '4%',
    fontWeight: 'bold',
  },
  legenda: {

    marginTop: '5%',
    width: '41%',
    height: '4%',
    marginLeft: '5%'
  },
  text: {
    fontSize: 20,
  },
  itens: {
    backgroundColor: '#4B7DFE',

    width: '90%',
    alignSelf: 'center',
  },
});
