import * as React from 'react';
import {useState} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import CommonBtn from 'components/CommonBtn';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {stackNavigationProp} from 'navigation/StackNavigation';
import Footer from 'components/Footer';
import Header from 'components/Header';
import {Color, commonStyle, margin, padding} from 'utils/commonStyle';
import Layout from 'components/CommonLayout';
import SpoText from 'components/SpoText';
import bottomImg from 'assets/img/style-test-Intro-bottom.png';
import bottomCircle from 'assets/img/bottom-circle.png';

const StyleTestIntro = () => {
  const navigation = useNavigation<stackNavigationProp>();
  const [activeInex, setActiveIndex] = useState(1);
  return (
    <Layout>
      <ScrollView>
        <View style={commonStyle.container}>
          <Header />
        </View>

        <View style={[styles.styleIntroStepContainer, activeInex === 1 && styles.isActive]}>
          <TouchableOpacity onPress={() => setActiveIndex(1)}>
            <View style={{...margin(10, 'bottom')}}>
              <SpoText fontStyle={'BO'} style={[commonStyle.h4, commonStyle.textCenter, styles.descFontColor]}>
                AI가 선별하고 전문가가 추천하는 스타일링
              </SpoText>
            </View>

            <View style={{...margin(50, 'bottom')}}>
              <SpoText style={[commonStyle.h4Big, commonStyle.textCenter]}>
                수 많은 옷들 중 내가 원하는 옷만 <SpoText>딱</SpoText> 골라주는
                <SpoText style={[commonStyle.h4Big, commonStyle.textCenter]} fontStyle={'BO'}>
                  나만의 스타일링
                </SpoText>
                을 받아보세요.
              </SpoText>
            </View>

            {activeInex === 1 && (
              <View style={[commonStyle.xycenter]}>
                <FastImage source={bottomCircle} style={commonStyle.icon24} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.styleIntroStepContainer, activeInex === 2 && styles.isActive]} onPress={() => setActiveIndex(2)}>
          <View style={{...margin(10, 'bottom')}}>
            <SpoText fontStyle={'BO'} style={[commonStyle.h4, commonStyle.textCenter, styles.descFontColor]}>
              AI가 선별하는 맞춤형 스타일링
            </SpoText>
          </View>

          <View style={{...margin(50, 'bottom')}}>
            <SpoText style={[commonStyle.h4Big, commonStyle.textCenter]}>
              알아서 추천해주는 인공지능으로{'\n'}
              <SpoText style={[commonStyle.h4Big, commonStyle.textCenter]} fontStyle={'BO'}>
                당신의 고민을 줄여드려요!
              </SpoText>
            </SpoText>
          </View>

          {activeInex === 2 && (
            <View style={[commonStyle.xycenter]}>
              <FastImage source={bottomCircle} style={commonStyle.icon24} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.styleIntroStepContainer, activeInex === 3 && styles.isActive]} onPress={() => setActiveIndex(3)}>
          <View style={{...margin(10, 'bottom')}}>
            <SpoText fontStyle={'BO'} style={[commonStyle.h4, commonStyle.textCenter, styles.descFontColor]}>
              전문 스타일리스트
            </SpoText>
          </View>

          <View style={{...margin(50, 'bottom')}}>
            <SpoText style={[commonStyle.h4Big, commonStyle.textCenter]}>
              <SpoText style={[commonStyle.h4Big, commonStyle.textCenter]} fontStyle={'BO'}>
                전문 스타일리스트
              </SpoText>
              가 당신을 가장{'\n'}잘 나타낼 수 있는 옷으로 찾아드릴게요.
            </SpoText>
          </View>

          {activeInex === 3 && (
            <View style={[commonStyle.xycenter]}>
              <FastImage source={bottomCircle} style={commonStyle.icon24} />
            </View>
          )}
        </TouchableOpacity>

        <View style={[commonStyle.container, {...padding(100, 'top')}]}>
          <View style={{...margin(30, 'bottom')}}>
            <SpoText style={[commonStyle.h2, commonStyle.textCenter]}>
              매번 뭘 입지 고민이라면{'\n'}
              <SpoText style={[commonStyle.h2, commonStyle.textCenter]} fontStyle={'BO'}>
                웨어앳에서 해결하세요.
              </SpoText>
            </SpoText>
          </View>
          <CommonBtn
            btnTxt={'30초컷 무료 스타일테스트 할래요'}
            btnType={'type2'}
            btnFontStyle={'BO'}
            onPress={() => {
              navigation.navigate('Styletest');
            }}
          />

          <FastImage source={bottomImg} style={styles.introBottomImage} />
        </View>

        <Footer />
      </ScrollView>
    </Layout>
  );
};

export default StyleTestIntro;

const styles = StyleSheet.create({
  descFontColor: {
    color: Color.optionBlue,
  },
  styleIntroStepContainer: {
    backgroundColor: Color.grayF8F8,
    paddingVertical: 60,
    paddingHorizontal: 25,
    opacity: 0.6,
  },
  isActive: {opacity: 1},
  introBottomImage: {
    width: 362,
    height: 249,
  },
});
