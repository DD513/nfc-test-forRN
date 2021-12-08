import React from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import Divider from "react-native-divider";
import { WebView } from "react-native-webview";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { Icon } from "@ant-design/react-native";

// Dimensions 用於獲取裝置寬、高、解析度
const { width, height } = Dimensions.get("window");

export default Home = () => {
  const days = [
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
        <Button type="primary" style={styles.startButton}>
          <Icon name="fire" size={20} color="#FFF" />
          開始訓練
        </Button>
        <Divider orientation="left" style={styles.divider}>
          計畫
        </Divider>
        {days.map((day) => {
          return (
            <Button type="ghost" style={styles.plan} key={day}>
              <Icon name="thunderbolt" size={20} color="#1890FF" />
              {day}
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
    width: width,
    height: height,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
  },
  startButton: {
    width: "100%",
    height: 80,
    backgroundColor: "#1890ff",
    margin: 8,
  },
  plan: {
    width: "100%",
    margin: 8,
  },
  divider: {
    fontSize: 60, //大小沒改
  },
});
