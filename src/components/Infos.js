import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, AsyncStorage, SafeAreaView } from "react-native";
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
    <>
    <Text style={styles.Legenda}>Informações do inventário em andamento</Text>
    <SafeAreaView style={styles.infos}>
      <View style={styles.boxProdutos}>
        <View style={styles.header}>
        <Text style={styles.TextProd}>Total de Produtos</Text>
        </View>
        <Text style={styles.TextNumber}>{Produto.length}</Text>
      </View>

      <View style={styles.boxTotal}>
        <View style={styles.header}>
        <Text style={styles.TextProdutos}>Qtd. de Itens contados</Text>
        </View>
        <Text style={styles.TextNumber}>{items}</Text>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  //CSS Views
  infos: {
    flexDirection: "row",
    alignSelf: "center",
    height: 70,
    width: "80%",
  },
  boxProdutos: {
    backgroundColor: COLORS.Gray_Primary,
    alignItems: "center",
    alignSelf: "center",
    marginLeft: "3%",
    width: "45%",
    height: "100%",
    borderRadius: 8,
  },
  boxTotal: {
    backgroundColor: COLORS.Gray_Primary,
    alignItems: "center",
    alignSelf: "center",
    marginLeft: "4%",
    width: "45%",
    height: "100%",
    borderRadius: 8,
  },
  //CSS Texts
  TextNumber: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextProdutos: {
    alignSelf: "center",
    marginTop: "5%",
    fontSize: 13,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextProd: {
    alignSelf: "center",
    marginTop: "6%",
    fontSize: 13,
    fontFamily: "Rajdhani_600SemiBold",
  },
  header: {
    backgroundColor: COLORS.Gray_Quaternary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    height: "35%",
  },
  Legenda: {
    fontFamily: "Rajdhani_600SemiBold",
    textAlign: "center",
    alignSelf: "center",
    height: "auto",
    width: "73%",
    marginTop: "9%"
  },
});
