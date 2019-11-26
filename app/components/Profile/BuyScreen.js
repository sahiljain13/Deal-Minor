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
import { countries } from "../StartComponents/countries";
import { RadioButton } from "react-native-paper";

export default class BuyScreen extends Component {
  constructor() {
    super();
    this.state = {
      checked: "first",
      closeInterval: 5000
    };
  }

  shipNow = () => {
    this.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "Processing Your Order!!\nWill Be Delivered Soon!! Keep Tracking!!"
    );
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 1000);
  };
  render() {
    const screenWidth = Dimensions.get("window").width;
    return (
      <View style={{ flex: 1, backgroundColor: "grey" }}>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
          closeInterval={this.state.closeInterval}
          elevation={20}
        />
        <View style={{ marginLeft: 20 }}>
          <View style={{ marginLeft: 75 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 15,
                  marginLeft: 50,
                  fontSize: 30,
                  fontFamily: "Roboto",
                  fontWeight: "bold"
                }}
              >
                Shipping Details :
              </Text>
            </View>
            <Text />
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
            <Icon name="cellphone-iphone" size={30} style={{ marginTop: 12 }} />
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
              baseColor="white"
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
          <Text />
          <Text />

          <View style={{ flexDirection: "row", marginLeft: 110 }}>
            <RadioButton
              value="COD"
              status={this.state.checked === "first" ? "checked" : "unchecked"}
              onPress={() => {
                this.setState({ checked: "first" });
              }}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>COD</Text>
            <RadioButton
              value="CARD"
              status={this.state.checked === "second" ? "checked" : "unchecked"}
              onPress={() => {
                this.setState({ checked: "second" });
              }}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
              CARD / VISA
            </Text>
          </View>
          <Button
            containerStyle={{
              borderRadius: 10,
              marginLeft: 100,
              marginTop: 50,
              width: 200
            }}
            title="           SHIP NOW           "
            onPress={() => {
              this.shipNow();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});
