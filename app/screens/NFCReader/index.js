import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, SafeAreaView, Text, View } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { Button, Flex } from "@ant-design/react-native";
import { IconOutline } from "@ant-design/icons-react-native";
import Logo from "../../../assets/NFC.svg";
import Modal from "react-native-modal";

export default NFCReader = ({ navigation }) => {
  const [tag, setTag] = useState("init");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    NfcManager.cancelTechnologyRequest();
    setModalVisible(!isModalVisible);
  };

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
        toggleModal();
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
      // Step 3 解碼 NDEF 內容
      ndefURL = Ndef.uri.decodePayload(nfcTag.ndefMessage[0].payload);
      console.log("[NFC Read] [INFO] NdefRecords: ", ndefURL);
      // Step 4 結束連結本次讀取
      NfcManager.cancelTechnologyRequest();
      // Step 5 將讀取到的資料設定給 state
      setTag(ndefURL);
    } catch (ex) {
      console.log(
        "[NFC Read] [ERR] Ndef technology could not be requested",
        ex
      );
    }
    return nfcTag;
  }
  useEffect(() => {
    setTag("init");
  }, [navigation]);

  useEffect(() => {
    if (tag !== "init" && tag !== undefined) {
      setTag("init");
      navigation.navigate("Category", { url: tag });
    }
  }, [tag]);

  const styles = StyleSheet.create({
    title: {
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      fontStyle: "normal",
      fontSize: 20,
      lineHeight: 28,
      color: "rgba(0, 0, 0, 0.85)",
    },
    desc: {
      margin: 16,
      textAlign: "center",
      fontFamily: "Roboto_500Medium",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 22,
      color: "rgba(0, 0, 0, 0.45)",
    },
    buttonText: {
      fontFamily: "Roboto_700Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: 24,
      textAlign: "center",
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
      backgroundColor: "#fff",
    },
    nfc: {
      margin: 24,
      padding: 24,
      alignSelf: "center",
    },
    content: {
      padding: 24,
      alignItems: "center",
      alignItems: "stretch",
      backgroundColor: "#fff",
    },
    contentTitle: {
      fontFamily: "Roboto_700Bold",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 16,
      margin: 24,
      textAlign: "center",
    },
    contentDesc: {
      fontFamily: "Roboto_500Medium",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: 22,
      textAlign: "center",
      margin: 24,
    },
    cancelButton: {
      fontFamily: "Roboto_500Medium",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: 24,
      textAlign: "center",
      color: "# rgba(0, 0, 0, 0.85)",
      marginTop: 24,
    },
    view: {
      justifyContent: "flex-end",
      margin: 0,
    },
  });

  const links = [
    { title: "與上一組器材相同", icon: "copy" },
    { title: "無法感應 ? 試試 QR Code 掃描", icon: "qrcode" },
    { title: "我想手動選取", icon: "plus-circle" },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
        }}
      >
        <Logo style={styles.nfc} />
        <Text style={styles.title}>感應功能已就緒</Text>
        <Text style={styles.desc}>將手機靠近器材 NFC 標記以取得器材資訊</Text>
        <Button style={styles.buttonText} type="primary" onPress={() => readNdef()}>
          開啟感應
        </Button>
        <Modal isVisible={isModalVisible} style={styles.view}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>可進行掃描</Text>
            <Logo style={styles.nfc} />
            <Text style={styles.contentDesc}>請靠近器材讀取 NFC TAG</Text>
            <Button onPress={toggleModal} style={styles.cancelButton}>
              取消
            </Button>
          </View>
        </Modal>
      </View>
       <View style={{ flex: 1 }}>
        {links.map((link, index) => {
          return (
            <Flex justify="center" style={styles.gap} key={index}>
              <IconOutline name={link.icon} size={20} style={styles.icon} />
              <Text style={styles.link}>{link.title}</Text>
            </Flex>
          );
        })}
      </View>
    </View>
  );
};
