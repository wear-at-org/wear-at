import * as React from 'react';
import successIcon from 'assets/img/sucessCheck.png';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {stackNavigationProp} from 'navigation/StackNavigation';
import {View, Dimensions, StyleSheet} from 'react-native';
import SpoText from 'components/SpoText';
import CommonBtn from 'components/CommonBtn';
import {CommonActions} from '@react-navigation/native';
import Layout from 'components/CommonLayout';
import {Color, commonStyle, margin} from 'utils/commonStyle';
import Footer from 'components/Footer';
import Header from 'components/Header';

const {height} = Dimensions.get('window');
const CompleteStyleTest = () => {
  let navigation = useNavigation<stackNavigationProp>();
  return (
    <Layout>
      <View style={[commonStyle.container]}>
        <Header />

        <View style={styles.containerStyle}>
          <View style={{...margin(10, 'bottom')}}>
            <FastImage source={successIcon} style={styles.successIcon} />
          </View>
          <View style={{...margin(30, 'bottom')}}>
            <SpoText style={styles.successTitle} fontStyle={'BO'}>
              스타일테스트 완료
            </SpoText>
          </View>
          <SpoText style={styles.descText}>
            스타일리스트가 작성한 테스트 결과를 {`\n`}
            일주일 이내로 가입하신 이메일로 보내드리니 {`\n`}
            받은편지함을 꼭 확인해주세요!
          </SpoText>

          <View style={styles.bottomBtnContainer}>
            <CommonBtn
              btnTxt={'확인'}
              btnType={'type3'}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'StyleTestIntro'}],
                  }),
                );
              }}
            />
          </View>
        </View>
      </View>

      <Footer />
    </Layout>
  );
};

export default CompleteStyleTest;

const styles = StyleSheet.create({
  successIcon: {
    width: 53,
    height: 53,
  },
  containerStyle: {
    height: height - 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  descText: {
    textAlign: 'center',
    fontSize: 14,
    color: Color.graybdbd,
  },
  flex1: {
    flex: 1,
  },
  bottomBtnContainer: {
    width: '100%',
    bottom: 20,
    position: 'absolute',
  },
});
