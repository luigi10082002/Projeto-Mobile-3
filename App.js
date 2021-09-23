import React from 'react';
import { StatusBar
  //, AsyncStorage 
} from 'react-native';

import Routes from './src/routes/index';

//AsyncStorage.clear();
export default function App() {

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes/>
    </>
  )
}
