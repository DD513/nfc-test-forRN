import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

// Pre-step, call this before any NFC operations
async function initNfc() {
  await NfcManager.start();
}

async function readNdef() {
  let result = false;
  try {
    // Step 1 使用 NDEF 技術讀取 TAG
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: "請靠近器材讀取 NFC TAG",
    });
    // Step 2 取得 TAG 內容
    const nfcTag = await NfcManager.getTag();
    console.log("[NFC Read] [INFO] Tag: ", nfcTag);
    // Step 3 對使用者顯示讀取結果
    if (Platform.OS === "ios") {
      await NfcManager.setAlertMessageIOS("讀取成功，即將跳轉至器材頁面");
    }
  } catch (ex) {
    console.log(ex);
  }

  // Step 4 取消連結本次讀取
  NfcManager.cancelTechnologyRequest().catch(() => 0);
  return nfcTag;
}

export default function App() {
  initNfc();
  readNdef();

  return (
    <View style={styles.container}>
      <Text>Test NFC@!</Text>
      <Button
        onPress={() => readNdef()}
        mode="contained"
        style={{ paddingTop: 32 }}
        title="Open NFC"
        color="#000"
      />
      <StatusBar style="auto" />
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
