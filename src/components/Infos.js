import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { useFocusEffect } from "@react-navigation/native";


import { COLORS } from "../components/Colors";

export default function Infos() {
  const [Produto, setProduto] = useState([]);
  
  const [items, setItems] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  useEffect(()=>{  
     function QuantidadeTotal() {
      const sum = Produto.reduce( function( prevVal, elem ) {
        return prevVal + parseInt(elem.qtd);
      }, 0 );
      parseInt(sum)
      setItems(sum)
      parseInt(items)

    }
    
    QuantidadeTotal();
  },[items]);

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];
    
    setProduto(storage);
  }

  function QuantidadeTotal() {
    const sum = Produto.reduce( function( prevVal, elem ) {
      return prevVal + elem.qtd;
  }, 0 );

  setItems(sum)
  }

  return (
    <View style={styles.infos}>
      <View style={styles.boxProdutos}>
        <Text style={styles.TextProdutos}>Total de produtos</Text>
        <Text style={styles.TextNumber}>{Produto.length}</Text>
      </View>

      <View style={styles.boxTotal}>
        <Text style={styles.TextProdutos}>Total de Itens</Text>
        <Text style={styles.TextNumber}>{items}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infos: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: "20%",
    width: "90%",
  },
  boxProdutos: {
    backgroundColor: COLORS.Gray_Primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: "3%",
    width: "45%",
    height: "75%",
    borderRadius: 8,
  },
  boxTotal: {
    backgroundColor: COLORS.Gray_Primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: "4%",
    width: "45%",
    height: "75%",
    borderRadius: 8,
  },
  TextNumber: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextProdutos: {
    alignSelf: "center",
    marginTop: "5%",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
})
