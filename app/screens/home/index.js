import React from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import Divider from "react-native-divider";
import { WebView } from "react-native-webview";
import { Button, WhiteSpace } from "@ant-design/react-native";
import { Icon } from "@ant-design/react-native";

// Dimensions 用於獲取裝置寬、高、解析度
const { width, height } = Dimensions.get("window");

export default class Home extends React.Component {
  render() {
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
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            爆發力日
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            肌力日
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            臀腿日
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            胸背日
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            腹肌撕裂
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            肌肥大漸進性增肌
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            上下分法
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            上下分法
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            上下分法
          </Button>
          <Button type="ghost" style={styles.plan}>
            <Icon name="thunderbolt" size={20} color="#1890ff" />
            上下分法
          </Button>
        </View>
      </ScrollView>
    );
  }
}

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
    height: 40,
    margin: 8,
  },
  divider: {
    fontSize: 60,
  },
});
