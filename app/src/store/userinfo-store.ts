import {createSlice} from '@reduxjs/toolkit';

const {name, reducer, actions} = createSlice({
  name: 'userinfo',
  initialState: {
    loginStatus: '',
    info: {
      userId: '',
      nickname: '',
      email: '',
      provider: '',
      profileImage: '',
    },
  },
  reducers: {
    loginProcess(state, {payload}) {
      return {...state, loginStatus: payload.loginStatus, info: payload.info};
    },
    logoutProcess(state) {
      return {
        ...state,
        loginStatus: '',
        info: {
          userId: '',
          nickname: '',
          email: '',
          provider: '',
          profileImage: '',
        },
      };
    },
    changeProfile(state, {payload}) {
      return {
        ...state,
        info: {
          ...state.info,
          profileImage: payload.profileImage,
        },
      };
    },
  },
});

const {loginProcess, logoutProcess, changeProfile} = actions;
export default reducer;
export {name, loginProcess, logoutProcess, changeProfile};
