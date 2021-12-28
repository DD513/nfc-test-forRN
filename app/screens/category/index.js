import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";
import styles from "./styles.js";
import FitnessIcon from "../../../assets/workout.svg";
import BreakIcon from "../../../assets/break.svg";
import _ from "lodash";
import {
  Button,
  Flex,
  Icon,
  SwipeAction,
  Provider,
  Modal,
  Toast,
} from "@ant-design/react-native";
import VideoModal from "./videoModal";
import DropShadow from "react-native-drop-shadow";

export default Category = ({ navigation }) => {
  const [videoModal, setVideoModal] = useState(false);
  const [buttonKey, setButtonKey] = useState("開始");
  let [totalTime, setTotalTime] = useState(0);
  let [newKg, setNewKg] = useState(30);
  let [newReps, setNewReps] = useState(12);
  const [disabled, setDisabled] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  let [deleteSets, setDeleteSets] = useState(null);

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
        setButtonKey("休息");
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
        setButtonKey("開始");
        break;
      default:
        break;
    }
  };

  changeRenderKg = (index) => {
    if (renderData.length === index) {
      renderData[index - 1].kg = newKg;
    }
  };
  changeRenderReps = (index) => {
    if (renderData.length === index) {
      renderData[index - 1].reps = newReps;
    }
  };

  deleteModalClick = (index) => {
    setDeleteSets(index);
    setDeleteModal(true);
  };

  deleteRenderData = (index) => {
    renderData.splice(index - 1, 1);
    allData.splice(index - 1, 1);
    Toast.success({
      content: `第${index}筆紀錄已刪除`,
      stackable: false,
      duration: 1,
    });
    console.log("56", renderData, "分隔線", allData);
  };

  deleteModalOnClose = () => {
    setDeleteModal(false);
  };

  /* bug happened! */
  // // // To avoid rendering text before the font is loaded, install the expo-app-loading package to use the <AppLoading /> component: https://stackoverflow.com/questions/33971221/google-fonts-in-react-native
  // let [fontsLoaded] = useFonts({
  //   Roboto_500Medium,
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.divBlock}>
        <View style={styles.divBlock}>
          <ScrollView style={styles.renderBlock}>
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
                  onPress={() => setVideoModal(true)}
                />
              </Flex>
            </Flex>

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

            {_.map(renderData, (item, index) => (
              <SwipeAction
                key={index}
                autoClose
                style={styles.swipeAction}
                right={[
                  {
                    text: <Icon name="delete" style={styles.deleteButton} />,
                    onPress: () => {
                      deleteModalClick(index);
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
                  {changeRenderKg(index)}
                  {changeRenderReps(index)}
                  <View>
                    <TextInput
                      key={`kg${index}`}
                      style={
                        renderData.length === index
                          ? styles.categoryInputButtonItem
                          : styles.categoryInputButtonItemDisabled
                      }
                      onChangeText={setNewKg}
                      defaultValue={item.kg.toString()}
                      editable={
                        renderData.length === index ? !disabled : disabled
                      }
                      selectTextOnFocus={
                        renderData.length === index ? !disabled : disabled
                      }
                      keyboardType="numeric" // 更改這個只是增加使用者體驗，要使用toString讓他變成自串
                    />
                  </View>
                  <View>
                    <TextInput
                      key={`reps${index}`}
                      onChangeText={setNewReps}
                      style={
                        renderData.length === index
                          ? styles.categoryInputButtonItem
                          : styles.categoryInputButtonItemDisabled
                      }
                      defaultValue={item.reps.toString()}
                      editable={
                        renderData.length === index ? !disabled : disabled
                      }
                      selectTextOnFocus={
                        renderData.length === index ? !disabled : disabled
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </Flex>
              </SwipeAction>
            ))}
          </ScrollView>

          <View style={styles.categoryStatusBlock}>
            <DropShadow style={styles.timerBlockShadow}>
              <View style={styles.timerBlock}>
                <View style={styles.rowContent}>
                  <Flex.Item style={styles.timerStatus}>
                    {buttonKey === "開始" ? (
                      <BreakIcon width={64} height={64} />
                    ) : (
                      <FitnessIcon width={64} height={64} />
                    )}
                  </Flex.Item>

                  <>
                    <Flex justify="center" align="center">
                      <Text style={styles.timer}>
                        {minutes > 9 ? minutes : "0" + minutes}:
                        {seconds > 9 ? seconds : "0" + seconds}
                      </Text>
                    </Flex>
                  </>

                  <View style={styles.colContent}>
                    <DropShadow styles={styles.startButtonShadow}>
                      <Button
                        type={buttonKey === "開始" ? "primary" : "warning"}
                        style={
                          (styles.trainingButton,
                          {
                            /* for iOS */
                            shadowColor: "rgba(0, 0, 0, 0.043)",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 0,
                          })
                        }
                        onPress={onPressStart}
                      >
                        {buttonKey}
                      </Button>
                    </DropShadow>
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
                    <DropShadow styles={styles.trainingButtonShadow}>
                      <Button
                        style={[styles.completeButton, styles.trainingButton]}
                      >
                        完成訓練
                      </Button>
                    </DropShadow>
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
                  </View>
                </View>
              </View>
            </DropShadow>
          </View>
          <VideoModal
            visible={videoModal}
            setVideoModal={setVideoModal}
            videoId={"qiYAjdOW2t4"}
            title={"肩推"}
          />
          <Provider>
            <Modal
              title={`確定要刪除第${deleteSets}筆紀錄嗎？`}
              transparent
              onClose={deleteModalOnClose}
              maskClosable
              visible={deleteModal}
              footer={[
                { text: "Cancel", onPress: () => deleteModalOnClose },
                { text: "Ok", onPress: () => deleteRenderData(deleteSets) },
              ]}
            >
              <View style={{ paddingVertical: 20 }}>
                <Text style={{ textAlign: "center" }}>
                  注意！刪除後無法回覆紀錄
                </Text>
              </View>
            </Modal>
          </Provider>
        </View>
      </View>
    </SafeAreaView>
  );
};
// };
