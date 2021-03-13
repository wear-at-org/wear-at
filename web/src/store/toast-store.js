import { createSlice } from '@reduxjs/toolkit';

const { name, reducer, actions } = createSlice({
  name: 'toast',
  initialState: { isActive: false, type: '', content: '' },
  reducers: {
    addToast(state, { payload }) {
      return { isActive: true, ...payload };
    },
    removeToast(state) {
      return { isActive: false, type: '', content: '' };
    },
  },
});

const { addToast, removeToast } = actions;
export default reducer;
export { name, addToast, removeToast };
