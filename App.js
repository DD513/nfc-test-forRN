import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

import NfcManager, { NfcTech } from "react-native-nfc-manager";

const readNdef = () => {
  NfcManager.start();
  console.log("*** START NDEF READING ***");
  try {
    //call api
    // 0. Request Ndef technology
    let reqNdef = NfcManager.requestTechnology(NfcTech.Ndef);
    if (reqNdef !== "Ndef") {
      throw new Error(
        "[NFC Read] [ERR] Ndef technology could not be requested"
      );
    }

    // 1. Get NFC Tag information
    const nfcTag = NfcManager.getTag();
    console.log("[NFC Read] [INFO] Tag: ", nfcTag);

    // 2. Read pages

    const NdefMessage = NfcManager.ndefHandler.getNdefMessage();
    console.log("[NFC Read] [INFO] getNdefMessage ", NdefMessage);

    const NdefStatus = NfcManager.ndefHandler.getNdefStatus();
    console.log("[NFC Read] [INFO] NdefStatus ", NdefStatus);

    // 3. Success

    // 4. Cleanup
    _cleanup();

    return console.log("[NFC Read] [INFO] Success reading Ndef ");
  } catch (ex) {
    console.warn("[NFC Read] [ERR] Failed Reading Ndef: ", ex);
    _cleanup();
  }
};
function _cleanup() {
  NfcManager.cancelTechnologyRequest().catch(() => 0);
}

export default function App() {
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
