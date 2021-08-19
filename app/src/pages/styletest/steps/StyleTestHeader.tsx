import React from 'react';
import arrLeft from 'assets/img/arr-right.png';
import xBtn from 'assets/img/x-btn-black.png';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {stackNavigationProp} from 'navigation/StackNavigation';
import {View, TouchableOpacity} from 'react-native';
import SpoText from 'components/SpoText';
import {Image} from 'react-native-elements';
import style from '../styles';
import {margin} from 'utils/commonStyle';

const StyleTestHeader: React.FC = ({activeIndex, setActiveIndex, stepLength, apiId, hooks}) => {
  const styles = style();
  const {beforeNextChecker} = hooks;
  const navigation = useNavigation<stackNavigationProp>();

  const checkPercent = () => {
    return `${(activeIndex / stepLength) * 100}%`;
  };
  return (
    <View style={styles.styleHeader}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.xbtnContainer}
          onPress={() => {
            if (activeIndex !== 0) {
              setActiveIndex(activeIndex - 1);
            } else {
              navigation.goBack();
            }
          }}>
          <Image source={arrLeft} style={styles.headerIcon} resizeMode={'contain'} />
          {activeIndex === 3 || activeIndex === 4 ? (
            <View style={[{...margin(10, 'left')}]}>
              <SpoText style={{opacity: 0}}>SKIP</SpoText>
            </View>
          ) : null}
        </TouchableOpacity>
        <View>
          <SpoText style={styles.hederTitle} fontStyle={'BO'}>
            스타일테스트
          </SpoText>
        </View>
        <View style={styles.xbtnContainer}>
          {activeIndex === 3 || activeIndex === 4 ? (
            <TouchableOpacity
              onPress={() => {
                if (activeIndex !== stepLength - 1) {
                  setActiveIndex(activeIndex + 1);
                } else {
                  beforeNextChecker([], apiId, true);
                }
              }}>
              <SpoText>SKIP</SpoText>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => navigation.navigate('StyleTestIntro')} style={{...margin(10, 'left')}}>
            <Image source={xBtn} style={styles.headerIcon} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={{width: checkPercent()}} />
      </View>
    </View>
  );
};

export default StyleTestHeader;
