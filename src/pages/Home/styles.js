import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS Views
  Button: {
    width: "75%",
    height: "10%",
    alignSelf: "center",
  },
  boxButton: {
    marginTop: "5%",
    width: "75%",
    height: "10%",
    alignSelf: "center",
  },
  Info: {
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    marginTop: "5%",
    width: "90%",
    height: "5%",
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
  TextTitle: {
    alignSelf: "center",
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 23,
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
    backgroundColor: COLORS.Blue,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    height: "130%",
    width: "42%",
    borderRadius: 15,
  },
  ButtonLogin: {
    backgroundColor: COLORS.Blue,
    flexDirection: "row",
    alignItems: "center",
    height: "130%",
    width: "53%",
    borderRadius: 15,
  },
  //CSS Icons
  IconQuestion: {
    marginLeft: "5%",
  },
  IconLogin: {
    marginLeft: "5%",
  },
  separador:{
    backgroundColor: COLORS.Black,
    alignSelf: "center",
    marginTop: "5%",
    height: '0.1%',
    width: '90%',
  },
  separadorDown:{
    backgroundColor: COLORS.Black,
    alignSelf: "center",
    marginTop: "13%",
    height: '0.1%',
    width: '90%',
  },
  Legenda: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Rajdhani_600SemiBold",
    width: "105%"
  },
  LegendaHistorico: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Rajdhani_600SemiBold",
    marginTop: "5%",
    width: "85%"
  },
  LegendaQr: {
    fontFamily: "Rajdhani_600SemiBold",
    marginTop: "5%",
    marginLeft: "7%",
  },
})
