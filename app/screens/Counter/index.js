import React, { Component } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  console.log("State:");
  console.log(state);

  // Redux Store --> Component
  return {
    // counter: state.counterReducer.counter,
    counter: state.counter.counter,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Increase Counter
    reduxIncreaseCounter: () =>
      dispatch({
        type: "INCREASE_COUNTER",
        value: 1,
      }),
    // Decrease Counter
    reduxDecreaseCounter: () =>
      dispatch({
        type: "DECREASE_COUNTER",
        value: 1,
      }),
  };
};

// Screen: Counter
const Counter = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.counterTitle}>Counter</Text>

      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={props.reduxIncreaseCounter}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.counterText}>{props.counter}</Text>

        <TouchableOpacity onPress={props.reduxDecreaseCounter}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  counterTitle: {
    fontFamily: "System",
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
  },
  counterText: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: "400",
    color: "#000",
  },
  buttonText: {
    fontFamily: "System",
    fontSize: 50,
    fontWeight: "300",
    color: "#007AFF",
    marginLeft: 40,
    marginRight: 40,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
