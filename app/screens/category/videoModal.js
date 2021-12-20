import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { StyleSheet, View, Dimensions } from "react-native";
import { Modal, Flex, WhiteSpace } from "@ant-design/react-native";

export default videoModal = (props) => {
  const handleClose = () => props.setVideoModal(false);
  const { height, width } = Dimensions.get("window");
  const styles = StyleSheet.create({
    modal: {
      width: width,
      margin: 0,
      padding: 0,
    },
  });
  return (
    <Modal
      style={styles.modal}
      title={props.title}
      transparent
      onClose={() => handleClose()}
      visible={props.visible}
      closable
    >
      <WhiteSpace size="xl" />
      <YoutubePlayer videoId={props.videoId} height={height / 3} />
    </Modal>
  );
};
