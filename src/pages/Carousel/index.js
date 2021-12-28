import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

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
    if(id === 2) {
      navigation.navigate("Modules")
    } else if(id === 3) {
      navigation.navigate("Historic")
    } else if(id === 4) {
      navigation.navigate("Settings")
    } else {
      navigation.navigate("Home")
    }
  }

  function Render({ item  }) {
    return(
      <View style={styles.container}>
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
