import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //CSS das Views
  scanner: {
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    width: "90%",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: "5%",
  },
  btn: {
    width: "90%",
    height: "80%",
    marginTop: "25%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
  Infos: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
    height: 60,
    width: "90%",
  },
  Qtd: {
    marginLeft: "5%",
    width: "30%",
    height: "100%",
  },
  Cod: {
    width: "65%",
    height: "100%",
  },
  Local: {
    width: "100%",
    height: "100%",
  },
  buttonSave: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "90%",
    height: 50,
  },
  listProdutos: {
    flexDirection: "row",
    marginTop: "5%",
    marginLeft: "5%",
    width: "90%",
    height: 20,
  },
  listItems: {
    alignSelf: "center",
    height: 306,
    width: "90%",
    marginTop: "2%",
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.Gray_Tertiary,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: "2%",
    height: 68,
    width: "100%",
  },
  infosProd: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  details: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  //CSS dos Textos
  textQtd: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textCod: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textLocal: {
    fontFamily: "Rajdhani_600SemiBold",
    height: "auto",
    width: "auto",
    fontSize: 20,
  },
  textSave: {
    fontFamily: "Rajdhani_600SemiBold",
    color: COLORS.White,
    fontSize: 20,
  },
  textList: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  CodProd: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: "5%",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Rajdhani_600SemiBold",
    color: COLORS.White,
  },
  //CSS dos Inputs
  labelQtd: {
    backgroundColor: COLORS.Gray_Primary,
    borderRadius: 5,
    paddingHorizontal: "5%",
    height: "65%",
    width: "100%",
  },
  labelCod: {
    backgroundColor: COLORS.Gray_Primary,
    borderRadius: 5,
    paddingHorizontal: "5%",
    height: "65%",
    width: "100%",
  },
  labelLocal :{
    backgroundColor: COLORS.Gray_Primary,
    borderRadius: 5,
    paddingHorizontal: "5%",
    height: "65%",
    width: "100%",
  },
  //CSS do Botão SALVAR
  save: {
    backgroundColor: COLORS.Blue,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    backgroundColor: COLORS.Blue,
    width: "45%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  }
});
