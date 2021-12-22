import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  //CSS Views
  container: {
    flex: 1,
  },
  Itens: {
    width: "70%",
    height: "2%",
    marginTop: "25%",
    position: "absolute",
    alignSelf: "center",
  },
  //CSS Texts
  text: {
    color: COLORS.Red,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
  },
  Info: {
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginTop: '33%',
    width: 50,
    height: 45,
  },
});
