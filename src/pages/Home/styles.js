import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS Views
  Button: {
    width: "85%",
    height: "15%",
    alignSelf: "center",
  },
  boxButton: {
    width: "85%",
    height: "15%",
    alignSelf: "center",
  },
  Info: {
    flexDirection: 'row',
    backgroundColor: COLORS.Blue,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginTop: "10%",
    marginRight: "5%",
    width: "35%",
    height: "5%",
    borderRadius: 15
  },
  //CSS Texts
  TextBold: {
    fontSize: 33,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextADD: {
    color: COLORS.White,
    fontSize: 20,
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextList: {
    color: COLORS.White,
    fontSize: 20,
    marginLeft: "2%",
    fontFamily: "Rajdhani_600SemiBold",
  },
  TextInfos: {
    alignSelf: "center",
    alignItems: "center",
    color: COLORS.White,
    fontSize: 15,
    fontFamily: "Rajdhani_600SemiBold",
    marginLeft: "5%",
  },
  //CSS Buttons
  ButtonAdd: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Blue,
    borderRadius: 9,
  },
  ButtonHistoric: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Gray_Secondary,
    borderRadius: 9,
  },
  ButtonInfos: {
    flexDirection: "row",
    alignItems: "center",
  },
})
