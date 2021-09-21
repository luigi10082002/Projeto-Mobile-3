import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

export default function Historic() {
  return(
    <View style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.text}>Pesquisa</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
          ></TextInput>
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome name="search" size={25} color="#000"/>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.codigo}>
              <Text style={styles.infos}>Código</Text>
            </View>
          <View style={styles.info}>
            <Text style={styles.infos}>Data</Text>
            <Text style={styles.infos}>Hora</Text>
            <Text style={styles.infos}>-</Text>
            <Text style={styles.infos}>2 unidade(s)</Text>
            <TouchableOpacity style={styles.trash}>
              <FontAwesome name="trash" size={30} color="#f00"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    width: '80%',
    height: '15%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  input: {
    flexDirection: 'row',
    height: '60%',
    width: '100%',
  },
  card: {
    marginTop: '5%',
    marginHorizontal: '10%',
    width: '90%',
    height: '70%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8
  },
  info: {
    flexDirection: 'row',
    
  },
  inputText: {
    backgroundColor: '#C0C0C0',
    height: '80%',
    width: '100%',
    marginTop: '3%'
  },
  searchButton: {
    backgroundColor: '#C0C0C0',
    height: '80%',
    width: '10%',
    marginTop: '3%',
    justifyContent: 'center',
  },
  codigo: {
    marginTop: '5%',
  },
  text: {
    fontSize: 25
  },
  infos: {
    fontSize: 16,
    marginLeft: '2%',
  },
  trash: {
    marginLeft: '15%',
    alignSelf: 'center'
}
})
