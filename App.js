import React from "react";
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NFC from './nfc';
import Home from './home';

const Stack = createNativeStackNavigator();


export default function App() {
  const linking = {
    prefixes: ['https://monofitness.tw'],
  };

  const config = {
    screens: {
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'Home',
        },
        path: ['/','Home'],
      },
      NFC: {
        screen: '/:id:category',
        navigationOptions: {
          title: 'NFC',
        },
      },
    },
  };
  

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NFC" component={NFC} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}