const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.data,
      };
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

export default reducer;
