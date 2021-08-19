import {createSlice} from '@reduxjs/toolkit';

const {name, reducer, actions} = createSlice({
  name: 'popup',
  initialState: {isActive: false, title: '', btnMsg: '', goLink: 'Main'},
  reducers: {
    addPopup(_, {payload}) {
      return {isActive: true, ...payload};
    },
    removePopup(_) {
      return {isActive: false, title: '', btnMsg: '', goLink: '/'};
    },
  },
});

const {addPopup, removePopup} = actions;
export default reducer;
export {name, addPopup, removePopup};
