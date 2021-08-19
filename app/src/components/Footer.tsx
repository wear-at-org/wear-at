import * as React from 'react';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Color} from 'utils/commonStyle';
import SpoText from './SpoText';

const footerTxt = [
  {
    txt: '이용약관',
    link: '',
  },
  {
    txt: '개인정보처리방침',
    link: '',
  },
  {
    txt: '제휴/광고문의',
    link: '',
  },
];

const Footer: FC = () => {
  const styles = style();
  return (
    <View style={styles.container}>
      <View>
        <SpoText style={styles.footerTxt}>(주)웨어앳 © 2021 Wear’at. All rights reserved.</SpoText>
      </View>

      <View style={styles.footerTextContainer}>
        {footerTxt.map((t, index) => {
          const last = footerTxt.length - 1 === index;
          return (
            <View style={styles.footerInner} key={'footerTxt' + index}>
              <SpoText style={[styles.footerTxt, styles.footerColor8282]}>{t.txt}</SpoText>
              <View style={last ? {} : styles.footerLine} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Footer;
const style = () =>
  StyleSheet.create({
    container: {
      paddingTop: 32,
      paddingBottom: 32,
      backgroundColor: Color.grayF8F8,
      paddingLeft: 25,
      paddingRight: 25,
    },
    footerTextContainer: {
      marginTop: 8,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerInner: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerTxt: {
      fontSize: 13,
      textAlign: 'center',
    },
    footerColor8282: {
      color: Color.gray8282,
    },
    footerLine: {
      top: 3,
      height: 12,
      borderRightWidth: 1,
      borderRightColor: Color.gray8282,
      paddingRight: 8,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
