import * as React from 'react';
import {checkNicknameApi} from 'utils/UserReducer';
import {Picker} from '@react-native-picker/picker';
import Postcode from '@actbase/react-daum-postcode';
import {View, ScrollView} from 'react-native';
import Header from 'components/Header';
import Layout from 'components/CommonLayout';
import {commonStyle} from 'utils/commonStyle';

const Mypage = () => {
  return (
    <Layout>
      <ScrollView>
        <View style={commonStyle.container}>
          <Header />
          <Postcode style={{width: '100%', height: 320}} onSelected={(data) => console.log(JSON.stringify(data))} />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Mypage;
