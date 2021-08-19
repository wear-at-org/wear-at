import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Color} from 'utils/commonStyle';
import {stackNavigationProp} from 'navigation/StackNavigation';

const Header: React.FC = () => {
  const navigation = useNavigation<stackNavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <FastImage style={styles.menu} source={require('assets/img/menu.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <FastImage resizeMode={'contain'} style={styles.logo} source={require('assets/img/logo-m.png')} />
      </TouchableOpacity>
      <View />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.grayf2f2,
  },
  logo: {
    width: 80,
    height: 30,
  },
  menu: {
    width: 20,
    height: 20,
  },
});
