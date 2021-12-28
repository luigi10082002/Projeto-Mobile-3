import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({  
  container: {
    flex: 1
  },
  image: {
    alignSelf: "center",
    marginTop: '8%',
    width: '90%',
    height: '68%',
    borderRadius: 15
  },
  text: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    fontSize: 14,
    alignContent: "center",
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
