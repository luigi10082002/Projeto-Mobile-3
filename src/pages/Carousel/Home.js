import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import dataHome from '../../lib/DataHome';

export default function Index() {
  const navigation = useNavigation();

  const Data = dataHome;

  function GoBack() {
    navigation.navigate("Home")
  }
   
  function Render({ item  }) {
    return(
      <View style={styles.container}>
        <View styles={styles.close}>
        <TouchableOpacity style={styles.btnClose} onPress={GoBack}>
          <FontAwesome name="remove" size={38} color="#E76B09" />
        </TouchableOpacity>
      </View>
        <Image
          style={styles.image}
          source={item.img}
        />
        <View style={styles.textView}>
        <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    )
  }

  return(
    <View style={styles.container}>

      <AppIntroSlider
        renderItem={Render}
        data={Data}
        activeDotStyle={styles.active}

        showDoneButton={true}
        showNextButton={true}
        showPrevButton={true}

        renderDoneButton={() =>
          <View style={styles.Done}>
            <TouchableOpacity onPress={GoBack}>
              <FontAwesome name="check" size={38} color="#1151CC" />
            </TouchableOpacity>
          </View>
        }

        renderNextButton={() =>
          <FontAwesome name="chevron-right" size={38} color="#1151CC" style={styles.Done}/>
        }

        renderPrevButton={() =>
          <FontAwesome name="chevron-left" size={38} color="#1151CC" style={styles.Prev}/>
        }
      />
    </View>
  )
}
