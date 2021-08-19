import CommonBtn from 'components/CommonBtn';
import SpoText from 'components/SpoText';
import {FC} from 'react';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import main from 'assets/img/main.png';
import FastImage from 'react-native-fast-image';
import {stackNavigationProp} from 'navigation/StackNavigation';
import {useNavigation} from '@react-navigation/native';

const MainVisual: FC = () => {
  const navigation = useNavigation<stackNavigationProp>();
  const styles = style();

  return (
    <View style={styles.visualContainer}>
      <SpoText style={styles.viuslTxt}>
        한 손으로 전문 스타일리스트의 {'\n'}
        <SpoText style={styles.viuslTxt} fontStyle={'BO'}>
          퍼스널 스타일링
        </SpoText>
        을 받아보세요
      </SpoText>

      <View style={styles.btnSpacer}>
        <CommonBtn btnTxt={'30초컷 무료테스트 지금 바로 진행하기'} btnType={'type1'} onPress={() => navigation.navigate('CompleteStyleTest')} />
      </View>

      <View style={styles.mainImgContainer}>
        <FastImage source={main} style={styles.mainImg} />
      </View>
    </View>
  );
};

export default MainVisual;

const style = () =>
  StyleSheet.create({
    visualContainer: {
      paddingTop: 48,
      paddingBottom: 24,
    },
    viuslTxt: {
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 28,
    },
    btnSpacer: {
      marginTop: 24,
      marginBottom: 70,
    },
    mainImgContainer: {
      alignItems: 'center',
    },
    mainImg: {
      width: 328,
      height: 362,
    },
  });
