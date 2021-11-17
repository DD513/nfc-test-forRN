import React from 'react';
import { StyleSheet,View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

// Dimensions 用於獲取裝置寬、高、解析度
const { width, height } = Dimensions.get("window");

export default function Webview({route}) {
    const { params } = route;
    return (
      <View style={styles.container}>
        <WebView
        style={{width: width, height: height}}
        source={{ uri: 'http://192.168.168.50:3000/'+params.url }} 
        postMessage={params.url}
        injectedJavaScript={`alert(123)`}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
});