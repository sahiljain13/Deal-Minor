import React, {Component} from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { StyleSheet, View, Button } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import { HeaderBackButton, createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import SellScreen from "../Git/SellScreen";
import SettingsScreen from "../Cloud/SettingsScreen";
import ProfileScreen from "../Profile/ProfileScreen";
import BuyScreen from "../Profile/BuyScreen";

const AppBarScreen = createMaterialBottomTabNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: () => (
          <View>
            <Icon size={25} name={"ios-home"} color="#FFFFFF" />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#FFA500"
      }
    },
    sell: {
      screen: SellScreen,
      navigationOptions: {
        tabBarLabel: "Sell",
        tabBarIcon: () => (
          <View>
            <Icon size={25} name={"ios-send"} color="#FFFFFF" />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#313340"
      }
    },
    settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: () => (
          <View>
            <Icon
              size={25}
              raised={true}
              reverse={true}
              name={"ios-settings"}
              color="#FFFFFF"
            />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#FF7B00"
      }
    },
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: () => (
          <View>
            <Icon size={25} name={"ios-person"} color="#FFFFFF" />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#0360FF"
      }
    }
  },
  {
    initialRouteName: "home",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    animationEnabled: true,
    barStyle: { backgroundColor: "#FFA500" }
  }
);

const CreateContainer = createAppContainer(AppBarScreen)


const StartApp = createStackNavigator({
  Buy:BuyScreen,
  Drawer:CreateContainer
},
{
  initialRouteName:'Drawer',
  headerMode:'none',
  navigatorOptions:() => ({
    title:'Welcome'
  })
})

const CreateContainer1 = createAppContainer(StartApp)



class App extends Component {

  constructor(props){
    super(props);
    this.state={
      access_token:null,
      user:null,
      server_url:"https://shielded-dusk-55059.herokuapp.com",
      img_url:"https://image.shutterstock.com/image-illustration/photo-silhouette-male-profile-white-260nw-1018631086.jpg",
    }
  }

  componentDidMount(){
    console.log("inside componentDidMount of MainPage")
    this.setState({access_token:this.props.navigation.state.params.access_token, user:this.props.navigation.state.params.user, img_url:this.state.server_url+this.props.navigation.state.params.img_url})
  }

  render() {
    if(this.state.access_token){
    return (
      <CreateContainer1 screenProps={{access_token:this.state.access_token, user:this.state.user, img_url:this.state.img_url }} />
    );
  }
  else{
    return (<View />);
  }
  }
}

export default (App);
