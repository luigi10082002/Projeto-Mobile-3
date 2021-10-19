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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";
import Modal from "../components/ModalItem";

export default function Historic() {
  //Constante de navegação
  //const navigation = useNavigation();

  //Constante do Modal
  const [modal, setModal] = useState(false);

  //Constante do array
  const [Produto, setProduto] = useState([]);

  //Constante do código do produto
  const [codigo, setCodigo] = useState();

  //Constante que armazena o código pesquisado
  const [search, setSearch] = useState("");

  //Cosntante de seleção de item do modal
  const [prodItem, setprodItem] = useState([]);

  const[vDate, setDate] =  useState('');

  const[vHora, setHora] =  useState('');

  const [list, setList] = useState([])//Lista a ser renderizada
  const [items, setItems] = useState('')//Receberá lista filtrada

  useEffect(() => {
  }, [vDate, vHora, list]);

  //Callback do AsyncStorage dos produtos
  useFocusEffect(
    useCallback(() => {
      loadSpots();
      setDataHora();
    }, [Produto ])
  );

  const setDataHora = () => {
    const date =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

    const  hora =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();

    setDate(date);
    setHora(hora);
  }

  //Lógica que compara o código pesquisado com os códigos que foram adicionados
  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setList(storage);
    setItems(storage);

   /* if (codigo) {
      setList(storage.filter((element) => element.produto == codigo));
    } else {
      setList(storage);
    }*/
  }

  //Lógica para remover o produto
  async function handleRemove(item) {
    const id = list.findIndex((element) => element.id == item.id);
    Alert.alert("Remover", `Deseja remover este produto?`, [
      {
        text: "Não",
        style: "Cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          list.splice(id, 1);
          await AsyncStorage.setItem("@Produtos", JSON.stringify(list));
        },
      },
    ]);
  }

  {
    /*
    function Edit(item) {
      navigation.navigate("Produto",
      {
      screen: "Produto",
      produto: item,
    });
    }
  */
  }

  //Separa os produtos que têm o código igual ao código pesquisado
  /*function Search(t) {
    console.log(t);
    search == t ? setSearch("") : setSearch(t);
  }*/

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
                onChangeText={(t)=>SearchFilterFunction(t)}
                value={codigo}
                placeholder="Pesquisa"
                //keyboardType="numeric"
              />
              {/*Botão de pesquisar*/}
              <TouchableOpacity style={styles.btn}
              
              >
                <FontAwesome name="search" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/*Lista de produtos*/}
        <View style={styles.listItems}>
          <FlatList
            data={list}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.details}>
                  <TouchableOpacity
                    onPress={(e) => {
                      setModal(true);
                      setprodItem(item);
                    }}
                  >
                    {/*<TouchableOpacity onPress={(e) => {Edit(item)}}>*/}
                    <Text style={styles.textCod}>{item.produto}</Text>
                    <View style={styles.details}>
                    {!item.dtalteracao ? 
                          <><Text>{item.date}</Text><Text> {item.hora}</Text></>
                          :
                          <Text>{item.dtalteracao}</Text>
                        }
                      <Text> - </Text>
                      <Text>{item.qtd} </Text>
                      <Text>unidade(s)</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.delete}>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={(e) => {
                      handleRemove(item);
                    }}
                  >
                    <FontAwesome5 name="trash" size={30} color="#f00" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
      {/*Modal para a edição de item*/}
      <Modal show={modal} produtos={prodItem} close={() => setModal(false)} date={vDate} hora={vHora}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: "2%",
    height: "75%",
    width: "100%",
  },
  card: {
    flex: 1,
    backgroundColor: "#DCDCDC",
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: "2%",
    marginBottom: "2%",
    height: "85%",
    width: "90%",
    padding: 20,
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
  //CSS Texts
  textCod: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 15,
    fontWeight: "bold",
  },
  txtSearch: {
    fontSize: 20,
    marginLeft: "5%",
  },
  //CSS Buttons
  buttonDelete: {
    marginLeft: "10%",
  },
  btn: {
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignSelf: "center",
    width: "12%",
    height: "100%",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  //CSS Inputs
  input: {
    backgroundColor: "#D3D3D3",
    height: 60,
    width: "88%",
    paddingHorizontal: "5%",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
});
