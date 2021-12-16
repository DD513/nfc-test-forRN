import { StyleSheet, Dimensions } from "react-native";
import { layout } from "../../../util/layout";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  titleFrame: {
    height: 78,
    ...layout.padding(16, 16, 16, 16),
  },
  categoryInfo: {
    ...layout.padding(0, 0, 0, 0),
    height: 46,
    left: 0,
    right: 0,
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontSize: 38,
    lineHeight: 46,
    color: "rgba(0, 0, 0, 0.85)",
    ...layout.margin(0, 0, 0, 0),
  },
  categoryIcons: {
    height: 36,
    width: 88,
    alignItems: "baseline",
  },
  categoryIcon: {
    ...layout.margin(0, 0, 0, 0),
    // verticalAlign: 0,
  },
  categoryList: {},
  categoryDynamic: {
    ...layout.padding(8, 24),
    height: 40,
    left: 0,
    top: 0,
  },
  categoryCol: {
    width: 64,
    height: 24,
    left: 24,
    top: "50%" - 24 / 2,
  },
  fieldSubtitle: {
    display: "flex",
    justifyContent: "space-between",
    ...layout.padding(0),
  },
  fieldChinese: {
    width: 32,
    height: 24,
    left: 0,
    top: 0,
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(0, 0, 0, 0.85)",
  },
  fieldEnglish: {
    width: 28,
    height: 22,
    left: 0,
    top: 0,
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(0, 0, 0, 0.45)",
  },
  randerBlock: {
    height: screenHeight - 472,
    // overflow: "auto",
  },
  swipeAction: {
    height: 56,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  categoryInputRow: {
    width: "100%",
    ...layout.padding(8, 24),
  },
  categoryInputButton: {
    width: 40,
    height: 40,
    // left: 24,
    // top: 8,
    borderRadius: 100,
  },
  categoryInputButtonItem: {
    /* different from web! */
    textAlign: "center",
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  timerBlock: {
    backgroundColor: "#ffffff",
    /* Different from web! */
    // boxShadow: "0px -10px 10px rgba(0, 0, 0, 0.05)",
    left: 0,
    bottom: 0,
    width: "100%",
    // height: 354,
    ...layout.padding(16),
  },
  rowContent: {
    textAlign: "center",
    // alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  timerStatus: {
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  timerStatusButton: {
    width: 64,
    height: 64,
  },
  timer: {
    ...layout.margin(8, 0),
    fontSize: 38,
    lineHeight: 46,
    height: 46,
  },
  timerText: {
    // position: "static", // not supported in RN
    // width: 97, // can't show full time in RN
    height: 46,
    top: 0,
    ...layout.margin(10, 0),
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    // fontWeight: 500, // not supported in RN
    fontSize: 38,
    lineHeight: 46,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.85)",
  },
  minute: {
    width: 42.28,
  },
  semicolon: {
    width: 10.56,
  },
  second: {
    width: 42.28,
  },
  startButton: {
    marginBottom: 8,
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
  },
  trainingButton: {
    marginBottom: 8,
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
  },
  equipmentInfo: {
    width: "100%",
    height: 52,
    ...layout.padding(0, 8),
  },
  equipmentInfoColContent: {
    height: 22,
  },
  equipmentInfoName: {
    ...layout.margin(0, 4),
    height: 22,
    left: 18,
    top: 0,
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(0, 0, 0, 0.85)",
    // textAlign: "start",
  },
  equipmentInfoIcon: {
    alignItems: "baseline",
    // ...layout.margin("auto"),
  },
  completeButton: {
    ...layout.margin(8, 0, 0, 0),
  },
  cancelButton: {},
});
