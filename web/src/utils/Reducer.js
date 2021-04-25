export const userReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.data,
      };
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'CHANGE_YEAR':
      return state - 1;
    case 'CHANGE_MONTH':
      return state - 1;
    case 'CHANGE_DAY':
      return state - 1;
    case 'CHANGE_NICKNAME':
      return state - 1;
    case 'CHANGE_ZIPCODE':
      return state - 1;
    case 'CHANGE_ADDRESS':
      return state - 1;
    case 'CHANGE_ADDRESS_DETAIL':
      return state - 1;
    case 'CHANGE_GENDER':
      return state - 1;
    default:
      return state;
  }
};
