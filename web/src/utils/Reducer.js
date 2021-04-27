import { regCheckPassword, regCheckEmail } from 'utils';
import api from 'api';

export const initData = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  birthday: null,
  checkEamil: false,
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

export const userReducer = async (state, action) => {
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
    case 'CHANGE_CKECKEMAIL':
      return {
        ...state,
        checkEmail: true,
      };
    case 'CHANGE_NICKNAME':
      return state - 1;
    case 'CHANGE_ZIPCODE':
      return state - 1;
    case 'CHANGE_ADDRESS':
      return state - 1;
    case 'CHANGE_ADDRESS_DETAIL':
      return state - 1;
    case 'CHANGE_GENDER':
      return state - 1;
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
