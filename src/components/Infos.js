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

  useEffect(() => {
    async function QuantidadeTotal() {
      if (Produto.length !== 0) {
        const Total = Produto.reduce(function (itens, element) {
          return itens + parseInt(element.qtd);
        }, 0);

        parseInt(Total);
        setItems(Total);
        parseInt(items);
      } else {
        setItems(0);
      }
    }

    QuantidadeTotal();
  }, [Produto || Produto.length]);

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }

  return (
    <View style={styles.infos}>
      <View style={styles.boxProdutos}>
        <Text style={styles.TextProdutos}>Total de Produtos</Text>
        <Text style={styles.TextNumber}>{Produto.length}</Text>
      </View>

      <View style={styles.boxTotal}>
        <Text style={styles.TextProdutos}>Quantidade de</Text>
        <Text style={styles.TextItens}>Itens</Text>
        <Text style={styles.TextNumber}>{items}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infos: {
    flexDirection: "row",
    alignSelf: "center",
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
  TextItens: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
});
