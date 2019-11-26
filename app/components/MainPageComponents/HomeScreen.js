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

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: "",
      posts: [
        {
          user: "Soumya Mujhjia",
          img_url:
            "https://live.staticflickr.com/3054/2537261201_22fc75314b_b.jpg",
          created_at: "12-11-19",
          desc:
            "This is second hand shoes by me i have bought it for ₹ 5000, I have bought these last month i have wore it once it is little tight for me so i decided to sell it",
          Title: "SHOES",
          Price: "₹ 2500"
        },
        {
          user: "Rashi Dixit",
          img_url:
            "https://ak3.picdn.net/shutterstock/videos/3358673/thumb/1.jpg",
          created_at: "02-08-19",
          desc:
            "This is second hand  Guitar by me i have bought it for ₹ 15000, I have bought these 2 years back i have used it nicely as i am shifting so i want to sell this.",
          Title: "Guitar",
          Price: "₹ 3300"
        },
        {
          user: "Sahil Jain",
          img_url:
            "https://s3.ap-south-1.amazonaws.com/www.cimg.in/images/2019/01/30/35/159322569_15488571241_large.jpg",
          created_at: "24-09-19",
          desc:
            "This is second hand Iphone by me i have bought it for ₹ 75000, I have bought it 3 years back i have used it nicely as i am want to buy a new phone so  i decided to sell this. Price can be vary",
          Title: "IPhone",
          Price: "₹ 15000"
        },
        {
          user: "Abhishek Goyal",
          img_url:
            "https://i.ebayimg.com/00/s/MTAyNFg3Njg=/z/Ji8AAOSwfTlcfVP0/$_86.JPG",
          created_at: "14-08-19",
          desc:
            "This is second hand samsung phone 8+ by me i have bought it for ₹ 65000, I have bought it last years  i have used it nicely as i am want to buy a new phone so  i decided to sell this. Price can be vary",
          Title: "Phone",
          Price: "₹ 11000"
        }
      ]
    };
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
          <Divider
            style={{ backgroundColor: "#CCCCCC", height: 2, marginTop: 15 }}
            light={true}
            orientation="center"
          />
          <View style={{ flexDirection: "row", marginTop: 7 }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Button
                  containerStyle={{ borderRadius: 10, marginLeft: 130 }}
                  title="             Buy It              "
                  onPress={() => {this.props.navigation.navigate('Buy', {
                    postDetails:post
                  })}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      );
    });
    return (
      <View style={styles.container}>
        <View>
          <SearchBar
            placeholder="Search"
            platform="ios"
            value={this.state.searchedText}
            onChangeText={searchedText => {
              this.setState({ searchedText });
            }}
            containerStyle={{
              marginTop: 5,
              height: 50,
              marginBottom: 5,
              marginLeft: 30,
              backgroundColor: "transparent",
              width: 400
            }}
            showCancel={false}
          />
        </View>
        <ScrollView style={{ marginTop: 0 }}>
          {posts}
          <Text />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
