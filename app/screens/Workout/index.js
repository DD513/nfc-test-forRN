import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Divider from "react-native-divider";
import { Button } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default Workout = ({ navigation }) => {
  const days = [
    "爆發力日",
    "肌力日",
    "上下分法",
    "腹肌撕裂",
    "臀腿日",
    "胸背日",
    "肌肥大漸進性增肌",
    "爆發力日",
    "肌力日",
    "上下分法",
    "腹肌撕裂",
    "臀腿日",
    "胸背日",
    "肌肥大漸進性增肌",
    "爆發力日",
    "肌力日",
    "上下分法",
    "腹肌撕裂",
    "臀腿日",
    "胸背日",
    "肌肥大漸進性增肌",
    "爆發力日",
    "肌力日",
    "上下分法",
    "腹肌撕裂",
    "臀腿日",
    "胸背日",
    "肌肥大漸進性增肌",
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <Button
          type="primary"
          style={styles.startButton}
          onPress={() => {
            navigation.navigate("NFCReader");
          }}
        >
          <Icon name="fire-alt" color="#fff" size={18}>
            {"  "}開始訓練
          </Icon>
        </Button>
        <Divider orientation="left">
          <Text style={styles.titleText}>計畫</Text>
        </Divider>
        {days.map((day, index) => {
          return (
            <Button type="ghost" style={styles.plan} key={index}>
              <Icon name="bolt" size={18}>
                {"  "}
                {day}
              </Icon>
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
  },
  startButton: {
    width: "100%",
    height: 100,
    margin: 8,
  },
  plan: {
    width: "100%",
    margin: 8,
    height: "auto",
    padding: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
