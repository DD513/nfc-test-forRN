import React from "react";
import { StyleSheet, SafeAreaView, View, Text, TextInput } from "react-native";
import Divider from "react-native-divider";
import { Button, Flex } from "@ant-design/react-native";
import { IconOutline } from "@ant-design/icons-react-native";
import DropShadow from "react-native-drop-shadow";
import { layout } from "../../../util/layout";

export default Workout = ({ navigation }) => {
  const moods = [{ icon: "meh" }, { icon: "frown" }, { icon: "smile" }];

  return (
    <View style={styles.container}>
      <Flex justify="center">
        <Flex style={styles.checkCircle} justify="center" align="center">
          <IconOutline
            name="check"
            size={28}
            color="#52C41A"
            style={styles.checkIcon}
          />
        </Flex>
      </Flex>
      <Divider orientation="center">
        <Text style={styles.title}>訓練時數</Text>
      </Divider>
      <Text style={styles.time}>00:00:00</Text>
      <Divider orientation="center">
        <Text style={styles.title}>訓練備註</Text>
      </Divider>
      <TextInput
        style={styles.timeInput}
        // value={this.state.value}
        // onChange={(value) => {
        //   this.setState({
        //     value,
        //   });
        // }}
      />
      <Divider orientation="center">
        <Text style={styles.title}>目前感覺</Text>
      </Divider>
      <Flex justify="around">
        {moods.map((mood, index) => {
          return (
            <IconOutline
              name={mood.icon}
              size={32}
              style={styles.icon}
              key={index}
            />
          );
        })}
      </Flex>
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
    </View>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: 28,
    height: 28,
    textAlign: "center",
    padding: 0,
  },
  checkCircle: {
    width: 120,
    height: 120,
    textAlign: "center",
    padding: 20,
    borderWidth: 7, // "14" from css is too thick
    borderColor: "#52C41A",
    borderRadius: 90,
  },
  title: {
    width: 64,
    height: 24,
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(0, 0, 0, 0.85)",
  },
  time: {
    height: 28,
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    color: "rgba(0, 0, 0, 0.85)",
    margin: 0,
    padding: 0,
  },
  timeInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 2,
  },
  buttonShadow: {
    /* Different from web:
    boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)", */
    shadowColor: "rgba(217, 217, 217, 0.043)", //  rgba(0, 0, 0, 0.043) is too dark in Android, use this instead
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    ...layout.padding(8, 16),
    height: 40,
    borderRadius: 2,
  },
  mood: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: "#1890FF",
  },
  gap: {
    margin: 8,
    height: 32,
  },
  icon: {
    color: "rgba(0, 0, 0, 0.25)",
    margin: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  cancelButton: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "# rgba(0, 0, 0, 0.85)",
    marginTop: 24,
  },
  buttonShadow: {
    /* web:
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016); */
    /* for Android */
    shadowColor: "rgba(0, 0, 0, 0.016);",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  completedButton: {},
});
