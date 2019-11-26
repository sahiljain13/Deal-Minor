import React, { Component } from "react";
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
  Linking,
  Image,
  PermissionsAndroid,
  BackHandler
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Container, Footer, FooterTab } from "native-base";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Button } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";
import RNExitApp from "react-native-exit-app";
import Geolocation from "react-native-geolocation-service";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

// Custom Created
import MainScreen from "../MainPageComponents/MainPage.js";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: true,
      closeInterval: 2000,
      loginActive: true,
      lat: "",
      long: "",
      altitude: ""
    };
  }

  componentDidMount() {
    this.loadInitialState();

  }

  loadInitialState() {
    var value = this.props.navigation.state.user;
    if (value != null) {
      //this.props.navigation.navigate("MainPage");
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "MainPage" })]
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      console.log("No Logged In User");
      this.setState({ loading: false });
    }
  }

  openUrl = () => {
  var url = "https://github.com/sahiljain13/Deal-Minor";
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL: " + url);
    }
  });
};

  onLoginPress() {
    var username = this.state.username;
    var password = this.state.password;
    this.setState({ loading: true });
    AsyncStorage.setItem("user", this.state.username);
    AsyncStorage.setItem("access_token", "abcd");
    AsyncStorage.setItem(
      "refresh_token",
      "abcd"
    );
    AsyncStorage.setItem("img_url", "https://img.icons8.com/plasticine/2x/user.png");


    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "MainPage",
          params: {
            access_token: "abcd",
            user: this.state.username,
            img_url: "https://img.icons8.com/plasticine/2x/user.png"
          }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);

    this.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "Successfully Logged In!!"
    );
  }

  set_username = e => {
    this.setState({ username: e });

    if (this.state.password.length > 0 && this.state.username.length > 0) {
      this.setState({ loginActive: false });
    } else if (
      this.state.password.length == 0 ||
      this.state.username.length == 0
    ) {
      this.setState({ loginActive: true });
    }
  };

  set_password = e => {
    this.setState({ password: e });
    if (this.state.password.length > 0 && this.state.username.length > 0) {
      this.setState({ loginActive: false });
    } else if (
      this.state.password.length == 0 ||
      this.state.username.length == 0
    ) {
      this.setState({ loginActive: true });
    }
  };


  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loader}
          hidesWhenStopped
          color={Colors.blue800}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#FFA500" }}>
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
              <DropdownAlert
                ref={ref => (this.dropDownAlertRef = ref)}
                closeInterval={this.state.closeInterval}
              />
              <View style={styles.loginFormView}>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 37,
                      height: 37,
                      borderRadius: 7,
                      padding: 15,
                      left: 150,
                      top: 70
                    }}
                    source={require("../../required_images/logo.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.logoText}>Deal</Text>
                <TextInput
                  placeholder="Username"
                  autoFocus
                  autoCapitalize="none"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  onChangeText={this.set_username}
                />
                <TextInput
                  placeholder="Password"
                  autoCapitalize="none"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                  onChangeText={this.set_password}
                />
                <TouchableOpacity style={styles.buttonTouchable}>
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => this.onLoginPress()}
                    title="Login"
                    disabled={this.state.loginActive}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("SignupScreen");
                  }}
                >
                  <Text
                    style={{
                      marginTop: 50,
                      marginLeft: 210,
                      fontWeight: "bold",
                      fontSize: 15
                    }}
                  >
                    SignUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={{ flex: 0.1 }} onPress={() =>{this.openUrl()}}>
            <Text style={styles.instructions}>
              Developers : Sahil , Soumya , Rashi{"\n"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 0.9
  },
  loginScreenContainer: {
    flex: 0.9
  },
  logoText: {
    fontSize: 45,
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 30,
    textAlign: "center"
  },
  logoText1: {
    fontSize: 20,
    fontWeight: "100",
    marginTop: 100,
    textAlign: "center"
  },
  loginFormView: {
    flex: 0.9,
    top: 120
  },
  loginFormTextInput: {
    height: 45,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  },
  loginButton: {
    backgroundColor: "#313340",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    left: 40
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent"
  },
  buttonTouchable: {
    flex: 0.2,
    padding: 16
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    top: "48%"
  },
  instructions: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    color: "#333333"
  }
});
