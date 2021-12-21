import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS Views
  boxServer: {
    width: "100%",
    height: "13%",
  },
  boxDelete: {
    width: "100%",
    height: "13%",
  },
  Info: {
    position: "absolute",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginTop: 400,
    width: 50,
    height: 45,
  },
  //CSS Buttons
  DeleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  //CSS Texts
  text: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
    marginLeft: "5%",
    alignSelf: "center",
  },
  textDelete: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
    color: COLORS.Red,
  },
  textSincronizar: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
    color: COLORS.Black,
  },
  //CSS Line
  separador: {
    backgroundColor: COLORS.Black,
    width: "100%",
    height: 1,
  },
});
