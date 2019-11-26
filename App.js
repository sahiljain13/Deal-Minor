import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Custom Created
import MainScreen from './app/components/MainPageComponents/MainPage.js'
import LoginScreen from './app/components/StartComponents/LoginScreen.js'
import SignupScreen from './app/components/StartComponents/SignupScreen.js'
import SplashScreen from './app/components/StartComponents/SplashScreen.js'

const StartApp = createStackNavigator({
  MainPage:MainScreen,
  Login:LoginScreen,
  SignupScreen:SignupScreen,
  Splash:SplashScreen
},
{
  initialRouteName:'Splash',
  headerMode:'none',
  navigatorOptions:() => ({
    title:'Welcome'
  })
})

const CreateContainer = createAppContainer(StartApp)

class App extends Component {

  render() {
    return (
      <CreateContainer />
    );
  }
}

export default (App);
