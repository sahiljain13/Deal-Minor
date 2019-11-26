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
import ImagePicker from "react-native-image-picker";

export default class SellScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:
        "https://icon-library.net/images/photo-gallery-icon-png/photo-gallery-icon-png-23.jpg",
      email: "",
      pass: "",
      pass1: "",
      img_url:
        "https://icon-library.net/images/photo-gallery-icon-png/photo-gallery-icon-png-23.jpg"
    };
  }

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
          img_url: response.uri
        });
      }
    });
  };

  submitData = () => {
    console.log(this.state.pass1);
    console.log(this.state.img_url);
    console.log(this.state.email);
    console.log(this.state.pass);

    this.props.navigation.navigate("profile", {
      title: this.state.pass1,
      img_url: this.state.img_url,
      desc: this.state.email,
      price: this.state.pass
    });
  };

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 20, marginTop: 15 }}>
        <ScrollView>
          <View style={{ marginLeft: 75 }}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="send-circle" size={50} />
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 20,
                  fontSize: 30,
                  fontFamily: "Roboto",
                  fontWeight: "bold"
                }}
              >
                Sell An Item
              </Text>
            </View>
            <Text />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon
              name="chart-bar-stacked"
              size={30}
              style={{ marginTop: 12 }}
            />
            <TextInput
              placeholder="Title"
              outlined
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={data => {
                this.setState({ pass1: data });
              }}
            />
          </View>

          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "bold" }}>
            Image :{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.selectImage();
              }}
            >
              <Image
                style={{
                  width: 400,
                  height: 250,
                  marginLeft: 15,
                  borderRadius: 20,
                  marginTop: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  backgroundColor: "white"
                }}
                source={{
                  uri: this.state.img_url
                }}
              />
            </TouchableOpacity>
          </View>
          <Text />

          <View style={{ flexDirection: "row" }}>
            <Icon name="sort-descending" size={30} style={{ marginTop: 12 }} />
            <TextInput
              placeholder="Description"
              outlined
              autoCapitalize="none"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput1}
              onChangeText={data => {
                this.setState({ email: data });
              }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon name="cash-usd" size={30} style={{ marginTop: 12 }} />
            <TextInput
              placeholder="Price"
              outlined
              placeholderColor="#c4c3cb"
              keyboardType={"phone-pad"}
              style={styles.loginFormTextInput}
              onChangeText={data => {
                this.setState({ pass: data });
              }}
            />
          </View>

          <Text />
          <View style={{ flexDirection: "row", marginLeft: 110 }}>
            <Button
              title="    Sell Now    "
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginFormTextInput: {
    height: 45,
    fontSize: 14,
    width: 370,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",

    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  },
  loginFormTextInput1: {
    height: 100,
    fontSize: 14,
    width: 370,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",

    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  }
});
