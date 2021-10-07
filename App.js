import React from 'react';
import { StatusBar, YellowBox 
  //, AsyncStorage 
} from 'react-native';

import Routes from './src/routes/index';

//AsyncStorage.clear();
YellowBox.ignoreWarnings([""]);
export default function App() {

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes/>
    </>
  )
}
