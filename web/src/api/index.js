import axios from 'axios';
import store from 'store';
import { addAsyncCountValue, minusAsyncCountValue } from 'store/spinner-store';
import toastHook from 'hooks/useToastHook';
import popupHook from 'hooks/usePopupHook';

const BASE_URL = process.env.REACT_APP_API;
const { dispatch } = store;

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

// axios 함수 호출 전 실행되는 함수
Axios.interceptors.request.use(
  (config) => {
    dispatch(addAsyncCountValue());
    return config;
  },
  (error) => Promise.reject(error),
);

// api 실행 후 response를 감지하여 데이터를 return
Axios.interceptors.response.use(
  (response) => {
    // 로딩 창을 끔
    dispatch(minusAsyncCountValue());
    return response;
  },
  (error) => {
    const [showToast] = toastHook();
    const [showPopup] = popupHook();
    // 추후 403, 400, 500등 에러 발생시 에러처리
    // 토큰 재발급도 이곳에서
    dispatch(minusAsyncCountValue());
    const errorStatus = error.response.status;

    // 소셜 로그인 후 필수 항목을 입력 하지 않았을 경우
    if (errorStatus === 401) {
      showPopup({
        title: `로그인을 하시면 더 많은 콘텐츠를 \n 구경도 스크랩도 하실 수 있어요.`,
        btnMsg: '회원가입 및 로그인',
        goLink: '/login',
      });
    }

    // 소셜 로그인 후 필수 항목을 입력 하지 않았을 경우
    // TODO sns login 실패했는데 쿠키가 구워지는 현상 발생 시 재논의
    // if (errorStatus === 403) {
    //   showPopup({
    //     title: `SNS 회원 가입을 마무리하여 주세요.`,
    //     btnMsg: '회원가입',
    //     goLink: '/sns-login',
    //   });
    // }

    // 로그인 필요 시
    if (errorStatus === 409) {
      showToast({ type: 'error', content: '중복 된 이메일 입니다.' });
    }
    // 로그인 필요 시
    // if (errorStatus === 401) {
    //   showToast({ type: 'error', content: '로그인이 필요합니다.' });
    //   window.location = '/';
    // }

    return Promise.reject(error);
  },
);

export default Axios;
