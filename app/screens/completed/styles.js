import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  mainView: {
    flex: 1,
    padding: 0,
    height: 617,
  },
  checkCircle: {
    width: 120,
    height: 120,
    textAlign: "center",
    // marginTop: "25%",
    // marginBottom: "10%",
    marginTop: 62.5,
    marginBottom: 31.25,
    padding: 20,
    borderWidth: 7, // "14" from css is too thick
    borderColor: "#52C41A",
    borderRadius: 90,
  },
  checkIcon: {
    width: 28,
    height: 28,
    textAlign: "center",
    padding: 0,
  },
  divider: {
    margin: 0,
    padding: 0,
  },
  title: {
    margin: 0,
    padding: 0,
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
  timer: {
    height: 28,
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    color: "rgba(0, 0, 0, 0.85)",
    marginVertical: 32,
  },
  noteInput: {
    marginVertical: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: 44,
  },
  moods: {
    marginTop: 32,
  },
  mood: {
    color: "rgba(0, 0, 0, 0.25)",
    margin: 8,
  },
  moodSelected: {
    color: "#1890FF",
    backgroundColor: "#E6F7FF",
    margin: 8,
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
  completedButton: {
    marginVertical: 16,
    height: 40,
    borderWidth: 1,
    borderRadius: 2,
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
