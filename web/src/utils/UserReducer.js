import { regCheckPassword, regCheckEmail } from 'utils';
import api from 'api';
import toastHook from 'hooks/useToastHook';

const [showToast, hideToast] = toastHook({ type: '', content: '' });

export const initData = {
  email: '',
  gender: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  birthday: '',
  checkEmail: false,
  checkNickName: false,
  checkPrivacyPolicy: false,
  checkServiceTerms: false,
  checkReceivingConsent: false,
  zipCode: null,
  address: null,
  detailAddress: null,
  allCheck: false,
  error: {
    emailError: {
      content: '',
      isError: false,
    },
    passwordError: {
      content: '',
      isError: false,
    },
    passwordConfirmError: {
      content: '',
      isError: false,
    },
  },
};

const checkEmail = (val) => {
  return regCheckEmail.test(val);
};

const checkPassword = (val) => {
  return regCheckPassword.test(val);
};

const checkPasswordEqual = (val, checkPassword) => {
  return checkPassword === val;
};

export const checkEmailApi = async (email, dispatch) => {
  const { status } = await api.get('user/check-email', { params: { email } });
  if (status === 200) {
    hideToast();
    showToast({ type: 'info', content: '사용 가능한 이메일 입니다.' });
    dispatch({ type: 'CHANGE_CHECK_EMAIL', checkEmail: true });
  } else {
    hideToast();
    showToast({ type: 'error', content: '사용 불가능한 이메일 입니다.' });
    dispatch({ type: 'CHANGE_CHECK_EMAIL', checkEmail: false });
  }
};

export const checkNicknameApi = async (nickname, dispatch) => {
  const { status } = await api.get('user/check-nickname', { params: { nickname } });
  if (status === 200) {
    hideToast();
    showToast({ type: 'info', content: '사용 가능한 닉네임 입니다.' });
    dispatch({ type: 'CHANGE_CHECK_NICKNAME', checkNickName: true });
  } else {
    hideToast();
    showToast({ type: 'error', content: '사용 불가능한 닉네임 입니다.' });
    dispatch({ type: 'CHANGE_CHECK_NICKNAME', checkNickName: false });
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.data,
      };
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'CHANGE_EMAIL':
      const emailError = {
        content: '',
        isError: false,
      };
      if (!checkEmail(action.email)) {
        emailError.content = '이메일 형식이 올바르지 않습니다.';
        emailError.isError = true;
      }
      return {
        ...state,
        checkEmail: false,
        email: action.email,
        error: {
          ...state.error,
          emailError,
        },
      };
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        checkNickName: false,
        nickname: action.nickname,
      };
    case 'CHANGE_PASSWORD':
      const passwordError = {
        content: '',
        isError: false,
      };
      if (!checkPassword(action.password)) {
        passwordError.content = ' 8자 이상~20자 이하 / 영문 대 소문자, 숫자, 특수문자를 사용해주세요.';
        passwordError.isError = true;
      }
      return {
        ...state,
        password: action.password,
        error: {
          ...state.error,
          passwordError,
        },
      };
    case 'CHANGE_PASSWORD_CONFIRM':
      const passwordConfirmError = {
        content: '',
        isError: false,
      };
      if (!checkPassword(action.passwordConfirm)) {
        passwordConfirmError.content = '8자 이상~20자 이하 / 영문 대 소문자, 숫자, 특수문자를 사용해주세요.';
        passwordConfirmError.isError = true;
      } else if (!checkPasswordEqual(action.passwordConfirm, action.password)) {
        passwordConfirmError.content = '비밀번호가 일치하지 않습니다.';
        passwordConfirmError.isError = true;
      } else {
        passwordConfirmError.content = '';
        passwordConfirmError.isError = false;
      }
      return {
        ...state,
        passwordConfirm: action.passwordConfirm,
        error: {
          ...state.error,
          passwordConfirmError,
        },
      };
    case 'CHANGE_CHECK_EMAIL':
      return {
        ...state,
        checkEmail: action.checkEmail,
      };
    case 'CHANGE_CHECK_NICKNAME':
      return {
        ...state,
        checkNickName: action.checkNickName,
      };
    case 'CHANGE_CHECK_ALL':
      if (action.allCheck) {
        return {
          ...state,
          allCheck: action.allCheck,
          checkPrivacyPolicy: true,
          checkReceivingConsent: true,
          checkServiceTerms: true,
        };
      } else {
        return {
          ...state,
          allCheck: action.allCheck,
          checkPrivacyPolicy: false,
          checkReceivingConsent: false,
          checkServiceTerms: false,
        };
      }
    case 'CHAHNE_PRIVACY_POLICY':
      if (!action.checkPrivacyPolicy) {
        return {
          ...state,
          allCheck: false,
          checkPrivacyPolicy: action.checkPrivacyPolicy,
        };
      } else if (action.checkPrivacyPolicy && state.checkReceivingConsent && state.checkServiceTerms) {
        return {
          ...state,
          allCheck: true,
          checkPrivacyPolicy: action.checkPrivacyPolicy,
        };
      }
      return {
        ...state,
        checkPrivacyPolicy: action.checkPrivacyPolicy,
      };

    case 'CHAHNE_RECEIVING_CONSENT':
      if (!action.checkReceivingConsent) {
        return {
          ...state,
          allCheck: false,
          checkReceivingConsent: action.checkReceivingConsent,
        };
      } else if (action.checkReceivingConsent && state.checkPrivacyPolicy && state.checkServiceTerms) {
        return {
          ...state,
          allCheck: true,
          checkReceivingConsent: action.checkReceivingConsent,
        };
      }
      return {
        ...state,
        checkReceivingConsent: action.checkReceivingConsent,
      };

    case 'CHAHNE_SERVICE_TERMS':
      if (!action.checkServiceTerms) {
        return {
          ...state,
          allCheck: false,
          checkServiceTerms: action.checkServiceTerms,
        };
      } else if (action.checkServiceTerms && state.checkPrivacyPolicy && state.checkReceivingConsent) {
        return {
          ...state,
          allCheck: true,
          checkServiceTerms: action.checkServiceTerms,
        };
      }
      return {
        ...state,
        checkServiceTerms: action.checkServiceTerms,
      };

    case 'CHANGE_ADDRESS':
      return {
        ...state,
        address: action.address,
      };

    case 'CHANGE_ZIPCODE':
      return {
        ...state,
        zipCode: action.zipCode,
      };
    case 'CHANGE_DETAIL_ADDRESS':
      return {
        ...state,
        detailAddress: action.detailAddress,
      };

    case 'CHANGE_GENDER':
      return {
        ...state,
        gender: action.gender,
      };
    default:
      return state;
  }
};
