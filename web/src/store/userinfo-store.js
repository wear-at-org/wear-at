import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const { name, reducer, actions } = createSlice({
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
    loginProcess(state, { payload }) {
      return { ...state, loginStatus: payload.loginStatus, info: payload.info };
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
  },
  extraReducers: {},
});

const { loginProcess, logoutProcess } = actions;
export default reducer;
export { name, loginProcess, logoutProcess };
