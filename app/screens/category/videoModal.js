import React from "react";
import { Text, View } from "react-native";
import YouTube from "react-native-youtube";
export default videoModal = (visible, onClose) => {
  return (
    <View style={{ paddingVertical: 20 }}>
      <Text style={{ textAlign: "center" }}>Content...</Text>
      <Text style={{ textAlign: "center" }}>Content...</Text>
      <YouTube
        videoId="qiYAjdOW2t4" // The YouTube video ID
        style={{ alignSelf: "stretch", height: 300 }}
      />
    </View>
  );
};
