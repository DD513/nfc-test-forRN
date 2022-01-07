import React from "react";
import { Text, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppLoading } from "expo-app-loading";
import { Provider } from "@ant-design/react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import NFCReader from "../screens/NFCReader";
import Category from "../screens/category";
import Completed from "../screens/completed";
import Workout from "../screens/Workout";
import Counter from "../screens/Counter";
import { Icon } from "@ant-design/react-native";
import { FontDisplay } from "expo-font";
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
    { name: "Setting", component: Counter, icon: "setting" },
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
              headerTitleStyle: {
                width: 211,
                height: 28,
                fontFamily: "Roboto_500Medium",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: 20,
                lineHeight: 28,
                alignItems: "center",
                textAlign: "center",
              },
              headerTitleAlign: "center",
              tabBarStyle: {
                paddingLeft: 24,
                paddingRight: 24,
              },
              tabBarItemStyle: {
                width: 49,
                height: 46,
                padding: 0,
                borderBottomColor: "transparent",
                borderBottomWidth: 2,
                marginLeft: 16,
                marginRight: 16,
              },
              tabBarIconStyle: {
                marginBottom: 0,
              },
              tabBarActiveTintColor: "#1890FF",
              tabBarInactiveTintColor: "#000000",
              tabBarLabelStyle: {
                fontFamily: "Roboto_400Regular",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: 12,
                lineHeight: 20,
                marginTop: -10,
              },
              tabBarIcon: ({ color, size }) => (
                <Icon name={tab.icon} color={color} size={14} />
              ),
              tabBarLabel: tab.name,
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
    Roboto_400Regular,
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
              headerTitleStyle: {
                fontFamily: "Roboto_500Medium",
                fontStyle: "normal",
                fontSize: 20,
                lineHeight: 28,
              },
              headerTitleAlign: "center",
              headerLeft: () => (
                <Icon
                  name="arrow-left"
                  color="rgba(0, 0, 0, 0.85)"
                  onPress={navigation.goBack}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Completed"
            component={Completed}
            options={({ navigation }) => ({
              title: "完成訓練",
              headerTitleStyle: {
                fontFamily: "Roboto_500Medium",
                fontStyle: "normal",
                fontSize: 20,
                lineHeight: 28,
              },
              headerTitleAlign: "center",
              // disable the navigation button
              headerLeft: () => <View />,
              headerRight: () => (
                <Icon
                  name="share-alt"
                  color="rgba(0, 0, 0, 0.85)"
                  // onPress=
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
