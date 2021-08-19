import {createSlice} from '@reduxjs/toolkit';

const {name, reducer, actions} = createSlice({
  name: 'spinner',
  initialState: {count: 0},
  reducers: {
    addAsyncCountValue(state) {
      return {count: state.count + 1};
    },
    minusAsyncCountValue(state) {
      return {count: state.count > 0 ? state.count - 1 : state.count};
    },
  },
});

const {addAsyncCountValue, minusAsyncCountValue} = actions;
export default reducer;
export {name, addAsyncCountValue, minusAsyncCountValue};
