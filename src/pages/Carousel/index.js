import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import { Pages } from "../../lib/Pages";
import dataHome from "../../lib/DataHome";

import { styles } from "./styles";

export default function Index() {
  const navigation = useNavigation();
  const route = useRoute();

  const Data = route.params.data;
  const [info, setInfo] = useState(route.params.data);

  const Info = route.params.id;
  const [id, setId] = useState(route.params.id);

  useFocusEffect(
    useCallback(() => {
      setInfo(Data);
    }, [Data])
  );

  useFocusEffect(
    useCallback(() => {
      setId(Info);
    }, [Info])
  );

  function GoBack() {
    if(id === 1) {
      navigation.navigate("Home")
    } else if(id === 2) {
      navigation.navigate("Modules")
    } else if(id === 3) {
      navigation.navigate("Historic")
    } else if(id === 4) {
      navigation.navigate("Settings")
    } else if(id === 5) {
      navigation.navigate("LoginProxy")
    } else if(id === 6) {
      navigation.navigate("LoginEmail")
    }
  }

  function Render({ item  }) {
    return(
      <View>
        <Image
          style={styles.image}
          source={item.img}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }
  return(
    <View style={styles.container}>
      <AppIntroSlider
        renderItem={Render}
        data={info}
        activeDotStyle={styles.active}
        showSkipButton={true}
        renderSkipButton={() => 
          <View style={styles.Skip}>
            <FontAwesome name="check-square-o" size={35} color="#4B7DFE"/>
          </View>
        }
        showDoneButton={true}
        renderDoneButton={() => 
          <TouchableOpacity style={styles.GoHome} onPress={GoBack}>
            <FontAwesome name="sign-out" size={35} color="#4B7DFE"/>
          </TouchableOpacity>
        }
      />
    </View>
  )
}
