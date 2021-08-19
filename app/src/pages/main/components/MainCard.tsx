import React from 'react';
import {View, StyleSheet} from 'react-native';
import SpoText from 'components/SpoText';
import FastImage from 'react-native-fast-image';
import {commonStyle, margin} from 'utils/commonStyle';

const MainCard = () => {
  return (
    <View style={styles.cardWrap}>
      <View style={styles.cardContainer}>
        <View style={{...margin(16, 'bottom')}}>
          <SpoText style={commonStyle.h4Big} fontStyle={'BO'}>
            나에게 딱 맞는
          </SpoText>
        </View>

        <View style={{...margin(24, 'bottom')}}>
          <SpoText style={[commonStyle.h4, commonStyle.textCenter]}>무료 스타일 테스트를 통해 나에게 어울리는 옷을{'\n'} 추천 받아 보세요.</SpoText>
        </View>

        <FastImage style={styles.cardImg} source={require('assets/img/main-icon1.png')} />
      </View>
      <View style={styles.cardContainer}>
        <View style={{...margin(16, 'bottom')}}>
          <SpoText style={commonStyle.h4Big} fontStyle={'BO'}>
            다양한 스타일 PICK!
          </SpoText>
        </View>

        <View style={{...margin(24, 'bottom')}}>
          <SpoText style={[commonStyle.h4, commonStyle.textCenter]}>전문 스타일리스트가 제공하는 스타일 칼럼을 {'\n'} 확인해 보세요!</SpoText>
        </View>

        <FastImage style={styles.cardImg2} source={require('assets/img/main-icon2.png')} />
      </View>
      <View style={styles.cardContainer}>
        <View style={{...margin(16, 'bottom')}}>
          <SpoText style={commonStyle.h4Big} fontStyle={'BO'}>
            패션에 대한 모든 것
          </SpoText>
        </View>

        <View style={{...margin(24, 'bottom')}}>
          <SpoText style={[commonStyle.h4, commonStyle.textCenter]}>이벤트, 세일, OOTD 등 다양한 패션 정보를 {'\n'} 확인하실 수 있어요.</SpoText>
        </View>

        <FastImage style={styles.cardImg3} source={require('assets/img/main-icon3.png')} />
      </View>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  cardWrap: {
    marginTop: 150,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  cardImg: {
    width: 191,
    height: 217,
  },
  cardImg2: {
    width: 190,
    height: 190,
  },
  cardImg3: {
    width: 190,
    height: 201,
  },
});
