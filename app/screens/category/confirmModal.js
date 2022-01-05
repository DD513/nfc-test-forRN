import React from "react";
import { StyleSheet, Text } from "react-native";
import { Modal } from "@ant-design/react-native";

export default confirmModal = (props) => {
  const handleClose = () => props.setModal(false);

  const styles = StyleSheet.create({
    desc: {
      textAlign: "center",
      color: "#888",
      margin: 16,
      padding: 16,
    },
  });
  return (
    <Modal
      title={props.title}
      transparent
      onClose={() => handleClose()}
      visible={props.visible}
      maskClosable
      footer={[
        { text: "Cancel", onPress: () => props.setModal(false) },
        { text: "Ok", onPress: props.confirm },
      ]}
    >
      <Text style={styles.desc}>{props.desc}</Text>
    </Modal>
  );
};
