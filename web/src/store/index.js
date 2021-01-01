import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import spinner, { name as spinnerName } from './spinner-store';
import toast, { name as toastName } from './toast-store';

export const reducer = combineReducers({
  [spinnerName]: spinner,
  [toastName]: toast,
});

export { spinnerName };

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
