import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
} from "react-native";
import Divider from "react-native-divider";
import { Button, Flex } from "@ant-design/react-native";
import { IconOutline } from "@ant-design/icons-react-native";
import DropShadow from "react-native-drop-shadow";

import styles from "./styles.js";

export default Workout = ({ navigation }) => {
  const moods = [{ icon: "meh" }, { icon: "frown" }, { icon: "smile" }];

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.mainView}>
        <Flex justify="center" align="center">
          <Flex style={styles.checkCircle} justify="center" align="center">
            <IconOutline
              name="check"
              size={28}
              color="#52C41A"
              style={styles.checkIcon}
            />
          </Flex>
        </Flex>
        <Divider orientation="center" style={styles.divider}>
          <Text style={styles.title}>訓練時數</Text>
        </Divider>
        <Text style={styles.timer}>00:00:00</Text>
        <Divider orientation="center">
          <Text style={styles.title}>訓練備註</Text>
        </Divider>
        <TextInput
          style={styles.noteInput}
          clearButtonMode="always" // for iOS only
          selectionColor="black"
          underlineColorAndroid="transparent"
          placeholder="請輸入訓練備註⋯⋯"
          place
          // value={this.state.value}
          // onChange={(value) => {
          //   this.setStat
          //     value,
          //   });
          // }}
        />
        <Divider orientation="center" style={styles.divider}>
          <Text style={styles.title}>目前感覺</Text>
        </Divider>
        <Flex justify="around" style={styles.moods}>
          {moods.map((mood, index) => {
            return (
              <IconOutline
                name={mood.icon}
                size={32}
                style={styles.mood} // 須因應點選的情緒圖示改變顏色
                key={index}
              />
            );
          })}
        </Flex>
      </KeyboardAvoidingView>
      <DropShadow styles={styles.buttonShadow}>
        <Button
          style={styles.completedButton}
          type="primary"
          onPress={() => {
            navigation.navigate("Workout");
          }}
        >
          結束訓練
        </Button>
      </DropShadow>
    </ScrollView>
  );
};
