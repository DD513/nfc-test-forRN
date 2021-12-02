import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { Button, Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

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
    container: {
      flex: 1,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
      textAlign: "center",
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
  });
  return (
    <ScrollView
      // style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <WingBlank style={{ marginBottom: 5 }}>
        <Flex
          justify="between"
          align="stretch"
          direction="column"
          justify="around"
        >
          <Flex.Item>
            <Text style={styles.title}>感應功能已就緒</Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.desc}>請點擊【開啟感應】並靠近設備</Text>
          </Flex.Item>
          <Flex.Item>
            <Button type="primary" onPress={() => readNdef()}>
              開啟感應
            </Button>
          </Flex.Item>
        </Flex>
      </WingBlank>
      <Flex justify="between" align="stretch"></Flex>
      {/* 
      <Text style={styles.baseText}>
        <Text style={styles.title}>感應功能已就緒 {"\n\n"}</Text>
        <Text style={styles.desc}>請點擊【開啟感應】並靠近設備 {"\n\n"}</Text>
      </Text>
      <Button
        title="開啟感應"
        style={styles.nfcButton}
        onPress={() => readNdef()}
      />
      <Button type="primary">primary</Button>
      <Text
        style={styles.link}
        onPress={() => console.log("[CLICK] open latest equipment")}
      >
        與上一組器材相同
      </Text>
      <Text
        style={styles.link}
        onPress={() => console.log("[CLICK] open qrcode")}
      >
        無法感應 ? 試試 QR Code 掃描
      </Text>
      <Text
        style={styles.link}
        onPress={() => console.log("[CLICK] open manual list")}
      >
        我想手動選取
      </Text>
       */}
    </ScrollView>
  );
}
