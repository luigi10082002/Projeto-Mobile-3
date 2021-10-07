import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";
import Modal from '../components/Modal';

export default function Historic() {
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);

  const [Produto, setProduto] = useState([]);
  const [codigo, setCodigo] = useState();
  const [search, setSearch] = useState("");
  const [prodItem, setprodItem] = useState([]);
  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    if(search){
      setProduto(storage.filter((element) => element.produto == codigo));
    }else{
    setProduto(storage);
    }
  }

  async function handleRemove(item) {
    const id = Produto.findIndex((element) => element.id == item.id);
    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não",
        style: "Cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          Produto.splice(id, 1);
          await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
        },
      },
    ]);
  }

  //function Edit(item) {
    //navigation.navigate("Produto",
    //{
     //screen: "Produto",
     //produto: item,
   //});
  //}

  function Search() {
  
    search == codigo ? setSearch('') : setSearch(codigo);

  }

  return (
        <View style={styles.container}>
          <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <Header title="Histórico" />

          <View style={styles.searchBox}>
            <Text style={styles.txtSearch}></Text>
          <ScrollView>
          <View style={styles.search}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              onChangeText={setCodigo}
              value={codigo}
              placeholder="Pesquisa"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.btn} onPress={Search}>
              <FontAwesome name="search" size={30} color="#000" />
            </TouchableOpacity>
            </View>
            </ScrollView>
          </View>

          
          <View style={styles.listItems}>
            <FlatList
              data={Produto}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.details}>
                    <TouchableOpacity onPress={(e) => {setModal(true);setprodItem(item)}}>
                    {/*<TouchableOpacity onPress={(e) => {Edit(item)}}>*/}
                      <Text style={styles.textCod}>{item.produto}</Text>
                      <View style={styles.details}>
                        <Text>{item.data}</Text>
                        <Text> {item.hora}</Text>
                        <Text> - </Text>
                        <Text>{item.qtd} </Text>
                        <Text>unidade(s)</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.delete}>
                    <TouchableOpacity
                      style={styles.buttonDelete}
                      onPress={(e)=>{handleRemove(item)}}
                    >
                      <Entypo name="trash" size={30} color="#f00" />
                    </TouchableOpacity>
                  </View>
                </View>

                
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>

          </KeyboardAvoidingView>
          <Modal 
            show={modal}
            produtos={prodItem}
            close={() => setModal(false)}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
    listItems: {
    alignSelf: "center",
    marginTop: '2%',
    height: "75%",
    width: "100%",
    },
    card: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: '2%',
    marginBottom: '2%',
    height: "85%",
    width: "90%",
    padding: 20,
    },
    textCod: {
    fontSize: 15,
    fontWeight: "bold",
    },
    details: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
    },
    delete: {
    width: "13%",
    height: "auto",
    marginTop: "5%",
    },
    buttonDelete: {
    marginLeft: "10%",
    },
    search: {
      flexDirection: 'row',
      width: "90%",
      height: '100%',
      marginLeft: "5%",
    },
    input: {
      backgroundColor: "#D3D3D3",
      height: 60,
      width: "88%",
      paddingHorizontal: '3%',
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8
    },
    btn: {
      backgroundColor: "#D3D3D3",
      justifyContent: "center",
      alignSelf: "center",
      width: "12%",
      height: '100%',
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8
    },
    txtSearch: {
      fontSize: 20,
      marginLeft: '5%',
    },
});
