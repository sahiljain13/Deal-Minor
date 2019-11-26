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
  BackHandler,
  ScrollView
} from "react-native";

import { Container, Footer, FooterTab } from "native-base";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Button, Card, Divider } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";
import Icon from "react-native-vector-icons/Ionicons";
import ViewMoreText from "react-native-view-more-text";
import Modal from "react-native-modalbox";
import { SearchBar } from "react-native-elements";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: "",
      posts: [
        {
          user: "Sahil Jain",
          img_url:
            "https://cdn.shopify.com/s/files/1/0304/3821/products/2018-Curren-Mens-Watches-Top-Brand-Luxury-Brown-Leather-Strap-Quartz-Watch-Men-Military-Sport-Waterproof_1200x1200.jpg?v=1530781405",
          created_at: "12-11-19",
          desc:
            "This is second hand watch by me i have bought it for ₹ 5000, I have bought these last month i have wore it once it is little tight for me so i decided to sell it",
          Title: "WATCH",
          Price: "₹ 2500"
        },
        {
          user: "Sahil Jain",
          img_url: "https://www.ergoflex.com.au/graphics/Ergo_-093-m.jpg",
          created_at: "02-08-19",
          desc:
            "This is second hand bed by me i have bought it for ₹ 15000, I have bought these 2 years back i have used it nicely as i am shifting so i want to sell this.",
          Title: "BED",
          Price: "₹ 3300"
        }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount of ProfileScreen");
    console.log(this.props.navigation.state.params);
    if (this.props.navigation.state.params) {
      console.log("new post");
      console.log(this.props.navigation.state.params);
      let newArray = [
        {
          user: "Sahil Jain",
          Title: this.props.navigation.state.params.title,
          img_url: this.props.navigation.state.params.img_url,
          desc: this.props.navigation.state.params.desc,
          Price: this.props.navigation.state.params.price,
          created_at: new Date().getDate().toString() + "-"+(new Date().getMonth() + 1).toString() + "-"+(new Date().getFullYear()).toString()
        }
      ];
      this.setState({ posts: [...this.state.posts, ...newArray] });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    console.log("UNSAFE_componentWillReceiveProps of ProfileScreen");
    console.log(nextProp.navigation.state.params);
    if (nextProp.navigation.state.params) {
      console.log("new post");

      let newArray = [
        {
          user: "Sahil Jain",
          Title: nextProp.navigation.state.params.title,
          img_url: nextProp.navigation.state.params.img_url,
          desc: nextProp.navigation.state.params.desc,
          Price: nextProp.navigation.state.params.price,
          created_at: new Date().getDate().toString() + "-"+(new Date().getMonth() + 1).toString() + "-"+(new Date().getFullYear()).toString()
        }
      ];
      this.setState({ posts: [...this.state.posts, ...newArray] });
    }
  }

  getProfileData() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#bdbdbd",
          elevation: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginTop: 10
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginLeft: 10,
              marginTop: 15,
              borderColor: "black",
              borderWidth: 1,
              backgroundColor: "white"
            }}
            source={{
              uri:
                "https://scontent.fbho1-1.fna.fbcdn.net/v/t1.0-9/41124568_1801651889948665_1391759537811226624_n.jpg?_nc_cat=101&_nc_ohc=EGLK0NXd-hUAQnnYT02_eZTPNp6-36R2l69qZS_RgJMt_HdeWGD1q8EmQ&_nc_ht=scontent.fbho1-1.fna&oh=4624d8389276519441d875a3b3fcce22&oe=5E431B93"
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginLeft: 20,
              marginTop: 20
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Sahil Jain
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                Pending Items : {this.state.posts.length}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                Sold Items : 0
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Card style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginTop: -5,
                    marginLeft: -5
                  }}
                  source={{
                    uri: "https://img.icons8.com/plasticine/2x/user.png"
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <View>
                    <Text style={{ marginLeft: 20, fontWeight: "bold" }}>
                      {post.user}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontWeight: "400",
                    color: "#a6a6a6",
                    fontSize: 12,
                    marginTop: 2
                  }}
                >
                  <Icon size={15} name={"ios-clock"} color="#CCCCCC" />{" "}
                  {post.created_at}
                </Text>
              </View>
            </View>
          </View>
          <Text />
          <Text style={{ marginLeft: 20, fontWeight: "bold", fontSize: 18 }}>
            {post.Title}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 150,
                  height: 120,
                  borderRadius: 10,
                  marginTop: 15,
                  marginLeft: -5,
                  borderWidth: 1,
                  borderColor: "black"
                }}
                source={{ uri: post.img_url }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
                marginLeft: 15,
                marginRight: 150
              }}
            >
              <Text style={{ flexWrap: "wrap" }}>{post.desc}</Text>
            </View>
          </View>
        </Card>
      );
    });
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.2, backgroundColor: "#d3d3d3" }}>
          {this.getProfileData()}
        </View>
        <View style={{ flex: 0.8, marginTop: 10 }}>
          <ScrollView>
            {posts}
            <Text />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
