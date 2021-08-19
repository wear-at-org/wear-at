import React from 'react';
import Intro0 from 'assets/img/intro0.png';
import {StyleSheet, View} from 'react-native';
import SpoText from 'components/SpoText';
import FastImage from 'react-native-fast-image';
import {Color, commonStyle, margin, padding} from 'utils/commonStyle';
import CommonBtn from 'components/CommonBtn';

const IntroVisual = () => {
  // const [start, setStart] = useState(false);

  // useEffect(() => {
  //   setStart(true);
  // }, []);

  return (
    <View style={styles.viusalContainer}>
      <View style={{...margin(25, 'bottom')}}>
        <View style={{...margin(25, 'bottom')}}>
          <SpoText style={[commonStyle.textCenter, commonStyle.h3]}>
            전문 스타일리스트가 당신을 위해
            {'\n'}
            <SpoText fontStyle={'BO'}>퍼스널 스타일링</SpoText>을 선물 드립니다.
          </SpoText>
        </View>

        <SpoText style={[commonStyle.textCenter, commonStyle.h5]}>
          SCOT은 당신에게 어울리는 옷을 {'\n'}
          추천하는 의류 추천 서비스 입니다. {'\n'}
          웨어앳 회원이 되시면 다양한 서비스를{'\n'}
          이용하실 수 있습니다.
        </SpoText>
      </View>

      <View style={{...margin(25, 'bottom')}}>
        <View style={styles.imgContainer}>
          <FastImage source={Intro0} style={styles.viusalImg} />
        </View>
      </View>

      <View style={{...padding(25, 'all')}}>
        <CommonBtn btnTxt={'30초컷 무료 스타일테스트 해볼래요'} btnType={'type1'} />
      </View>
    </View>
  );
};
export default IntroVisual;

const styles = StyleSheet.create({
  viusalContainer: {
    backgroundColor: Color.grayF8F8,
    paddingTop: 64,
    paddingBottom: 74,
    paddingVertical: 60,
  },
  viusalImg: {
    width: 240,
    height: 180,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
