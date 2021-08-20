import React from 'react';
import {introData} from 'assets/common/commonData';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet} from 'react-native';
import SpoText from 'components/SpoText';
import {commonStyle, margin, padding} from 'utils/commonStyle';

const IntroList = () => {
  return (
    <View style={{...margin(50, 'bottom'), ...padding(80, 'top')}}>
      {introData.map((item, i: number) => {
        return (
          <View style={{...margin(50, 'bottom')}} key={item.key}>
            <View style={{...margin(25, 'bottom')}}>
              <View style={{...margin(25, 'bottom')}}>
                <SpoText style={[commonStyle.h3, commonStyle.textCenter]} fontStyle={'BO'}>
                  {item.title}
                </SpoText>
              </View>
              <View>
                <SpoText style={[commonStyle.h5, commonStyle.textCenter]}>{item.content}</SpoText>
              </View>
            </View>
            <View style={styles.imgContainer}>
              <FastImage source={item.img} style={styles[`imgStyle${i + 1}`]} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default IntroList;

const styles = StyleSheet.create({
  imgStyle1: {
    width: 155,
    height: 154,
  },
  imgStyle2: {
    width: 178,
    height: 184,
  },
  imgStyle3: {
    width: 194,
    height: 163,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
