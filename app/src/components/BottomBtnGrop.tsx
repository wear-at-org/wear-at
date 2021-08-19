import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Color, commonStyle, margin} from 'utils/commonStyle';
import CommonBtn from './CommonBtn';
import SpoText from './SpoText';

const BottomBtnGrop = () => {
  return (
    <View style={{...margin(50, 'bottom')}}>
      <View style={{...margin(24, 'bottom')}}>
        <SpoText fontStyle={'BO'} style={[commonStyle.h3, commonStyle.textCenter]}>
          내 손안에 나만의 퍼스널 스타일링
        </SpoText>
      </View>
      <View style={{...margin(24, 'bottom')}}>
        <SpoText style={styles.descFont}>
          취향별로 구축된 추천코디 데이터로{'\n'}
          당신의 옷장을 책임집니다!
        </SpoText>
      </View>

      <View style={{...margin(16, 'bottom')}}>
        <CommonBtn btnTxt="30초컷 무료테스트 바로 진행" btnType="type3" btnFontStyle={'BO'} />
      </View>

      <CommonBtn btnTxt="궁금한게 있어요" btnType="type2" btnFontStyle={'BO'} />
    </View>
  );
};

export default BottomBtnGrop;

const styles = StyleSheet.create({
  descFont: {
    color: Color.gray8282,
    fontSize: 14,
    textAlign: 'center',
  },
});
