import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Infos from "../../components/Infos";
import { styles } from "./styles"

function Home() {
  //Constante de navegação
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);

  //Navegação para a tela de adicionar produto
  function NewProduto() {
    navigation.navigate("Modules");
  }

  //Navegação para a tela de histórico
  function Historic() {
    navigation.navigate("Historic");
  }

  function Carousel() {
    navigation.navigate("Index");
/*
    setModal(true);

    if(modal === true) {
      setModal(false);
    } else {
      setModal(true)
    }
    */
  }

  return (
    <View style={styles.container}>

    <Image style={{height: '23%', width: '90%', alignSelf: "center", marginTop: '10%'}} source={require('../../../assets/splash.png')} />

      <View style={styles.boxButton}>
        {/*Bootão para adicionar produto */}
        <TouchableOpacity style={styles.ButtonAdd} onPress={NewProduto}>
          <Entypo name="plus" size={35} color="#FFF" />
          <Text style={styles.TextADD}>ADICIONAR ITEM</Text>
        </TouchableOpacity>
      </View>

      <Infos/>

      <View style={styles.Button}>
        {/*Botão que leva ao histórico*/}
        <TouchableOpacity style={styles.ButtonHistoric} onPress={Historic}>
          <AntDesign name="clockcircleo" size={20} color="#FFF" />
          <Text style={styles.TextList}>ITENS LISTADOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Info}>
        <TouchableOpacity style={styles.ButtonInfos} onPress={Carousel}>
          <FontAwesome name="question-circle" size={25} color="#FFF" />
          <Text style={styles.TextInfos}>Informações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;
