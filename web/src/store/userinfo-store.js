import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const { name, reducer, actions } = createSlice({
  name: 'userinfo',
  initialState: { isLogin: false, info: { name: '', email: '' } },
  reducers: {
    loginProcess(state, payload) {
      console.log(payload);
      return { ...state, isLogin: true, info: payload.info };
    },
    logoutProcess(state) {
      return { ...state, isLogin: false, info: { name: '', email: '' } };
    },
  },
  extraReducers: {},
});

const { loginProcess, logoutProcess } = actions;
export default reducer;
export { name, loginProcess, logoutProcess };
