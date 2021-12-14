import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../Colors";
import Index from "../../pages/Carousel/index"

const { height } = Dimensions.get('window')

function Modal ({ show, close }) {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 300 }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.opacity, { toValue: 0, duration: 300 }),
      Animated.timing(state.container, { toValue: height, duration: 100 })
    ]).start()
  }

  useEffect(() => {
    if(show){
      openModal()
    }else{
      closeModal()
    }  
  }, [show])

  return( 
    <Animated.View 
      style={[styles.container, {
        opacity: state.opacity,
        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      <Animated.View 
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >

        <Index/>

        <View style={styles.buttonClose}>
          <TouchableOpacity style={styles.Close} onPress={close}>
            <AntDesign name="closecircleo" size={45} color='#f00' />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  //CSS Views
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.Black_Secondary,
    position: 'absolute'
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '88%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25
  },
  buttonClose: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: '100%',
    width: '15%',
    height: '8%',
  },
  Close: {
    alignSelf: "center",
  },
});

export default Modal
