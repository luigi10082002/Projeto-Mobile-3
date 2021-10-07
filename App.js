import React from 'react';
import { StatusBar, YellowBox, AsyncStorage } from 'react-native';



import Routes from './src/routes/index';
import AppLoading from 'expo-app-loading';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import {useFonts } from 'expo-font';


AsyncStorage.clear();
YellowBox.ignoreWarnings([""]);


export default function App() {
    const [fontsLoaded, error] = useFonts({
      RobotoMono_400Regular
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
