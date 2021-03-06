import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Infos from "../../components/Infos";
import dataHome from "../../lib/DataHome";
import { styles } from "./styles"

function Home() {
  //Constante de navegação
  const navigation = useNavigation();

  //Navegação para a tela de adicionar produto
  function NewProduto() {
    navigation.navigate("Modules", { 
      screen: "Modules",
      id: '2',
    });
  }

  //Navegação para a tela de histórico
  function Historic() {
    navigation.navigate("Historic", {
      screen: "Historic",
      id: '3',
    });
  }

  function Carousel() {
    navigation.navigate("LoginEmail")
  }

  function Login() {
    navigation.navigate("LoginProxy")
  }

  return (
    <View style={styles.container}>

    <Image style={{height: '8%', width: '60%', alignSelf: "center", marginTop: '18%'}} source={require('../../../assets/logotipo-proxy.png')} />

    <Text style={styles.TextTitle}>Inventário de Estoque</Text>

    <View style={styles.separador}/>

      <View style={styles.boxButton}>
        {/*Bootão para adicionar produto */}
        <Text style={styles.Legenda}>Inicie ou continue o inventário em andamento</Text>
        <TouchableOpacity style={styles.ButtonAdd} onPress={NewProduto}>
          <Entypo name="plus" size={35} color="#FFF" />
          <Text style={styles.TextADD}>ADICIONAR ITEM</Text>
        </TouchableOpacity>
      </View>

      <Infos/>

      <View style={styles.Button}>
        {/*Botão que leva ao histórico*/}
        <Text style={styles.LegendaHistorico}>Pesquise e edite produtos já contados</Text>
        <TouchableOpacity style={styles.ButtonHistoric} onPress={Historic}>
          <AntDesign name="clockcircleo" size={20} color="#FFF" />
          <Text style={styles.TextList}>ITENS CONTADOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separadorDown}/>

      <View style={styles.LegendaSincBtn}>
      <Text style={styles.textLegendaERP}>Sincronizar Inventário</Text>
      <Text style={styles.textLegendaEMAIL}>Exportar Inventário</Text>
      </View>

      <View style={styles.Info}>
        <TouchableOpacity style={styles.ButtonLogin} onPress={Login}>
        <View style={styles.IconLogin}>
          <FontAwesome name="refresh" size={20} color="#FFF" />
          </View>
          <Text style={styles.TextInfos}>Sistema Proxy ERP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ButtonInfos} onPress={Carousel}>
          <View style={styles.IconQuestion}>
            <FontAwesome name="download" size={20} color="#FFF"/>
          </View>
          <Text style={styles.TextInfos}>Formato Excel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;
