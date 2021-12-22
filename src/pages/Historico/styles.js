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
    height: "77%",
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
    height: 75,
    width: "100%",
  },
  infos: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  indicator: {
    width: 'auto',
    height: 'auto',
    position: "absolute",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: '90%',
  },
  //CSS Texts
  textCod: {
    fontSize: 15,
    fontWeight: "bold",
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
    marginTop: "25%",
  },
  btn: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "70%",
    width: "100%",
    height: "100%",
  },
  details: {
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
});
