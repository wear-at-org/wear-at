import Layout from 'components/CommonLayout';
import {FC} from 'react';
import * as React from 'react';
import MainParteners from './components/MainParteners';
import MainVisual from './components/MainVisual';
import {ScrollView, View} from 'react-native';
import Footer from 'components/Footer';
import Header from 'components/Header';
import {commonStyle} from 'utils/commonStyle';
import MainCard from './components/MainCard';
import MainTip from './components/MainTip';
import BottomBtnGrop from 'components/BottomBtnGrop';

const Main: FC = () => {
  return (
    <Layout>
      <ScrollView>
        <View style={commonStyle.container}>
          <Header />
          <MainVisual />
          <MainCard />
          <MainParteners />
          <MainTip />
          <BottomBtnGrop />
        </View>
        <Footer />
      </ScrollView>
    </Layout>
  );
};

export default Main;
