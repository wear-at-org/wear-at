import { createSlice } from '@reduxjs/toolkit';

const { name, reducer, actions } = createSlice({
  name: 'userinfo',
  initialState: { isLogin: false, info: { name: '', email: '' } },
  reducers: {
    loginProcess(state, payload) {
      console.log(payload);
      return { ...state, isLogin: true, info: payload.info };
    },
  },
});

const { loginProcess } = actions;
export default reducer;
export { name, loginProcess };
