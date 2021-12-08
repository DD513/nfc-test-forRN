import React from "react";
import { Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NFCReader from "./app/screens/NFCReader";
import Category from "./app/screens/category";
import Home from "./app/screens/home";
import { Icon } from "@ant-design/react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function Root() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Workout"
        component={Home}
        options={{
          tabBarLabel: "Workout",
          tabBarIcon: ({ color, size }) => (
            <Icon name="fire" color={color} size={size} />
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="History"
        component={Home}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={Category}
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
  );
}

export default function App() {
  const linking = {
    prefixes: ["https://fintess-coach.herokuapp.com"],
  };

  const config = {
    screens: {
      NFCReader: "NFCReader",
      Home: "Home",
      Category: "category:id", // https://fintess-coach.herokuapp.com/category?id=1
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      ref={navigationRef}
    >
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="NFCReader" component={NFCReader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
