import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  //CSS Views
  container: {
    flex: 1,
  },
  form: {
    width: "100%",
    height: "100%",
  },
  name: {
    alignSelf: "center",
    width: "90%",
    height: 70,
    marginTop: "10%",
  },
  email: {
    alignSelf: "center",
    width: "90%",
    height: 70,
    marginTop: "6%",
  },
  telefone: {
    alignSelf: "center",
    width: "90%",
    height: 70,
    marginTop: "6%",
  },
  empresa: {
    alignSelf: "center",
    width: "90%",
    height: 70,
    marginTop: "6%",
  },
  //CSS Button
  button: {
    backgroundColor: COLORS.Blue,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 70,
    borderRadius: 8,
    marginTop: "10%",
  },
  //CSS Texts
  textName: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textEmail: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textTelefone: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textEmpresa: {
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  textSave: {
    color: COLORS.White,
    fontFamily: "Rajdhani_600SemiBold",
    fontSize: 20,
  },
  //CSS Inputs
  input: {
    backgroundColor: COLORS.Gray_Primary,
    width: "100%",
    height: 50,
    borderRadius: 8,
    padding: 10,
  },
  inputName: {
    width: "100%",
    height: "100%",
  },
  inputEmail: {
    width: "100%",
    height: "100%",
  },
  inputTelefone: {
    width: "100%",
    height: "100%",
  },
  inputEmpresa: {
    width: "100%",
    height: "100%",
  },
  buttonSave: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
