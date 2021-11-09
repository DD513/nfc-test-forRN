import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

export default function NFC({route}) {
  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
    console.log("start");
  }

  async function readMifare() {
    try {
      // 0. Request Mifare technology
      let reqMifare = await NfcManager.requestTechnology(
        NfcTech.MifareUltralight
      );
      if (reqMifare !== "MifareUltralight") {
        throw new Error(
          "[NFC Read] [ERR] Mifare technology could not be requested"
        );
      }

      // 1. Get NFC Tag information
      const nfcTag = await NfcManager.getTag();
      console.log("[NFC Read] [INFO] Tag: ", nfcTag);

      // 2. Read pages
      const readLength = 60;
      let mifarePages = [];
      const mifarePagesRead = await Promise.all(
        [...Array(readLength).keys()].map(async (_, i) => {
          const pageOffset = i * 4; // 4 Pages are read at once, so offset should be in steps with length 4
          let pages =
            await NfcManager.mifareUltralightHandlerAndroid.mifareUltralightReadPages(
              pageOffset
            );
          mifarePages.push(pages);
          console.log(`[NFC Read] [INFO] Mifare Page: ${pageOffset}`, pages);
          //await wait(500); // If Mifare Chip is to slow
        })
      );

      // 3. Success
      console.log("[NFC Read] [INFO] Success reading Mifare");

      // 4. Cleanup
      _cleanup();
    } catch (ex) {
      console.warn("[NFC Read] [ERR] Failed Reading Mifare: ", ex);
      _cleanup();
    }
  }

  function _cleanup() {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  initNfc();
  return (
    <View style={styles.container}>
      <Text>Test NFC@!NFC</Text>
      <Button
        onPress={() => readMifare()}
        mode="contained"
        style={{ paddingTop: 32 }}
        title="Open NFC"
        color="#000"
        accessibilityLabel="Learn more about this purple button"
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
