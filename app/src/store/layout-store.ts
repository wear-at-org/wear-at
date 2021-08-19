import {createSlice} from '@reduxjs/toolkit';

const {name, reducer, actions} = createSlice({
  name: 'layout',
  initialState: {drawerStatus: false, searchStatus: false},
  reducers: {
    changeDrawerStatus(state, {payload}) {
      return {...state, drawerStatus: payload};
    },

    showSearch(state) {
      return {...state, searchStatus: true};
    },
    hideSearch(state) {
      return {...state, searchStatus: false};
    },
  },
});

const {changeDrawerStatus, showSearch, hideSearch} = actions;
export default reducer;
export {name, changeDrawerStatus, showSearch, hideSearch};
