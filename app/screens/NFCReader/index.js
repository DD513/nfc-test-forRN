import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";

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
    link: {
      color: "rgba(0, 0, 0, 0.45)",
      textAlign: "center",
      padding: 8,
      margin: 8,
    },
    gap: {
      marginTop: 4,
      paddingTop: 4,
    },
  });
  return (
    <ScrollView
      style={{ flex: 1 }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <WingBlank>
        <Flex direction="column" justify="center" align="stretch">
          <Flex.Item>
            <Text style={styles.gap}>项目在主轴上的对齐方式</Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.gap}>项目在主轴上的对齐方式</Text>
          </Flex.Item>
          <Flex.Item>
            <Button type="primary" onPress={() => readNdef()}>
              開啟感應
            </Button>
          </Flex.Item>
        </Flex>
      </WingBlank>
    </ScrollView>
  );
}
