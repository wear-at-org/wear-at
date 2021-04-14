import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const { name, reducer, actions } = createSlice({
  name: 'userinfo',
  initialState: { isLogin: false, info: { email: '', prividerType: '' } },
  reducers: {
    loginProcess(state, payload) {
      return { ...state, isLogin: true, info: payload.payload };
    },
    logoutProcess(state, payload) {
      console.log(payload);
      return { ...state, isLogin: false, info: { email: '' } };
    },
  },
  extraReducers: {},
});

const { loginProcess, logoutProcess } = actions;
export default reducer;
export { name, loginProcess, logoutProcess };
