import {createSlice} from '@reduxjs/toolkit';

const {name, reducer, actions} = createSlice({
  name: 'toast',
  initialState: {isActive: false, type: '', content: ''},
  reducers: {
    addToast(_, {payload}) {
      return {isActive: true, ...payload};
    },
    removeToast(_) {
      return {isActive: false, type: '', content: ''};
    },
  },
});

const {addToast, removeToast} = actions;
export default reducer;
export {name, addToast, removeToast};
