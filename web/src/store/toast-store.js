import { createSlice } from '@reduxjs/toolkit';

const { name, reducer, actions } = createSlice({
  name: 'toast',
  initialState: { list: [] },
  reducers: {
    addToast(state, { payload }) {
      const data = { list: [...state.list, payload] };
      return data;
    },
    removeToast(state, { payload }) {
      return {
        list: [...state.list.filter((el) => el.key !== payload.key)],
      };
    },
  },
});

const { addToast, removeToast } = actions;
export default reducer;
export { name, addToast, removeToast };
