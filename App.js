import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";

export default function App() {
  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
    console.log("start");
  }

  function readNdef() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise((resolve) => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound);
        NfcManager.setAlertMessageIOS("NDEF tag found");
        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }
  return (
    <View style={styles.container}>
      <Text>Test NFC@!</Text>
      <Button
        onPress={() => readNdef()}
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
