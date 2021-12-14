import React, { Component } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image, TextInput } from "react-native";
import styles from "./styles.js";

import {
  Button,
  Flex,
  Icon,
  // IconFill, 
  // IconOutline,
  InputItem,
  List,
  SwipeAction,
  Provider,
  WingBlank,
  Modal,
} from "@ant-design/react-native";

export default Category = ({ navigation }) => {
  const right = [
    {
      text: <Icon name="delete" style={styles.deleteButton} />,
      onPress: () => console.log("delete"),
    },
  ];

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
            <Text style={styles.categoryInfo}>Category</Text>
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
              <List>
                {/* {_.map(renderData, (item, index) => ( */}
                <SwipeAction
                  autoClose
                  style={styles.swipeAction}
                  right={right}
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
                        {/* {++index} */}
                      </Button>
                    </View>
                    {/* {this.changeRenderKg(index)}
                  {this.changeRenderReps(index)} */}
                    <View>
                      <TextInput
                        style={styles.categoryInputButtonItem}
                        // value={this.state.number}
                        keyboardType="numeric"
                      />
                    </View>
                    <View>
                      <TextInput
                        style={styles.categoryInputButtonItem}
                        // value={this.state.number}
                        keyboardType="numeric"
                      />
                    </View>
                  </Flex>
                </SwipeAction>
                {/* ))} */}
              </List>
            </ScrollView>
            <View style={styles.timerBlock}>
              <View style={styles.rowContent}>
                <Flex.Item style={styles.timerStatus}>
                  <Image
                    style={styles.timerStatusButton}
                    /* rendering svg is different from web */
                    // source={timerStatus === '運動時間' ? `${images.workout}` : `${images.break}`}
                  />
                </Flex.Item>

                <Flex justify="center" align="center" style={styles.timer}>
                  <Text style={styles.timerText}>
                    <Text style={styles.minute}>00</Text>
                    <Text style={styles.semicolon}>:</Text>
                    <Text style={styles.second}>00</Text>
                  </Text>
                </Flex>

                <View style={styles.colContent}>
                  <Provider>
                    <Button style={(styles.startButton, styles.trainingButton)}>
                      開始/休息
                    </Button>
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
                    <Text style={styles.equipmentInfoName}>地點</Text>
                  </Flex>
                  <Flex
                    style={styles.equipmentInfoColContent}
                    align="center"
                    justify="start"
                  >
                    <Icon
                      style={styles.equipmentInfoIcon}
                      name="barcode"
                      size={14}
                    />
                    <Text style={styles.equipmentInfoName}>器材</Text>
                  </Flex>
                </View>

                <Flex.Item style={styles.colContent}>
                  <Button
                    style={(styles.completeButton, styles.trainingButton)}
                  >
                    完成訓練
                  </Button>
                </Flex.Item>
                <Flex.Item style={styles.colContent}>
                  <Button style={(styles.cancelButton, styles.trainingButton)}>
                    取消訓練
                  </Button>
                </Flex.Item>
              </View>
            </View>
          </View>
          {/* <Modal></Modal> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// };
