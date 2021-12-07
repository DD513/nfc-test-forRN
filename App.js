import React from "react";
import { Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NFCReader from "./app/screens/NFCReader";
import category from "./app/screens/category";
import home from "./app/screens/home";
import { Icon } from "@ant-design/react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function App() {
  const linking = {
    prefixes: ["https://fintess-coach.herokuapp.com"],
  };

  const config = {
    screens: {
      NFCReader: "NFCReader",
      home: "home",
      category: "category:id", // https://fintess-coach.herokuapp.com/category?id=1
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      ref={navigationRef}
    >
      <Tab.Navigator>
        <Tab.Screen
          name="Workout"
          component={home}
          options={{
            tabBarLabel: "Workout",
            tabBarIcon: ({ color, size }) => (
              <Icon name="fire" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={home}
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Program"
          component={category}
          options={{
            tabBarLabel: "Program",
            tabBarIcon: ({ color, size }) => (
              <Icon name="project" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={NFCReader}
          options={{
            tabBarLabel: "Setting",
            tabBarIcon: ({ color, size }) => (
              <Icon name="setting" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
