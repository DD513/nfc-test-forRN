import React from 'react';
import { StyleSheet,View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

// Dimensions 用於獲取裝置寬、高、解析度
const { width, height } = Dimensions.get("window");

export default function Filter({route}) {
    const { params } = route.params;
    return (
      <View style={styles.container}>
        <WebView
        style={{width: width, height: height}}
        source={{ uri: 'https://fintess-coach.herokuapp.com/'+params.url }} 
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