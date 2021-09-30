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
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
//Card
  card: {
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    marginLeft: '10%',
    marginTop: '100%',
    width: '75%',
    height: '85%',
    borderRadius: 8
  },
  buttonCard: {
    width: '80%',
    height: '100%',
  },
  delete: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '20%',
    height: '100%',
  },
  buttonDelete: {
    marginTop: '80%'
  },
})
