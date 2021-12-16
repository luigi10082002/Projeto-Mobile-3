import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

import data from "../../lib/DataHome";
import { styles } from "./styles";

export default function Index() {
  const navigation = useNavigation();

  function GoBack() {
    navigation.navigate("Home");
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
        data={data}
        activeDotStyle={styles.active}
        showDoneButton={true}
        renderDoneButton={() => 
          <TouchableOpacity onPress={GoBack}>
            <FontAwesome name="check" size={25} color="#4B7DFE"/>
          </TouchableOpacity>
        }
      />
    </View>
  )
}
