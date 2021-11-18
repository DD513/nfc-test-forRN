import React from "react";
import { Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Reader from './app/screens/NFCReader/reader';
import Webview from './app/screens/Webview/webview';
import Filter from './app/screens/Webview/filter';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function App() {
  const linking = {
    prefixes: ['https://fintess-coach.herokuapp.com'],
  };

  const config = {
    screens: {
      Reader: 'Reader',
      Webview: 'Webview',
      Filter: 'Filter',
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Reader" component={Reader} options={{
          title: 'NFC 感應',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon.Button name="arrowleft" size={30} color="#000" backgroundColor="#fff" onPress={()=>{navigationRef.navigate('Webview')}}></Icon.Button>
          ),
        }} />
        <Stack.Screen name="Webview" component={Webview} options={{headerShown: false}} />
        <Stack.Screen name="Filter" component={Filter} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}