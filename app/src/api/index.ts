import axios, {AxiosResponse, AxiosInstance, AxiosRequestConfig} from 'axios';
import store from 'store';
import {addAsyncCountValue, minusAsyncCountValue} from 'store/spinner-store';
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = 'http://34.64.199.3/v1/';
const {dispatch} = store;

console.log(BASE_URL);

const Axios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

Axios.interceptors.request.use(async (config: any) => {
  const cookie = await AsyncStorage.getItem('_watu');
  if (cookie) {
    config.headers.Cookie = cookie;
  }
  return config;
});

// axios 함수 호출 전 실행되는 함수
Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    dispatch(addAsyncCountValue());
    return config;
  },
  (error: any) => Promise.reject(error),
);

// api 실행 후 response를 감지하여 데이터를 return
Axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 로딩 창을 끔
    const cookie = await AsyncStorage.getItem('_watu');
    if (!cookie) {
      AsyncStorage.setItem('_watu', response.headers['set-cookie'][0]);
    }
    dispatch(minusAsyncCountValue());
    return response;
  },
  (error: any) => {
    // 추후 403, 400, 500등 에러 발생시 에러처리
    // 토큰 재발급도 이곳에서
    dispatch(minusAsyncCountValue());
    const errorStatus = error.response.status;

    // 소셜 로그인 후 필수 항목을 입력 하지 않았을 경우

    // 소셜 로그인 후 필수 항목을 입력 하지 않았을 경우
    // TODO sns login 실패했는데 쿠키가 구워지는 현상 발생 시 재논의
    // if (errorStatus === 403) {
    //   showPopup({
    //     title: `SNS 회원 가입을 마무리하여 주세요.`,
    //     btnMsg: '회원가입',
    //     goLink: '/sns-login',
    //   });
    // }

    // 중복 된 이메일 입니다.
    if (errorStatus === 409) {
      console.log('중복 된 이메일 입니다.');
    }
    // 로그인 필요 시
    if (errorStatus === 401) {
      console.log('401');
    }

    // 로그인 필요 시
    if (errorStatus === 500) {
      console.log('500');
    }

    return Promise.reject(error);
  },
);

export default Axios;
