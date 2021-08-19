import StyleTestIntro from 'pages/styletest/intro';
import CompleteStyleTest from 'pages/styletest/CompleteStyleTest';
import {createStackNavigator, CardStyleInterpolators, StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import Main from 'pages/main';
import Intro from 'pages/intro';
import Styletest from 'pages/styletest';
import Login from 'pages/login';

export type RootStackParamList = {
  Main: undefined;
  Intro: undefined;
  Styletest: undefined;
  Login: undefined;
  CompleteStyleTest: undefined;
  StyleTestIntro: undefined;
  DrawerNavigation: undefined;
};

const Stack = createStackNavigator();
export type stackNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Main'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}} />
      <Stack.Screen name="Styletest" component={Styletest} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="CompleteStyleTest" component={CompleteStyleTest} options={{headerShown: false}} />
      <Stack.Screen name="StyleTestIntro" component={StyleTestIntro} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
