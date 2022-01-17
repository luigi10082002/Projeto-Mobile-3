import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Home from "../pages/Home/Home";
import Settings from "../pages/Settings/Settings";
import Index from '../pages/Carousel/Home';

const Tab = createBottomTabNavigator();

export const TabNavi = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;

            case "Settings":
              iconName = "settings";
              break;

            case "Carousel":
              iconName = "help-circle";
              break;
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={styles.container}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Carousel" component={Index} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
