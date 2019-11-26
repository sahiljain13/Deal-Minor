import React, { Component } from "react";
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
  Linking,
  ScrollView,
  Image,
  BackHandler,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Container, Footer, FooterTab } from "native-base";
import { ActivityIndicator, Colors, TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";
import RNExitApp from "react-native-exit-app";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import { countries } from "./countries";
import Carousel from "react-native-snap-carousel";
// Custom Created
import MainScreen from "../MainPageComponents/MainPage.js";
import ImagePicker from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loading: false,
      closeInterval: 2000,
      loginActive: true,
      countries: countries,
      fname: null,
      lname: null,
      dob: "1900-01-01",
      state: null,
      city: null,
      address: null,
      lmark: null,
      phone: null,
      phone1: null,
      country: null,
      gender: null,
      occupation: null,
      email: null,
      pass: null,
      pass1: null,
      hackerrank: null,
      hackerearth: null,
      spoj: null,
      codeforces: null,
      codechef: null,
      twitter: null,
      github: null,
      image:
        "https://image.shutterstock.com/image-illustration/photo-silhouette-male-profile-white-260nw-1018631086.jpg",
      imageData: "",
      lat: "",
      long: "",
      altitude: null,
      photo: {
        fileName: "default.jpg",
        type: "image/jpeg",
        uri:
          "https://image.shutterstock.com/image-illustration/photo-silhouette-male-profile-white-260nw-1018631086.jpg"
      }
    };
  }

  onLoginPress() {
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

  _renderItem = ({ data, index }) => {
    const screenWidth = Dimensions.get("window").width;
    console.log("rendering " + index);
    let countries = [...this.state.countries];

    let gender = [
      {
        index: "M",
        value: "Male"
      },
      {
        index: "F",
        value: "Female"
      },
      {
        index: "O",
        value: "Other"
      }
    ];
    if (index === 0) {
      return (
        <View style={{ flex: 1, marginLeft: 20, marginTop: 15 }}>
          <ScrollView>
            <View style={{ marginLeft: 75 }}>
              <View style={{ flexDirection: "row" }}>

                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 50,
                    fontSize: 20,
                    fontFamily: "Roboto",
                    fontWeight: "bold"
                  }}
                >
                  Personal Details :
                </Text>
              </View>
              <Text />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="account-details"
                size={30}
                style={{ marginTop: 12 }}
              />
              <TextInput
                placeholder="Username"
                outlined
                autoCapitalize="none"
                autoCompleteType="username"
                autoFocus
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ username: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon name="rename-box" size={30} style={{ marginTop: 12 }} />
              <TextInput
                placeholder="First Name"
                outlined
                placeholderColor="#c4c3cb"
                autoCompleteType="name"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ fname: data });
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name="rename-box" size={30} style={{ marginTop: 12 }} />
              <TextInput
                placeholder="Last Name"
                outlined
                placeholderColor="#c4c3cb"
                autoCompleteType="name"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ lname: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="cellphone-iphone"
                size={30}
                style={{ marginTop: 12 }}
              />
              <TextInput
                placeholder="Phone"
                outlined
                keyboardType={"phone-pad"}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ phone: data });
                }}
              />
            </View>




            <View style={{ flexDirection: "row" }}>
              <Icon
                name="home-city-outline"
                size={30}
                style={{ marginTop: 12 }}
              />
              <TextInput
                placeholder="Address"
                outlined
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ address: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="city-variant-outline"
                size={30}
                style={{ marginTop: 20 }}
              />
              <Dropdown
                label="Country"
                data={countries}
                containerStyle={{
                  marginLeft: 20,
                  width: 290,
                  marginTop: -10
                }}
                pickerStyle={{ marginTop: -110, backgroundColor: "black" }}
                itemTextStyle={{ color: "white" }}
                textColor="white"
                baseColor="black"
                selectedItemColor="white"
                onChangeText={data => {
                  this.setState({ country: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon name="city" size={30} style={{ marginTop: 12 }} />
              <TextInput
                placeholder="State"
                outlined
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ state: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon name="home-modern" size={30} style={{ marginTop: 12 }} />
              <TextInput
                placeholder="City"
                outlined
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ city: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="gender-male-female"
                size={30}
                style={{ marginTop: 20 }}
              />
              <Dropdown
                label="Gender"
                data={gender}
                containerStyle={{
                  marginLeft: 20,
                  width: 290,
                  marginTop: -10
                }}
                pickerStyle={{ marginTop: -110, backgroundColor: "black" }}
                itemTextStyle={{ color: "white" }}
                textColor="white"
                baseColor="black"
                selectedItemColor="white"
                onChangeText={data => {
                  this.setState({ gender: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <DatePicker
                style={{ width: 350 }}
                date={this.state.dob}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="5000-12-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 15,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 45,
                    marginTop: 20,
                    backgroundColor: "white",
                    borderRadius: 5,
                    elevation: 2
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ dob: date });
                }}
              />
            </View>



            <Text />
            <Text />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, marginLeft: 20, marginTop: 15 }}>
          <ScrollView>
            <View style={{ marginLeft: 75 }}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="account-circle-outline" size={50} />
                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 20,
                    fontSize: 20,
                    fontFamily: "Roboto",
                    fontWeight: "bold"
                  }}
                >
                  Create Account
                </Text>
              </View>
              <Text />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage();
                }}
              >
                <Icon
                  name="image-plus"
                  size={30}
                  style={{
                    marginTop: 122,
                    zIndex: 1,
                    marginLeft: 208
                  }}
                />
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    marginLeft: 110,
                    marginTop: -150
                  }}
                  source={{
                    uri: this.state.image
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text />

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="email-mark-as-unread"
                size={30}
                style={{ marginTop: 12 }}
              />
              <TextInput
                placeholder="Email"
                outlined
                autoCapitalize="none"
                autoCompleteType="email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ email: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon name="eye-off" size={30} style={{ marginTop: 12 }} />
              <TextInput
                placeholder="Password"
                outlined
                placeholderColor="#c4c3cb"
                autoCompleteType="password"
                autoCapitalize="none"
                secureTextEntry={true}
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.setState({ pass: data });
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="textbox-password"
                size={30}
                style={{ marginTop: 12 }}
              />
              <TextInput
                placeholder="Confirm Password"
                outlined
                autoCompleteType="password"
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={data => {
                  this.checkPassword(data);
                }}
              />
            </View>
            <Text />
            <View style={{ flexDirection: "row", marginLeft: 110 }}>
              <Button

                title="  Create    "
                raised
                buttonStyle={{
                  borderRadius: 5,
                  backgroundColor: "#313340"
                }}
                containerStyle={{ marginLeft: 50 }}
                onPress={this.submitData}
              />
            </View>

            <Text />
            <Text />
          </ScrollView>
        </View>
      );
    }
  };

  submitData = () => {
    console.log("submitting data");
    if (this.state.pass !== this.state.pass1) {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Error",
        "Passwords Don't Match"
      );
    } else {
      let s = this.state;

      if (s.pass && s.pass1 && s.pass.length < 8) {
        this.dropDownAlertRef.alertWithType(
          "error",
          "Error",
          "Create A Strong Password!!"
        );
      } else {
        if (
          s.username &&
          s.fname &&
          s.pass &&
          s.pass1 &&
          s.lname &&
          s.country &&
          s.state &&
          s.city &&
          s.phone &&
          s.address &&
          s.gender &&
          s.dob &&
          s.email
        ) {
          console.log("All Required Data Filled");


          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "Login"
              })
            ]
          });
          this.props.navigation.dispatch(resetAction);

          this.dropDownAlertRef.alertWithType(
            "success",
            "Success",
            "Successfully Logged In!!"
          );

        } else {
          this.dropDownAlertRef.alertWithType(
            "error",
            "Error",
            "Please Fill All The Enteries For Better Experience!!"
          );
        }
      }
    }
  };

  checkPassword = data => {
    this.setState({ pass1: data });
  };

  selectImage = () => {
    console.log("choosing image");
    let options = {
      title: "Select Image",

      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source = { uri: response.uri };
        console.log(response.uri);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("inserting image");
        //console.log(response)

        this.setState({
          image: response.uri,
          imageData: "data:image/jpeg;base64," + response.data,
          photo: response
        });
      }
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            closeInterval={this.state.closeInterval}
          />
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}
            hidesWhenStopped
            color={Colors.blue800}
          />
        </View>
      );
    } else {
      const screenWidth = Dimensions.get("window").width;
      const screenHeight = Dimensions.get("window").height;

      return (
        <View style={{ flex: 1, backgroundColor: "#FFA500" }}>
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            closeInterval={this.state.closeInterval}
          />
          <View style={styles.loginFormView}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  padding: 15,
                  left: 125,
                  top: 60,
                  borderColor: "black"
                }}
                source={require("../../required_images/logo.png")}
              />
            </TouchableOpacity>
            <Text style={styles.logoText}>Deal</Text>
          </View>
          <Text />

          <Carousel
            layout={"default"}
            layoutCardOffset={30}
            ref={c => {
              this._carousel = c;
            }}
            data={[
              {
                index: 0,
                data: "1"
              },
              {
                index: 1,
                data: "2"
              }
            ]}
            renderItem={this._renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
          />
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
    fontSize: 35,
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 0,
    textAlign: "center"
  },
  logoText1: {
    fontSize: 20,
    fontWeight: "100",
    marginTop: 100,
    textAlign: "center"
  },
  loginFormView: {
    flex: 0.1,
    top: -40
  },
  loginFormTextInput: {
    height: 45,
    fontSize: 14,
    width: 300,
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
  loginFormTextInput1: {
    height: 45,
    fontSize: 14,
    width: 139,
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
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    left: 18
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
    fontSize: 15,
    textAlign: "center",
    color: "#333333"
  }
});
