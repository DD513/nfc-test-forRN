import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { StyleSheet, Dimensions } from "react-native";
import { Modal, WhiteSpace } from "@ant-design/react-native";

export default videoModal = (props) => {
  const handleClose = () => props.setVideoModal(false);
  const { width } = Dimensions.get("window");
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
      <YoutubePlayer videoId={props.videoId} height={width * 0.52} />
    </Modal>
  );
};
