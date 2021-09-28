import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function Card() {
  const [Produto, setProduto] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadSpots();
    }, [Produto])
  );

  async function loadSpots() {
    const response = await AsyncStorage.getItem("@Produtos");
    const storage = response ? JSON.parse(response) : [];

    setProduto(storage);
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.buttonCard}>
          <Text>A</Text>
          <Text>A</Text>
          <Text>A</Text>
          <Text>A</Text>
          <Text>A</Text>
        </TouchableOpacity>
        <View style={styles.delete}>
          <TouchableOpacity style={styles.buttonDelete}>
            <FontAwesome name="trash" size={35} color="#f00"/>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
//Card
  card: {
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    marginLeft: '10%',
    width: '75%',
    height: '15%',
    borderRadius: 8, 
  },
  buttonCard: {
    backgroundColor: '#0ff',
    width: '100%',
    height: '100%',
    borderRadius: 8, 
  },
  delete: {
    backgroundColor: '#f0f',
    position: "absolute",
    alignSelf: "center",
    direction: 'rtl',
    width: '10%',
    height: '27%',    
  },
  buttonDelete: {
  },
})
