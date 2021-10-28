import React, { useState, useEffect, useCallback } from "react";
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
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";
import Modal from "../components/ModalItem";
import { COLORS } from "../components/Colors";
import ListItem from "../components/ListItems";

export default function Historic() {
  //Constante de navegação
  //const navigation = useNavigation();

  //Constante do Modal
  const [modal, setModal] = useState(false);

  //Constante do array
  const [Produto, setProduto] = useState([]);

  //Constante do código do produto
  const [codigo, setCodigo] = useState('');

  //Constante que armazena o código pesquisado
  const [search, setSearch] = useState("");

  //Cosntante de seleção de item do modal
  const [prodItem, setprodItem] = useState([]);

  const[vDate, setDate] =  useState('');

  const[vHora, setHora] =  useState('');

  const [list, setList] = useState()//Lista a ser renderizada

  const [items, setItems] = useState('')//Receberá lista filtrada

  useEffect(() => {
  }, [vDate, vHora, list]);

  //Lógica que compara o código pesquisado com os códigos que foram adicionados
  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
    setList(Produto);
    //setItems(storage);

   /* if (codigo) {
      setList(storage.filter((element) => element.produto == codigo));
    } else {
      setList(storage);
    }*/
  }

  useEffect(() => {
    //console.log("mudou")
    if(codigo === "") {
      setList(list);
    } else {
      setList(
        Produto.filter(item => {item.produto.toLowerCase().indexOf(codigo.toLowerCase()) > -1})
      );
    }
  }, [codigo])



  //Separa os produtos que têm o código igual ao código pesquisado
 function Search(t) {
    console.log(t);
    search == t ? setSearch("") : setSearch(t);
 }
 
  function SearchFilterFunction(scodigo) {
   
    if(scodigo){
    const filterList = list.filter((item) => {
            
      //aplicando filtro com base no valor inserido no input
      const itemFilter = item.produto == scodigo ? item.produto.toUpperCase() : ''.toUpperCase;
      console.log(itemFilter);
      const newText = codigo.toUpperCase();
      return itemFilter.indexOf(newText) > -1;
   
    });

    setList(filterList)
    setCodigo(scodigo)
  }else{
    setList(items)
    setCodigo(scodigo)
  }
  }
{/**/}

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header title="Histórico" />

        {/*Input de pesquisa*/}
        <View style={styles.searchBox}>
          <Text style={styles.txtSearch}></Text>
          <ScrollView>
            <View style={styles.search}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onChangeText={(t) => {setCodigo(t)}}
                value={codigo}
                placeholder="Pesquisa"
                //keyboardType="numeric"
              />
              {/*Botão de pesquisar*/}
              <TouchableOpacity style={styles.btn}>
                <FontAwesome name="search" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

       <ListItem/>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  //CSS Views
  search: {
    flexDirection: "row",
    width: "90%",
    height: "100%",
    marginLeft: "5%",
  },
  listItems: {
    alignSelf: "center",
    height: '85%',
    width: "90%",
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.Gray_Primary,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: "2%",
    height: 80,
    width: 324,
    padding: 20,
  },
  details: {
    flexDirection: "row",
    height: "100%",
    width: "90%",
  },
  delete: {
    width: '20%',
    height: 60,
    marginRight: "5%",
    backgroundColor: COLORS.Red,
    marginTop: '3%',
    borderRadius: 8,
  },
  //CSS Texts
  textCod: {
    fontSize: 15,
    fontWeight: "bold",
  },
  txtSearch: {
    fontSize: 20,
    marginLeft: "5%",
  },
  //CSS Buttons
  buttonDelete: {
    alignSelf: "center",
    marginTop: "25%",
  },
  btn: {
    backgroundColor: COLORS.Gray_Primary,
    justifyContent: "center",
    alignSelf: "center",
    width: "12%",
    height: "100%",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  //CSS Inputs
  input: {
    backgroundColor: COLORS.Gray_Primary,
    height: 60,
    width: "88%",
    paddingHorizontal: "5%",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
});
