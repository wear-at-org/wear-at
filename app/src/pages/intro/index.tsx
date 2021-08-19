import Header from 'components/Header';
import {FC} from 'react';
import * as React from 'react';
import {ScrollView, View} from 'react-native';
import Layout from 'components/CommonLayout';
import Footer from 'components/Footer';
import {commonStyle} from 'utils/commonStyle';
import IntroVisual from './components/IntroVisual';
import IntroList from './components/IntroList';
import BottomBtnGrop from 'components/BottomBtnGrop';

const Intro: FC = () => {
  return (
    <Layout>
      <ScrollView>
        <View style={commonStyle.container}>
          <Header />
        </View>
        <IntroVisual />
        <View style={commonStyle.container}>
          <IntroList />
          <BottomBtnGrop />
        </View>

        <Footer />
      </ScrollView>
    </Layout>
  );
};

export default Intro;
