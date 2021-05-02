import { regCheckPassword, regCheckEmail } from 'utils';
import api from 'api';

export const initData = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  birthday: null,
  checkEmail: false,
  checkNickName: false,
  checkPrivacyPolicy: false,
  checkServiceTerms: false,
  zipCode: null,
  address: null,
  detailAddress: null,
  error: {
    emailError: {
      content: '',
      isError: false,
    },
    passwordError: {
      content: '',
      isError: false,
    },
    checkPasswordError: {
      content: '',
      isError: false,
    },
    nicknameError: {
      content: '',
      isError: false,
    },
  },
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.data,
      };
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    case 'CHANGE_PASSWORD_CONFIRM':
      return {
        ...state,
        passwordConfirm: action.passwordConfirm,
      };
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        nickname: action.nickname,
      };
    case 'CHANGE_CKECK_EMAIL':
      return {
        ...state,
        error: {
          ...state.error,
          emailError: {
            content: action.content,
            isError: action.isError,
          },
        },
      };
    case 'CHANGE_CHECK_NICKNAME':
      return {
        ...state,
        error: {
          ...state.error,
          nicknameError: {
            content: action.content,
            isError: action.isError,
          },
        },
      };
    default:
      return state;
  }
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
