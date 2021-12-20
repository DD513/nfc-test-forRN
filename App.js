import React from "react";
import { Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "@ant-design/react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import NFCReader from "./app/screens/NFCReader";
import Category from "./app/screens/category";
import Workout from "./app/screens/Workout";
import { Icon } from "@ant-design/react-native";
const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function Root() {
  const rootConfig = [
    { name: "Workout", component: Workout, icon: "fire" },
    { name: "History", component: NFCReader, icon: "calendar" },
    { name: "Program", component: NFCReader, icon: "project" },
    { name: "Settings", component: NFCReader, icon: "setting" },
  ];
  return (
    <Tab.Navigator>
      {rootConfig.map((tab) => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              headerTitleAlign: "center",
              tabBarLabel: tab.name,
              tabBarIcon: ({ color, size }) => (
                <Icon name={tab.icon} color={color} size={size} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default function App() {
  const linking = {
    prefixes: ["https://fintess-coach.herokuapp.com"],
  };
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <Provider>
      <NavigationContainer
        linking={linking}
        fallback={<Text>Loading...</Text>}
        ref={navigationRef}
      >
        <Stack.Navigator initialRouteName="Root">
          <Stack.Screen
            name="NFCReader"
            component={NFCReader}
            options={({ navigation }) => ({
              title: "NFC 感應",
              headerTitleAlign: "center",
              headerLeft: () => (
                <Icon
                  name="arrow-left"
                  color="#000"
                  onPress={navigation.goBack}
                />
              ),
            })}
          />
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={Root} />
            <Stack.Screen name="Category" component={Category} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
