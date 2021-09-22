import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Modules() {
  const navigation = useNavigation();

  const [isSelected, setSelection] = useState(false);

  function Scanner() {
    navigation.navigate("QRcode")
  }

  return(
    <View style={styles.container}>
      <View style={styles.boxCodigo}>
        
        <Text style={styles.text}>Código</Text>
        
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
          ></TextInput>
          <TouchableOpacity style={styles.scanner} onPress={Scanner}>
            <FontAwesome name="qrcode" size={20} color="#000"/>
          </TouchableOpacity>
        </View>

          <View style={styles.checkbox}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text>Incluir Qauntidade</Text>
          </View>

        <View style={styles.boxQuantidade}>
          <Text style={styles.text}>Quantidade</Text>
       
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
          ></TextInput>
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
  boxCodigo: {
    width: '84%',
    height: '18%',
    marginTop: '10%',
    alignSelf: 'center',
  },
  boxQuantidade: {
    backgroundColor: '#000',
    width: '84%',
    height: '50%%',
    marginTop: '10%',
    alignSelf: 'center',
  },
  input: {
    flexDirection: 'row',
    height: '40%',
  },
  scanner: {
    backgroundColor: '#DCDCDC',
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%'
  },
  textInput: {
    marginTop: '2%',
    backgroundColor: '#DCDCDC',
    width: '90%',
    height: '100%'
  },
  text: {
    fontSize: 25
  },
})
