import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { Button, Flex } from "@ant-design/react-native";
import { IconOutline } from "@ant-design/icons-react-native";

import Logo from "../../../assets/NFC.svg";

export default function NFCReader({ navigation }) {
  const [tag, setTag] = useState("init");

  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  async function readNdef() {
    await initNfc();
    let nfcTag = null;
    let ndefURL = null;
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
        let reqNdef = await NfcManager.requestTechnology(NfcTech.Ndef);
        if (reqNdef !== "Ndef") {
          throw new Error(
            "[NFC Read] [ERR] Ndef technology could not be requested"
          );
        }
      }
      // Step 2 取得 TAG 內容
      nfcTag = await NfcManager.getTag();
      console.log("[NFC Read] [INFO] Tag: ", nfcTag);
      // Step 2.5 解碼 NDEF 內容
      ndefURL = Ndef.uri.decodePayload(nfcTag.ndefMessage[0].payload);
      console.log("[NFC Read] [INFO] NdefRecords: ", ndefURL);
      // Step 4 結束連結本次讀取
      NfcManager.cancelTechnologyRequest();
      // Step 3 將讀取到的資料設定給 state

      setTag(ndefURL);
    } catch (ex) {
      console.log("123", ex);
    }
    return nfcTag;
  }
  useEffect(() => {
    setTag("init");
  }, [navigation]);

  useEffect(() => {
    if (tag !== "init" && tag !== undefined) {
      setTag("init");
      navigation.navigate("category", { url: tag });
    }
  }, [tag]);

  const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontSize: 24,
    },
    desc: {
      margin: 16,
      textAlign: "center",
      lineHeight: 22,
      color: "rgba(0, 0, 0, 0.45)",
    },
    link: {
      textAlign: "center",
      color: "#1890FF",
    },
    gap: {
      margin: 8,
    },
    icon: {
      color: "#1890FF",
      margin: 8,
    },
    container: {
      flex: 1,
      padding: 20,
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "stretch",
    },
    nfc: {
      margin: 24,
      padding: 24,
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 4,
          justifyContent: "center",
        }}
      >
        <Logo style={styles.nfc} />
        <Text style={styles.title}>感應功能已就緒</Text>
        <Text style={styles.desc}>將手機靠近器材 NFC 標記以取得器材資訊</Text>
        <Button type="primary" onPress={() => readNdef()}>
          開啟感應
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <Flex justify="center" style={styles.gap}>
          <IconOutline name="copy" size={20} style={styles.icon} />
          <Text style={styles.link}>與上一組器材相同</Text>
        </Flex>
        <Flex justify="center" style={styles.gap}>
          <IconOutline name="qrcode" size={20} style={styles.icon} />
          <Text style={styles.link}>無法感應 ? 試試 QR Code 掃描</Text>
        </Flex>
        <Flex justify="center" style={styles.gap}>
          <IconOutline name="plus-circle" size={20} style={styles.icon} />
          <Text style={styles.link}> 我想手動選取</Text>
        </Flex>
      </View>
    </View>
  );
}
