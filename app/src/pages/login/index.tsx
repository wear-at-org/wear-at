import React, {useState} from 'react';
import SignHook from 'hooks/useSignHook';
import {View, TextInput, StyleSheet, Link} from 'react-native';
import Layout from 'components/CommonLayout';
import {Color, margin} from 'utils/commonStyle';
import CommonBtn from 'components/CommonBtn';
import {ScrollView} from 'react-native-gesture-handler';
import Footer from 'components/Footer';
import Header from 'components/Header';
import api from 'api';

const Login = () => {
  const [email, setEmail] = useState('rnwk34@nate.com');
  const [password, setPassword] = useState('P@ssw0rd');
  const {login} = SignHook();

  const snsLogin = async (provider: string) => {
    console.log(provider);
    const {
      data: {url},
    } = await api.get(`auth/url?provider=kakao`);

    console.log(url);
    await Link.openURL(url);
  };

  const loginProcess = async () => {
    login(email, password, false);
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <View style={{...margin(8, 'bottom'), ...margin(24, 'top')}}>
            <TextInput
              style={styles.commonInput}
              value={email}
              keyboardType="email-address"
              placeholder="이메일 아이디"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{...margin(30, 'bottom')}}>
            <TextInput
              style={styles.commonInput}
              value={password}
              keyboardType="default"
              placeholder="비밀번호"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{...margin(30, 'bottom')}}>
            <CommonBtn btnTxt={'로그인'} btnType={'type1'} onPress={snsLogin} />
          </View>
          <View style={{...margin(30, 'bottom')}}>
            <CommonBtn btnTxt={'회원가입'} btnType={'type2'} />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </Layout>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 25},

  commonInput: {
    height: 48,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Color.graye0e0,
    borderRadius: 5,
  },
});
