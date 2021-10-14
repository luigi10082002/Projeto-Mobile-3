import React, { useState, useEffect, useCallback } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  TextInput,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { useRoute, useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get('window')

export default function Modal({ show, close, produtos }) {  
  const [qtd, setQtd] = useState(1);
  const [codigo, setCodigo] = useState();
  const [modal, setModal] = useState(show);

  const date =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  const hora =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();

  const [Produto, setProduto] = useState([]);

  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 10 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 10 }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 200, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 0 }),
      Animated.timing(state.container, { toValue: height, duration: 10 })
    ]).start()
  }

  useEffect(() => {
    if(show){
      openModal()
    }else{
      closeModal()
    }
  }, [show])

  ///

  useFocusEffect(
    useCallback(() => {
      setCodigo(produtos.produto);
      setQtd(produtos.qtd);
    }, [produtos])
  );

  

  async function Save() {
    
    ///verificar se qtd > 0

    // verificar se codigo diferente branco 

    if (qtd <= 0  || codigo == "") {
      Alert.alert("Erro", "O produto não contem as informações necessárias", [
        {
          text: "OK",
        }
      ]);
    } else {

    //Verifica se tem alguma coisa na storage
    const storage = await AsyncStorage.getItem("@Produtos");
    const Produto = storage ? JSON.parse(storage) : [];

    const index = Produto.findIndex((element) => element.id == produtos.id);

    if (index >= 0) {
      Produto[index].qtd =  parseInt(qtd);
      Produto[index].produto =  codigo;
      Produto[index].dtalteracao =  `${date} - ${hora}`;
      await AsyncStorage.setItem("@Produtos", JSON.stringify(Produto));
    } 
 
    Alert.alert("Produto Salvo", `Seu produto foi salvo`, [
      {
        text: "Ok",
      },
    ]);
  }
}

  return( 
    <Animated.View 
      style={[styles.container, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
        
      <Animated.View 
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
       
        <View style={styles.container_modal}>
        <KeyboardAvoidingView
        ebehavior={Platform.OS === "ios" ? "padding" : null}
      >

          <View style={styles.header}>
            <Text style={styles.textHeader}>Edição de Produto</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.textQtd}>Quantidade</Text>
            <Text style={styles.textCod}>Código</Text>
          </View>

          <View style={styles.input}>
            <TextInput
              style={styles.labelQtd}
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={setQtd}
              value = {qtd}
            />

            <TextInput
              style={styles.labelCod}
              autoCorrect={false}
              keyboardType="numeric"
              value = {codigo}
              onChangeText={setCodigo}
            />
          </View>

          <View style={styles.buttonSave}>
            <TouchableOpacity style={styles.save} onPress={Save}>
              <Text style={styles.textSave}>SALVAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonClose}>
            <TouchableOpacity style={styles.Close} onPress={close}>
              <AntDesign name="closecircleo" size={40} color="#f00" />
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  },
  container_modal:{
    flex: 1,
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '35%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  //CSS das Views
  info: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "2%",
    height: "auto",
    width: "90%",
  },
  input: {
    flexDirection: "row",
    marginLeft: "5%",
    width: "100%",
    height: 40,
  },
  buttonSave: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "90%",
    height: 50,
  },
  header: {
    backgroundColor: "#4B7DFE",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  //CSS dos Textos
  textQtd: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "32%",
    fontSize: 20,
  },
  textCod: {
    fontFamily: "Rajdhani_600SemiBold",
    marginLeft: "5%",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textSave: {
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFF",
    fontSize: 20,
  },
  textList: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textHeader: {
    fontFamily: "Rajdhani_600SemiBold",
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
  //CSS dos Inputs
  labelQtd: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "29%",
  },
  labelCod: {
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    paddingHorizontal: "3%",
    height: "100%",
    width: "56%",
    marginLeft: "5%",
  },
  //CSS do Botão SALVAR
  save: {
    backgroundColor: "#4B7DFE",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonClose: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    height: 42,
    width: 42,
  },
})

