import { StyleSheet } from 'react-native';

import { COLORS } from "../../components/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
