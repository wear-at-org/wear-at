import {useSelector} from 'react-redux';
import {loginProcess, logoutProcess} from 'store/userinfo-store';
import api from 'api';
import store, {userInfoName} from '../store';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {stackNavigationProp} from 'navigation/StackNavigation';
import {RootState} from 'store';

interface cookieUser {
  id: string;
  nickname: string;
  profile_image: string;
}

interface userInfoType {
  checkServiceTerms: boolean;
  checkPrivacyPolicy: boolean;
  checkReceivingConsent: boolean;
  name: string;
  email: string;
  nickname: string;
  password: string;
}

const SignHook = () => {
  let navigation = useNavigation<stackNavigationProp>();
  const userInfo = useSelector((state: RootState) => state[userInfoName]);
  const {dispatch} = store;

  const getUserFromCookie = async (): Promise<cookieUser> => {
    const saveCookie = await AsyncStorage.getItem('_watu');
    if (saveCookie)
      return (
        JSON.parse(
          decodeURIComponent(saveCookie || '')
            .split('_watu=')[1]
            .split(';')[0],
        ) || {}
      );
    return {id: '', nickname: '', profile_image: ''};
  };

  const saveEmail = async (email: string) => {
    await AsyncStorage.setItem('saveEmail', email);
  };

  const login = async (email: string, password: string, saveId: boolean) => {
    try {
      await api.post('auth/sign-in', {
        email,
        password,
      });

      const user = await getUserFromCookie();
      if (!user) {
        throw new Error("user cookie doesn't exist");
      }

      dispatch(
        loginProcess({
          info: {
            id: user.id,
            nickname: user.nickname,
            email: email,
            prividerType: 'web',
            profileImage: user.profile_image,
          },
          loginStatus: 'login',
        }),
      );

      if (saveId) {
        saveEmail(email);
      }
      navigation.navigate('Main');
    } catch (e) {
      console.log(e);
    }
  };

  const signup = async (info: userInfoType, isSns: boolean = false) => {
    try {
      if (isSns) {
        await api.post('auth/sns-sign-up', {
          ...userInfo,
        });

        navigation.navigate('Main');
      } else {
        await api.post('auth/sign-up', {
          checkServiceTerms: info.checkServiceTerms,
          checkPrivacyPolicy: info.checkPrivacyPolicy,
          checkReceivingConsent: info.checkReceivingConsent,
          name: info.name,
          email: info.email,
          nickname: info.nickname,
          password: info.password,
        });
        navigation.navigate('success');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      const {info} = userInfo;
      await api.get('auth/logout', {
        provider: info.provider,
      });

      dispatch(logoutProcess());
      navigation.navigate('Main');
    } catch (e) {
      dispatch(logoutProcess());
      navigation.navigate('Main');
    }
  };

  const changePassword = async (password: string, token: string) => {
    try {
      if (token) {
        await api.post('auth/update-password', {password, token});
        showToast({type: 'info', content: '비밀번호가 변경 되었습니다.'});
        navigation.navigate('Login');
      } else {
        await api.post('user/update-password', {password});
        showToast({type: 'info', content: '비밀번호가 변경 되었습니다.'});
        navigation.navigate('Main');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const findPassword = async () => {
    try {
      await api.post('auth/find-password', {email});
      navigation.navigate('/findPasswordSucess');
    } catch (e) {
      console.error(e);
    }
  };

  const findEmail = async ({birthday, birthmonth, birthyear, name}) => {
    try {
      const {
        data: {email},
      } = await api.post('auth/find-email', {birthday, birthmonth, birthyear, name});
      navigation.navigate('/findEmailSucess', {params: {email}});
    } catch (e) {
      showToast({type: 'error', content: e.response.data.message});
    }
  };

  return {signup, login, logout, changePassword, findPassword, findEmail};
};

export default SignHook;
