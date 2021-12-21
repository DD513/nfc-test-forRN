import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import styles from "./styles.js";
import Fintesslogo from "../../../assets/workout.svg";
import Breaklogo from "../../../assets/break.svg";
import _ from "lodash";

import {
  Button,
  Flex,
  Icon,
  InputItem,
  List,
  SwipeAction,
  Provider,
  WingBlank,
  Modal,
} from "@ant-design/react-native";

import DropShadow from "react-native-drop-shadow";

export default Category = ({ navigation }) => {
  const [buttonKey, setbuttonKey] = useState("開始");
  let [totalTime, setTotalTime] = useState(0);
  let [newKg, setNewKg] = useState(30);
  let [newReps, setNewReps] = useState(12);

  // stopwatch
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  // 後端假資料
  const res = {
    id: 1,
    category: "肩推",
    model: "MATRIX G7-S23",
    name: "Ultra 合式肩推訓練機",
    location: "Mono Gym - Taichung",
    menu: [
      {
        kg: 30,
        reps: 12,
      },
    ],
    video_url: "https://www.youtube.com/embed/uIJjC7zjJYc",
  };

  const { category, location, model, menu } = res;
  let [renderData, setRenderData] = useState(menu);
  let [allData, setAllData] = useState([]);

  const onPressStart = () => {
    let restSec, fitnessSec;
    switch (buttonKey) {
      case "開始":
        restSec = minutes * 60 + seconds;
        setTotalTime(totalTime + restSec);
        reset();
        setbuttonKey("休息");
        break;
      case "休息":
        fitnessSec = minutes * 60 + seconds;
        setTotalTime(totalTime + fitnessSec);
        setRenderData((renderData) => [
          ...renderData,
          {
            kg: newKg,
            reps: newReps,
          },
        ]);
        setAllData((allData) => [
          ...allData,
          {
            kg: newKg,
            reps: newReps,
            totalTime: totalTime,
          },
        ]);

        console.log("aaa", allData);
        reset();
        setbuttonKey("開始");
        break;
      default:
        break;
    }
    console.log("total", totalTime, "rest", restSec, "fintess", fitnessSec);
  };

  // const right = [
  //   {
  //     text: <Icon name="delete" style={styles.deleteButton} />,
  //     onPress: () => {
  //       setRenderData
  //     },
  //   },
  // ];

  /* bug happened! */
  // // // To avoid rendering text before the font is loaded, install the expo-app-loading package to use the <AppLoading /> component: https://stackoverflow.com/questions/33971221/google-fonts-in-react-native
  // let [fontsLoaded] = useFonts({
  //   Roboto_500Medium,
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.divBlock}>
          <Flex justify="between" align="center" style={styles.titleFrame}>
            <Text style={styles.categoryInfo}>
              {category !== "" ? category : "類別"}
            </Text>
            <Flex style={styles.categoryIcons} justify="between">
              <Icon
                style={styles.categoryIcon}
                size={36}
                color="#1890FF"
                name="bell"
              />
              <Icon
                style={styles.categoryIcon}
                size={36}
                color="#1890FF"
                name="play-circle"
              />
            </Flex>
          </Flex>

          <View style={styles.categoryList}>
            <Flex
              justify="between"
              align="center"
              direction="row"
              style={styles.categoryDynamic}
            >
              <Flex styles={styles.categoryCol}>
                <Text style={styles.fieldSubtitle}>
                  <Text style={styles.fieldChinese}>組數</Text>
                  <Text style={styles.fieldEnglish}>Sets</Text>
                </Text>
              </Flex>
              <Flex styles={styles.categoryCol}>
                <Text style={styles.fieldSubtitle}>
                  <Text style={styles.fieldChinese}>公斤</Text>
                  <Text style={styles.fieldEnglish}>KG</Text>
                </Text>
              </Flex>
              <Flex styles={styles.categoryCol}>
                <Text style={styles.fieldSubtitle}>
                  <Text style={styles.fieldChinese}>次數</Text>
                  <Text style={styles.fieldEnglish}>Reps</Text>
                </Text>
              </Flex>
            </Flex>
            <ScrollView style={styles.randerBlock}>
              {_.map(renderData, (item, index) => (
                <SwipeAction
                  key={index}
                  autoClose
                  style={styles.swipeAction}
                  right={[
                    {
                      text: <Icon name="delete" style={styles.deleteButton} />,
                      onPress: () => {
                        console.log("delete", index, renderData[index]);
                      },
                    },
                  ]}
                  onOpen={() => console.log("open")}
                  onClose={() => console.log("close")}
                >
                  <Flex
                    justify="between"
                    align="center"
                    direction="row"
                    style={styles.categoryInputRow}
                  >
                    <View>
                      <Button
                        style={styles.categoryInputButton}
                        type="ghost"
                        shape="circle"
                      >
                        {++index}
                      </Button>
                    </View>
                    {/* {this.changeRenderKg(index)}
                  {this.changeRenderReps(index)} */}
                    <View>
                      <TextInput
                        key={`kg${index}`}
                        style={styles.categoryInputButtonItem}
                        onChangeText={setNewKg}
                        defaultValue={item.kg.toString()}
                        keyboardType="numeric" // 更改這個只是增加使用者體驗，要使用toString讓他變成自串
                      />
                    </View>
                    <View>
                      <TextInput
                        key={`reps${index}`}
                        onChangeText={setNewReps}
                        style={styles.categoryInputButtonItem}
                        defaultValue={item.reps.toString()}
                        keyboardType="numeric"
                      />
                    </View>
                  </Flex>
                </SwipeAction>
              ))}
            </ScrollView>
            <DropShadow style={styles.timerBlockShadow}>
              <View style={styles.timerBlock}>
                <View style={styles.rowContent}>
                  <Flex.Item style={styles.timerStatus}>
                    {buttonKey === "開始" ? (
                      <Breaklogo width={64} height={64} />
                    ) : (
                      <Fintesslogo width={64} height={64} />
                    )}
                  </Flex.Item>

                  <Flex justify="center" align="center">
                    <Text style={styles.timer}>
                      {minutes > 9 ? minutes : "0" + minutes}:
                      {seconds > 9 ? seconds : "0" + seconds}
                    </Text>
                  </Flex>

                  <View style={styles.colContent}>
                    <Provider>
                      <DropShadow styles={styles.startButtonShadow}>
                        <Button
                          type={buttonKey === "開始" ? "primary" : "warning"}
                          style={styles.trainingButton}
                          onPress={onPressStart}
                        >
                          {buttonKey}
                        </Button>
                      </DropShadow>
                    </Provider>
                  </View>

                  <View style={(styles.rowContent, styles.equipmentInfo)}>
                    <Flex
                      style={styles.equipmentInfoColContent}
                      align="center"
                      justify="start"
                    >
                      <Icon
                        style={styles.equipmentInfoIcon}
                        name="aim"
                        size={14}
                      />
                      <Text style={styles.equipmentInfoName}>
                        {location !== "" ? location : "地點"}
                      </Text>
                    </Flex>
                    <Flex
                      style={(styles.equipmentInfoColContent, { marginTop: 8 })}
                      align="center"
                      justify="start"
                    >
                      <Icon
                        style={styles.equipmentInfoIcon}
                        name="barcode"
                        size={14}
                      />
                      <Text style={styles.equipmentInfoName}>
                        {model !== "" ? model : "器材"}
                      </Text>
                    </Flex>
                  </View>

                  <View style={styles.trainingButtonsRowContent}>
                    <Flex.Item style={styles.trainingButtonsColContent}>
                      <DropShadow styles={styles.trainingButtonShadow}>
                        <Button
                          style={[styles.completeButton, styles.trainingButton]}
                        >
                          完成訓練
                        </Button>
                      </DropShadow>
                    </Flex.Item>
                    <Flex.Item style={styles.colContent}>
                      <DropShadow styles={styles.trainingButtonShadow}>
                        <Button
                          style={[styles.cancelButton, styles.trainingButton]}
                          onPress={() => {
                            navigation.navigate("Workout");
                          }}
                        >
                          取消訓練
                        </Button>
                      </DropShadow>
                    </Flex.Item>
                  </View>
                </View>
              </View>
            </DropShadow>
          </View>
          {/* <Modal></Modal> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// };
