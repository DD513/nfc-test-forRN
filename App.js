import React from "react";
import { Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import NFCReader from "./app/screens/NFCReader";
import category from "./app/screens/category";
import home from "./app/screens/home";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();
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
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={home}
          options={{
            title: "Workout",
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Icon2.Button
                name="nfc"
                size={30}
                color="#000"
                backgroundColor="#fff"
                onPress={() => {
                  navigationRef.navigate("NFCReader");
                }}
              ></Icon2.Button>
            ),
          }}
        />
        <Stack.Screen
          name="NFCReader"
          component={NFCReader}
          options={{
            title: "NFC 感應",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Icon.Button
                name="arrowleft"
                size={30}
                color="#000"
                backgroundColor="#fff"
                onPress={() => {
                  navigationRef.navigate("home");
                }}
              ></Icon.Button>
            ),
          }}
        />
        <Stack.Screen
          name="category"
          component={category}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
