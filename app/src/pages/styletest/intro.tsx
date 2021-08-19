import * as React from 'react';
import {ScrollView, View} from 'react-native';
import CommonBtn from 'components/CommonBtn';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {stackNavigationProp} from 'navigation/StackNavigation';
import Footer from 'components/Footer';
import Header from 'components/Header';
import {commonStyle} from 'utils/commonStyle';
import Layout from 'components/CommonLayout';

const StyleTestIntro = () => {
  const navigation = useNavigation<stackNavigationProp>();
  return (
    <Layout>
      <ScrollView>
        <View style={commonStyle.container}>
          <Header />
          <CommonBtn
            btnTxt={'리스트로'}
            btnType={'type1'}
            onPress={() => {
              navigation.navigate('Styletest');
            }}
          />
        </View>
        <Footer />
      </ScrollView>
    </Layout>
  );
};

export default StyleTestIntro;
