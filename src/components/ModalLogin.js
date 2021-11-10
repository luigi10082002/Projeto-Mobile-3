import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Picker,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { COLORS } from "../components/Colors";

const { height } = Dimensions.get("window");

export default function Modal({ show, close }) {
  const [selectedValue, setSelectedValue] = useState("java");

  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 10 }),
      Animated.timing(state.opacity, { toValue: 1, duration: 10 }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, { toValue: 0, duration: 0 }),
      Animated.timing(state.container, { toValue: height, duration: 10 }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.container_modal}>
          <KeyboardAvoidingView
            ebehavior={Platform.OS === "ios" ? "padding" : null}
          >
            <View style={styles.header}>
              <Text style={styles.textHeader}>Login</Text>
            </View>

            <View style={styles.legenda}>
              <Text style={styles.text}>Texto</Text>
            </View>

            <View style={styles.select}>
            <Picker
              selectedValue={selectedValue}
              style={styles. picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
            </View>
            <View style={styles.buttonClose}>
              <TouchableOpacity style={styles.Close} onPress={close}>
                <AntDesign name="closecircleo" size={40} color="#f00" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Black_Secondary,
    position: "absolute",
  },
  modal: {
    backgroundColor: "#fff",
    position: "absolute",
    alignSelf: "center",
    height: "40%",
    width: "90%",
    marginTop: "55%",
    borderRadius: 15,
  },
  //CSS das Views
  header: {
    backgroundColor: COLORS.Blue,
    alignItems: "center",
    justifyContent: "center",
    height: "13%",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  select: {
    backgroundColor: COLORS.Gray_Primary,
    alignSelf: "center",
    width: '30%',
    height: '13%',
    marginTop: '15%'
  },
  legenda: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: '70%',
    height: '13%',
    marginTop: '15%'
  },
  //CSS dos Textos
  textHeader: {
    fontFamily: "Rajdhani_600SemiBold",
    textAlign: "center",
    fontSize: 20,
    color: COLORS.White,
  },
  buttonClose: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    height: 42,
    width: 42,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
});
