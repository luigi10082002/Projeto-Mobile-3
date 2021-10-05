import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();

  const [Produto, setProduto] = useState([]);

  function NewProduto() {
    navigation.navigate("Modules")
  }

  function Historic() {
    navigation.navigate("Historic")
  }

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

  return (
    <View style={styles.container}>
      <View style={styles.boxUser}>
        <Text style={styles.Text}>Olá</Text>
        <Text style={styles.TextBold}>Usuário</Text> 
      </View>

      <View style={styles.boxProdutos}>
        <Text style={styles.TextProdutos}>Total de produtos</Text>
        <Text style={styles.TextNumber}>{Produto.length}</Text>
      </View>

      <View style={styles.boxButton}>
        <TouchableOpacity style={styles.ButtonAdd} onPress={NewProduto}>
          <Entypo name="plus" size={30} color="#FFF"/>
          <Text style={styles.TextPlus}>NOVO PRODUTO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxButton}> 
        <TouchableOpacity style={styles.ButtonHistoric} onPress={Historic}>
          <AntDesign name="clockcircleo" size={20} color="#FFF"/>
          <Text  style={styles.TextPlus}>LISTAR PRODUTOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxUser: {
    width: '35%',
    height: '17%',
    marginLeft: '4%',
    marginTop: '30%',
  },
  boxProdutos: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    width: '85%',
    height: '12%',
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 8,
  },
  boxButton: {
    width: '85%',
    height: '12%',
    alignSelf: 'center',
    marginTop: '4%',
  },
  Text: {
    fontSize: 33,
  },
  TextBold: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  TextNumber: {
    alignSelf: 'center',
    marginLeft: '18%',
    fontWeight: 'bold',
    fontSize: 30
  },
  TextProdutos: {
    alignSelf: 'center',
    marginLeft: '8%',
    fontSize: 18
  },
  TextPlus: {
    color: '#fff',
    fontSize: 18,
    marginLeft: '2%'
  },
  ButtonAdd: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B7DFE',
    borderRadius: 9,
  },
  ButtonHistoric: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696969',
    borderRadius: 9,
  },
})

export default Home;
