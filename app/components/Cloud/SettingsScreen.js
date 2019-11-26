/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loader}
          hidesWhenStopped
          color={Colors.blue800}
        />
        <Text
          style={{
            top: "46%",
            padding: 10,
            elevation: 5,
            fontSize: 20,
            textAlign: "center"
          }}
        >
          Under Development!! Stay Tuned!!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    top: "45%"
  }
});
