import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import data from "../../lib/DataHome";
import { styles } from "./styles";

export default function Index() {

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
        renderDoneButton={() =>  <Text style={{fontSize: 20}}>Done</Text> }
      />
    </View>
  )
}
