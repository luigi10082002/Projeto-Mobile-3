import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  //CSS Views
  search: {
    flexDirection: "row",
    width: "90%",
    height: "100%",
    marginLeft: "5%",
  },
  listItems: {
    alignSelf: "center",
    height: "64%",
    width: "90%",
  },
  delete: {
    width: "18%",
    height: "70%",
    backgroundColor: COLORS.Red,
    marginTop: "3%",
    borderRadius: 8,
  },
  icon: {
    backgroundColor: COLORS.Gray_Primary,
    justifyContent: "center",
    alignSelf: "center",
    width: "12%",
    height: "100%",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: "2%",
    height: 65,
    width: "100%",
  },
  infos: {
    flexDirection: "row",
    width: "96%",
    marginLeft: "5%",
  },
  indicator: {
    backgroundColor: COLORS.Red,
    width: '0.01%',
    height: '100%',
    position: "absolute",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    marginLeft: '98.5%',
  },
  //CSS Texts
  textCod: {
    fontSize: 15,
    marginLeft: "5%",
    marginTop: "5%",
  },
  txtSearch: {
    fontSize: 20,
    marginLeft: "5%",
  },
  //CSS Buttons
  buttonDelete: {
    alignSelf: "center",
    marginTop: "17%",
  },
  btn: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "70%",
    width: "100%",
    height: "100%",
  },
  details: {
    flexDirection: "row",
    backgroundColor: COLORS.Gray_Tertiary,
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  detailsInvalid: {
    backgroundColor: COLORS.Red,
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  //CSS Inputs
  input: {
    backgroundColor: COLORS.Gray_Primary,
    height: 60,
    width: "88%",
    paddingHorizontal: "5%",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  Destaque: {
    width: "75%",
    height: "100%",
  },
  infosProdQtd: {
    fontSize: 20,
  },
  DestaqueQtd: {
    height: "35%",
    width: "21%",
    marginTop: "8.5%",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  DataHora: {
    color: COLORS.Gray
  }
});
