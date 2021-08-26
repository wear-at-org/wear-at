import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {DrawerContentScrollView, DrawerContentComponentProps} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import SpoText from 'components/SpoText';
import {useSelector} from 'react-redux';
import {RootState, userInfoName} from 'store';
import xBtn from 'assets/img/x-btn-black.png';
import FastImage from 'react-native-fast-image';
import defaultProfile from 'assets/img/default-user.png';
import {Color, margin, commonStyle, padding} from 'utils/commonStyle';
import SignHook from 'hooks/useSignHook';

const {height} = Dimensions.get('window');
const CustomDrwaer: FC<DrawerContentComponentProps> = (props) => {
  const {logout} = SignHook();
  const {navigation} = props;
  const userInfo = useSelector((state: RootState) => state[userInfoName]);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.xbtnContainer} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <FastImage source={xBtn} style={commonStyle.icon20} />
        </TouchableOpacity>
        {userInfo.loginStatus !== 'login' ? (
          <View style={styles.profileInner}>
            <View style={{...margin(10, 'right')}}>
              <FastImage source={defaultProfile} style={commonStyle.icon50} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <SpoText fontStyle={'M'} style={commonStyle.h5}>
                로그인이 필요합니다.
              </SpoText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.profileInner} onPress={() => navigation.navigate('Mypage')}>
            <View style={{...margin(10, 'right')}}>
              <FastImage source={userInfo.info.profileImage || defaultProfile} style={commonStyle.icon50} />
            </View>

            <View>
              <SpoText fontStyle={'M'} style={commonStyle.h5}>
                {userInfo.info.nickname}
              </SpoText>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View>
        {userInfo.loginStatus !== 'login' ? (
          <TouchableOpacity style={styles.drawerItemStyle} onPress={() => navigation.navigate('Intro')}>
            <SpoText fontStyle={'M'} style={commonStyle.h4}>
              서비스 소개
            </SpoText>
            <FastImage source={require('assets/img/arr-right-b.png')} style={commonStyle.icon30} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.drawerItemStyle} onPress={() => navigation.navigate('Intro')}>
              <SpoText fontStyle={'M'} style={commonStyle.h4}>
                서비스 소개
              </SpoText>
              <FastImage source={require('assets/img/arr-right-b.png')} style={commonStyle.icon30} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItemStyle} onPress={() => navigation.navigate('Intro')}>
              <SpoText fontStyle={'M'} style={commonStyle.h4}>
                스타일테스트 내역
              </SpoText>
              <FastImage source={require('assets/img/arr-right-b.png')} style={commonStyle.icon30} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItemStyle} onPress={() => navigation.navigate('Intro')}>
              <SpoText fontStyle={'M'} style={commonStyle.h4}>
                프로필 수정
              </SpoText>
              <FastImage source={require('assets/img/arr-right-b.png')} style={commonStyle.icon30} />
            </TouchableOpacity>
          </>
        )}
        <View style={padding(30, 'all')}>
          <TouchableOpacity style={styles.drawerBtnContainer} onPress={() => navigation.navigate('StyleTestIntro')}>
            <SpoText style={styles.drawerBtnText}>30초만에 나에게 꼭 맞는 스타일 분석</SpoText>
          </TouchableOpacity>
        </View>
      </View>

      {userInfo.loginStatus !== 'login' ? (
        <></>
      ) : (
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <SpoText>로그아웃</SpoText>
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrwaer;

const styles = StyleSheet.create({
  xbtnContainer: {alignItems: 'flex-end', marginBottom: 30},
  icon20: {width: 20, height: 20},
  profileContainer: {
    backgroundColor: Color.grayf5f8fa,
    padding: 25,
  },
  icon50: {
    width: 50,
    height: 50,
  },
  profileInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  drawerBtnContainer: {
    backgroundColor: Color.optionBlue,
    height: 44,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerBtnText: {
    fontSize: 14,
    color: 'white',
  },
  logout: {
    position: 'absolute',
    bottom: 10,
    left: 25,
  },
  drawerContainer: {
    minHeight: height - 70,
  },
});
