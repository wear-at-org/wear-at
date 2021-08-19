import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import FastImage from 'react-native-fast-image';
import main1 from 'assets/img/main1.png';
import main2 from 'assets/img/main2.png';
import main3 from 'assets/img/main3.png';
import main4 from 'assets/img/main4.png';
import main5 from 'assets/img/main5.png';
import main6 from 'assets/img/main6.png';
import main7 from 'assets/img/main7.png';
import main8 from 'assets/img/main8.png';
import main9 from 'assets/img/main9.png';

const MainParteners = () => {
  const animateValue = new Animated.Value(500);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animateValue, {
        useNativeDriver: true,
        toValue: -2000,
        duration: 12000,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.imgContainer, {transform: [{translateX: animateValue}]}]}>
      <FastImage source={main1} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main2} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main3} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main4} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main5} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main6} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main7} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main8} style={styles.imgSize} resizeMode={'contain'} />
      <FastImage source={main9} style={styles.imgSize} resizeMode={'contain'} />
    </Animated.View>
  );
};

export default MainParteners;

const styles = StyleSheet.create({
  imgContainer: {
    paddingTop: 56,
    flexDirection: 'row',
    paddingBottom: 72,
    alignItems: 'center',
  },
  imgSize: {
    width: 200,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
});
