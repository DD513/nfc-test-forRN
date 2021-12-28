import React from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
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
    // 重複放的原因：檢查 scroll view樣式效果
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
    //  conflicted with existed header
    // <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <Button
          type="primary"
          style={styles.startButton}
          onPress={() => {
            navigation.navigate("NFCReader");
          }}
        >
          <Icon styles={styles.buttonText} name="fire-alt" color="#fff" size={15.43}>
            {"  "}開始訓練
          </Icon>
        </Button>
        <Divider orientation="left">
          <Text style={styles.titleText}>計畫</Text>
        </Divider>
        {days.map((day, index) => {
          return (
            <Button
              type="ghost"
              style={styles.plan}
              key={index}
              onPress={() => {
                navigation.navigate("Category");
              }}
            >
              <Icon styles={styles.buttonText} name="bolt" size={16}>
                {"  "}
                {day}
              </Icon>
            </Button>
          );
        })}
      </View>
    </ScrollView>
    // </SafeAreaView>
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
    height: 80,
    margin: 8,
    borderRadius: 2,
  },
  plan: {
    width: "100%",
    margin: 8,
    height: 40,
    padding: 0,
    borderRadius: 2,
  },
  titleText: {
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 28,
  },
  buttonText: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
