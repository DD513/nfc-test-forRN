import React from 'react';
import { StyleSheet,View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

// Dimensions 用於獲取裝置寬、高、解析度
const { width, height } = Dimensions.get("window");

export default function category({route,navigation}) {
    let path;
    let url = 'https://fintess-coach.herokuapp.com';
    if (route) {
        console.log(route);
        if (route.params) {
            if (route.params.id) {
                path = `/${route.name}?id=${route.params.id}`;
                url = url + path;
            } else if (route.params.url) {
                url = route.params.url;
                console.log(url);
            }
        } else if (route.url !== null) {
            url = route.url;
        }
    }
    console.log(123,url);
    if (url === 'https://fintess-coach.herokuapp.com') {
        if (route.canGoBack) {
            navigation.goBack();
        } else {
            navigation.navigate('NFCReader');
        }
    }
    return (
      <View style={styles.container}>
        <WebView
        style={{width: width, height: height}}
        source={{ uri: url }} 
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