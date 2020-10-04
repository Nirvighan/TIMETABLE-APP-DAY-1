import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import QuestionnaireScreen from './Screens/QuestionnaireScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';

export default class App extends React.Component{
 render(){
  return (
    <AppContainer/>
  );
 }
 
  
}
const Switchnavigator = createSwitchNavigator({
  Welcome:{screen:WelcomeScreen},
  Questionnaire:{screen:QuestionnaireScreen}
  
})

const AppContainer = createAppContainer(Switchnavigator);

