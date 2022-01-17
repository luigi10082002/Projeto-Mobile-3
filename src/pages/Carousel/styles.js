import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({  
  container: {
    flex: 1
  },
  btnClose: {
    marginTop: '13%',
    marginRight: '5%',
    alignSelf: 'flex-end',
  },
  Done: {
    marginHorizontal: '5%'
  },
  Prev: {
    marginHorizontal: '20%'
  },
  image: {
    alignSelf: "center",
    width: '90%',
    height: '60%',
    borderRadius: 15
  },
  textView: {
    alignSelf: "center",
    width: '90%',
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
  active: {
    backgroundColor: COLORS.Blue,
    width: "7%",
  },
  Skip: {
    marginLeft: '5%',
  },
  GoHome: {
    marginRight: '5%',
  },
})
