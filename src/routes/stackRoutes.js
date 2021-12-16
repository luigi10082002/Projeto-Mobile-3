import React from "react";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { TabNavi } from "./tabRoutes";
import Modules from "../pages/Modulos/Modules";
import Historic from "../pages/Historico/Historic";
import LoginProxy from "../pages/LoginProxy/LoginProxy";
import LoginEmail from "../pages/LoginEmail/LoginEmail";
import Index from "../pages/Carousel/index"

enableScreens();

const stackRoutes = createSharedElementStackNavigator();

const AppRoutes = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: "#fff",
      },
    }}
  >
    <stackRoutes.Screen name="Home" component={TabNavi} />

    <stackRoutes.Screen name="Modules" component={Modules} />

    <stackRoutes.Screen name="Historic" component={Historic} />

    <stackRoutes.Screen name="LoginProxy" component={LoginProxy} />

    <stackRoutes.Screen name="LoginEmail" component={LoginEmail} />

    <stackRoutes.Screen name="Index" component={Index} />

  </stackRoutes.Navigator>
);

export default AppRoutes;
