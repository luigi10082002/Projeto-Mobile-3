import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../src/pages/Home';
import Settings from '../src/pages/Settings';
import Historic from '../src/pages/Historic';

const Tab = createBottomTabNavigator();

export const TabNavi = () => {
  return (
    <Tab.Navigator

      screenOptions = {({ route }) => ({
        tabBarIcon: ({ color, size }) => {
      
          let iconName;

            switch (route.name) {

              case 'Home':
                iconName = 'home';
              break;

              case 'Historic':
                iconName = 'clock';
              break;

              case 'Settings':
                iconName = 'settings';
              break;
        }

    return <Icon name={iconName} size={size} color={color} style={styles.container}/>;
    },
})
}
      tabBarOptions={{
      showLabel: false,
}}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
	container: {
    justifyContent: 'center',
    alignItems: 'center',
	},
});


