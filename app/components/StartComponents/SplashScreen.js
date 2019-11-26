/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  AsyncStorage
} from "react-native";

// Custom Created
import MainScreen from "../MainPageComponents/MainPage.js";
import LoginScreen from "./LoginScreen.js";
import { StackActions, NavigationActions } from "react-navigation";
//Fade In Image Animation

console.disableYellowBox = true;
class LogoLoader extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1]
                })
              }
            ]
          },
          this.props.style
        ]}
      />
    );
  }
}

// Splash Screen
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("inside componentDidMount of splash screen");
    //AsyncStorage.clear()
    this._checkLoginStatus();
  }

  _checkLoginStatus = async () => {
    console.log("checking logging status");
    try {
      let userData = await AsyncStorage.getItem("user");
      let access_token = await AsyncStorage.getItem("access_token");
      let img_url = await AsyncStorage.getItem("img_url");
      if (userData) {
        setTimeout(() => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "MainPage",
                params: {
                  user: userData,
                  fromScreen: "splash",
                  access_token: access_token,
                  img_url: img_url
                }
              })
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }, 1000);

        // this.props.navigation.navigate("MainPage", {
        //   user: userData,
        //   fromScreen: "splash",
        //   access_token:access_token
        // });
      } else {
        setTimeout(() => {
          // this.props.navigation.navigate("Login", {
          //   user: undefined
          // });

          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "Login",
                params: { user: undefined }
              })
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }, 1000);
      }
    } catch (error) {
      alert("Sorry Some Error Occured!! Please Try Again Later!!");
      alert(error);
      //await AsyncStorage.clear();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LogoLoader
          source={require("../../required_images/logo.png")}
          style={{ marginLeft: 190, marginTop: 350, height:80, width:80 }}
        />
        <Text style={styles.productName}>DEAL</Text>
        <Text style={styles.madeBy}>Under The Guidance Of Prof. Shishir Kumar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA500"
  },
  madeBy: {
    fontSize: 23,
    alignSelf: "center",
    bottom: "-42%",
    fontFamily: "San Francisco",
    fontWeight: "bold"
  },
  productName: {
    color: "white",
    top: 20,
    fontSize: 40,
    alignSelf: "center",
    fontWeight: "bold",
    fontStyle: "italic"
  }
});
