import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import spinner, { name as spinnerName } from './spinner-store';
import toast, { name as toastName } from './toast-store';
import userinfo, { name as userInfoName } from './userinfo-store';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [spinnerName],
};

export const reducer = combineReducers({
  [spinnerName]: spinner,
  [toastName]: toast,
  [userInfoName]: userinfo,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export { spinnerName, userInfoName };

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
