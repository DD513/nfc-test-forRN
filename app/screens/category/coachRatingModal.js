import React from "react";
import { StyleSheet, Dimensions, View, Image, Text } from "react-native";
import { Modal, WhiteSpace, Flex, Icon } from "@ant-design/react-native";
import { IconFill } from "@ant-design/icons-react-native";

export default coachRatingModal = (props) => {
  const handleClose = () => props.setCoachRatingModal(false);
  const { width } = Dimensions.get("window");
  const starRatings = [1, 2, 3, 4, 5];
  const styles = StyleSheet.create({
    modal: {
      width: width - 48,
      margin: 0,
      padding: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderRadius: 2,
    },
    coachInfo: {
      height: 318,
      borderBottomColor: "#e8e8e8",
      borderBottomWidth: 1,
      borderTopColor: "#e8e8e8",
      borderTopWidth: 1,
      marginHorizontal: -20,
    },
    coachPhoto: {
      marginTop: 24,
      width: 142.62,
      height: 200,
    },
    coachName: {
      fontFamily: "Roboto_500Medium",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: 20,
      lineHeight: 28,
      color: "#000000",
      marginVertical: 10,
    },
    demoEquipmentName: {
      fontFamily: "Roboto_500Medium",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: 22,
      color: "rgba(0, 0, 0, 0.85)",
      marginBottom: 24,
    },
    footer: {
      margin: 0,
      height: 51,
      // borderWidth: 1,
      // paddingVertical: 10,
    },
    stars: {
      width: 132,
      height: 31,
      // borderWidth: 1,
    },
    star: {
      width: 20,
      margin: 0,
      padding: 0,
    },
  });
  return (
    <Modal
      style={styles.modal}
      title="教學示範回饋"
      transparent
      onClose={() => handleClose()}
      visible={props.visible}
      closable
    >
      <WhiteSpace size="xl" />
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={styles.coachInfo}
      >
        <Image style={styles.coachPhoto} source={props.coachPhoto} />
        <Text style={styles.coachName}>{props.coachName}</Text>
        <Text style={styles.demoEquipmentName}>
          示範器材:{props.demoEquipmentName}
        </Text>
      </Flex>
      <Flex justify="center" align="end" style={styles.footer}>
        <Flex justify="between" align="center" style={styles.stars}>
          {starRatings.map((star, index) => {
            return (
              <IconFill
                key={index}
                name="star"
                size={20}
                color="rgba(0, 0, 0, 0.06)"
                style={styles.star} // 須因應點選的圖示改變顏色
              />
            );
          })}
        </Flex>
      </Flex>
    </Modal>
  );
};
