import React from 'react';
import Main from 'pages/main';
import Intro from 'pages/intro';
import Login from 'pages/login';
import StyletestIntro from 'pages/styletest/intro';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {userInfoName} from 'store';
import {RootState} from 'store';
import StackNavigation from './StackNavigation';
import CustomDrawerContent from './CustomDrawerContent';
import Mypage from 'pages/mypage';
const {width} = Dimensions.get('window');
const Drawer = createDrawerNavigator();

export type RootDrawerParamList = {
  Main: undefined;
  Intro: undefined;
  Styletest: undefined;
  Login: undefined;
  StyleTestIntro: undefined;
};

export type drawerNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Main'>;

const Root = () => {
  const {loginStatus} = useSelector((state: RootState) => state[userInfoName]);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="StackNavigation"
      screenOptions={{headerShown: false, gestureEnabled: false, drawerStyle: {width: width * 0.8}}}>
      <Drawer.Screen name="StackNavigation" component={StackNavigation} />
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Intro" component={Intro} />
      <Drawer.Screen name="StyletestIntro" component={StyletestIntro} />
      <Drawer.Screen name="Mypage" component={Mypage} />
      {loginStatus !== 'login' ? <Drawer.Screen name="Login" component={Login} options={{headerShown: false}} /> : <></>}
    </Drawer.Navigator>
  );
};

export default Root;
