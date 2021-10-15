import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default (props) => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>{props.data.Produto}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    width:'100%',
    height:50,
    backgroundColor:'#fff',
    borderBottomWidth:0.5,
    borderColor:'#ccc',
    padding:5
  },
  label:{
    fontSize:18,
    fontWeight:'bold'
  }
})
