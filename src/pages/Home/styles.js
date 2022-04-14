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
    width: "90%",
    height: "5%",
  },
  //CSS Texts
  TextADD: {
    color: COLORS.White,
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
  },
  TextList: {
    color: COLORS.White,
    fontSize: 17,
    marginLeft: "2%",
    fontFamily: "Poppins_400Regular",
  },
  TextInfos: {
    alignSelf: "center",
    alignItems: "center",
    color: COLORS.White,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginLeft: "6%",
  },
  TextTitle: {
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 23,
    color: COLORS.Gray_Secondary,
    marginTop: "5%",
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
    backgroundColor: COLORS.Gray_Secondary,
    alignSelf: "center",
    marginTop: "5%",
    height: '0.1%',
    width: '90%',
  },
  separadorDown:{
    backgroundColor: COLORS.Gray_Secondary,
    alignSelf: "center",
    marginTop: "13%",
    height: '0.1%',
    width: '90%',
  },
  Legenda: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    width: "105%"
  },
  LegendaHistorico: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    marginTop: "5%",
    width: "85%"
  },
  LegendaQr: {
    fontFamily: "Poppins_400Regular",
    marginTop: "5%",
    marginLeft: "7%",
  },
  LegendaSincBtn: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
    width: "90%",
  },
  textLegendaERP: {
    fontFamily: "Poppins_400Regular",
    marginLeft: "4%",
    fontSize: 14
  },
  textLegendaEMAIL: {
    fontFamily: "Poppins_400Regular",
    marginLeft: "8%",
    fontSize: 14
  },
})
