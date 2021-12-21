import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

export const styles = StyleSheet.create({  
  container: {
    position: 'absolute',
    alignSelf: 'center',
    width: "100%",
    height: "95%",
    marginTop: "10%",
  },
  image: {
    width: '100%',
    height: '73%',
  },
  title: {
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '3%',
    fontSize: 23,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginHorizontal: '3%'
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
