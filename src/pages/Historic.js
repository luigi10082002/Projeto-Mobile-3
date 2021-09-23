import React from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import { Header } from "../components/Header";

export default function Historic() {
  return(
    <SafeAreaView style={styles.container}>
      <Header title="Histórico"/>
      <View style={styles.box}>
        <Text style={styles.text}>Pesquisa</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
        />
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="search" size={25} color="#000"/>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.codigo}>
          <Text style={styles.info}>Codigo</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.info}>Data</Text>
          <Text style={styles.info}> Hora</Text>
          <Text style={styles.info}> - </Text>
          <Text style={styles.info}>2 unidade(s)</Text>
            <TouchableOpacity style={styles.trash}>
              <FontAwesome name="trash" size={30} color="#f00"/>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: '5%',
    marginLeft: '5%',
    width: '50%',
    height: '1%',
  },
  text: {
    fontSize: 25,
  },
  input: {
    marginTop: '8%',
    width: '90%',
    height:'5%',
    marginLeft: '5%',
    flexDirection: 'row',
    alignSelf: "stretch",
  },
  inputText: {
    backgroundColor: '#C0C0C0',
    width: '90%',
    height: '100%',
    paddingHorizontal: '5%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  icon: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  card : {
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: '5%',
    width: '80%',
    height: '10%',
    padding: '3%',
    borderRadius: 8,
  },
  codigo: {
    marginTop: '2%',
    width: '20%',
    height: '20%',
  },
  details: {
    flexDirection: 'row',
    marginTop: '4%',
    height: '70%',
    alignContent: 'stretch',
  },
  info: {
    fontSize: 16,
  },
  trash: {
    width: '10%',
    height: '70%',
    marginLeft: '18%',
    alignItems: 'center'
  },
})
