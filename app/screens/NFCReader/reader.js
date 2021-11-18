import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  Linking,
} from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

export default function App() {
  const [tag, setTag] = useState("Hello World");
  const [count, setCount] = useState(0);

  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  async function readNdef() {
    await initNfc();
    let nfcTag;
    try {
      // Step 1 依照裝置個別讀取技術內容
      if (Platform.OS === "ios") {
        let reqNdef = await NfcManager.requestTechnology(NfcTech.Ndef, {
          alertMessage: "請靠近器材讀取 NFC TAG",
        });
        if (reqNdef !== "Ndef") {
          throw new Error(
            "[NFC Read] [ERR] Ndef technology could not be requested"
          );
        }
      } else {
        let reqNdef = await NfcManager.requestTechnology(
          NfcTech.Ndef,
        );
        if (reqNdef !== "Ndef") {
          throw new Error(
            "[NFC Read] [ERR] Ndef technology could not be requested"
          );
        }
      }
      // Step 2 取得 TAG 內容
      nfcTag = await NfcManager.getTag();
      console.log("[NFC Read] [INFO] Tag: ", nfcTag);
      // Step 3 讀取 NDEF 內容
      // let ndefMessage = await NfcManager.getNdefMessage();
      console.log("[NFC Read] [INFO] NdefMessage: ", nfcTag.ndefMessage);
      // Step 4 解碼 NDEF 內容
      let ndefRecords0 = Ndef.decodeMessage(nfcTag.ndefMessage[0].payload);
      let ndefRecords1 = Ndef.text.decodePayload(nfcTag.ndefMessage[0].payload);
      let ndefRecords2 = Ndef.uri.decodePayload(nfcTag.ndefMessage[0].payload);
      let ndefRecords3 = Ndef.isType(nfcTag.ndefMessage);
      console.log("[NFC Read] [INFO] NdefRecords: ", ndefRecords0);
      console.log("[NFC Read] [INFO] NdefRecords: ", ndefRecords1);
      console.log("[NFC Read] [INFO] NdefRecords: ", ndefRecords2);
      console.log("[NFC Read] [INFO] NdefRecords: ", ndefRecords3);

    } catch (ex) {
      console.log(ex);
    }

    // Step 3 結束連結本次讀取
    NfcManager.cancelTechnologyRequest().catch(() => 0);

    return nfcTag;
  }

  readNdef();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginHorizontal: 16,
    },
    baseText: {
      textAlign: "center",
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
    qrcodeButton: {
      backgroundColor: "#fff",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        <Text style={styles.title}>感應功能已就緒 {"\n\n"}</Text>
        <Text style={styles.desc}>請點擊【開啟感應】並靠近設備 {"\n\n"}</Text>
        <Text style={styles.desc}>
          {tag}
          {count}
          {"\n\n"}
        </Text>
      </Text>
      <Button
        title="開啟感應"
        style={styles.nfcButton}
        onPress={() => readNdef()}
      />

      <Button
        title="測試"
        style={styles.qrcodeButton}
        onPress={() => setCount(count + 1)}
      />
      <Button
        title="無法感應 ? 試試 QR Code 掃描"
        style={styles.qrcodeButton}
        onPress={() => console.log("open qrcode")}
      />
    </View>
  );
}