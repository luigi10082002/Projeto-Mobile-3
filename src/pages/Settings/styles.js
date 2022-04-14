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
  //CSS Buttons
  DeleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  //CSS Texts
  textDelete: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: COLORS.Red,
  },
  textSincronizar: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: COLORS.Gray_Secondary,
  },
  //CSS Line
  separador: {
    backgroundColor: COLORS.Gray_Secondary,
    width: "100%",
    height: 1,
  },
});
