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
        <View styles={styles.close}>
        <TouchableOpacity style={styles.btnClose} onPress={GoBack}>
          <FontAwesome name="remove" size={38} color="#f00" />
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
        data={info}
        activeDotStyle={styles.active}

        showDoneButton={true}
        showNextButton={true}
        showPrevButton={true}

        renderDoneButton={() =>
          <View style={styles.Done}>
            <TouchableOpacity onPress={GoBack}>
              <FontAwesome name="check" size={38} color="#4B7DFE" />
            </TouchableOpacity>
          </View>
        }

        renderNextButton={() =>
          <FontAwesome name="chevron-right" size={38} color="#4B7DFE" style={styles.Done}/>
        }

        renderPrevButton={() =>
          <FontAwesome name="chevron-left" size={38} color="#4B7DFE" style={styles.Prev}/>
        }
      />
    </View>
  )
}
