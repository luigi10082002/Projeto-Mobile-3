import React from 'react';
import { StatusBar, YellowBox, AsyncStorage } from 'react-native';

import Routes from './src/routes/index';
import AppLoading from 'expo-app-loading';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import {useFonts } from 'expo-font';

AsyncStorage.clear();
YellowBox.ignoreWarnings([""]);

export default function App() {
    const [fontsLoaded, error] = useFonts({
      Rajdhani_600SemiBold
    });
  
    if(!fontsLoaded){
      return <AppLoading/>
    }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes/>
    </>
  )
}
