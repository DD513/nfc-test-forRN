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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginHorizontal: 16,
    },
    baseText: {
      textAlign: "center",
      fontFamily: "Roboto",
      fontSize: 20,
      color: "rgba(0, 0, 0, 0.85)",
    },
    title: {
      marginVertical: 8,
    },
    desc: {
      textAlign: "center",
      fontSize: 14,
      lineHeight: 22,
      color: "rgba(0, 0, 0, 0.45)",
    },
    nfcButton: {
      height: 140,
      // borderRadius: "2px",
      // margin: "16px 0px",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        <Text style={styles.title}>感應功能已就緒 {"\n"}</Text>
        <Text style={styles.desc} numberOfLines={5}>
          {"\n"}
          請點擊【開啟感應】並靠近設備
          {"\n"}
        </Text>
      </Text>
      <Button
        title="開啟感應"
        style={styles.nfcButton}
        onPress={() => readNdef()}
      />
    </View>
  );
}
