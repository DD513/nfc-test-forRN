import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Button } from "@ant-design/react-native";

import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

  return (
    <View style={{ textAlign: "center" }}>
      <Text>
        {hours}:{minutes}:{seconds}
      </Text>
      <Text>{isRunning ? "Running" : "Not running"}</Text>
      <Button onPress={start}>Start</Button>
      <Button onPress={pause}>Pause</Button>
      <Button onPress={reset}>Reset</Button>
    </View>
  );
}

export default function category({ route, navigation }) {
  let path;
  let url = "https://fintess-coach.herokuapp.com";
  if (route) {
    console.log(route);
    if (route.params) {
      if (route.params.id) {
        path = `/${route.name}?id=${route.params.id}`;
        url = url + path;
      } else if (route.params.url) {
        url = route.params.url;
        console.log(url);
      }
    } else if (route.url !== null) {
      url = route.url;
    }
  }
  console.log(123, url);
  if (url === "https://fintess-coach.herokuapp.com") {
    if (route.canGoBack) {
      navigation.goBack();
    } else {
      navigation.navigate("NFCReader");
    }
  }
  return (
    <View style={styles.container}>
      <MyStopwatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
