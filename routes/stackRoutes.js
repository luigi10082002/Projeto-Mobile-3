import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { TabNavi } from './tabRoutes';
import Modules from '../src/pages/Modules';
import Historic from '../src/pages/Historic';
import QRcode from '../src/pages/QRcode';

enableScreens();

const stackRoutes = createSharedElementStackNavigator();

const AppRoutes = () => (
        <stackRoutes.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#fff'
                },
            }}
        >

        <stackRoutes.Screen 
            name="Home"
            component={TabNavi}
            options={{
                headerShown: false
                }
            }
        />

        <stackRoutes.Screen 
            name="Modules"
            component={Modules}
        />

        <stackRoutes.Screen 
            name="QRcode"
            component={QRcode}
        />

        <stackRoutes.Screen 
            name="Historic"
            component={Historic}
        />
     
    </stackRoutes.Navigator>
)


export default AppRoutes;
