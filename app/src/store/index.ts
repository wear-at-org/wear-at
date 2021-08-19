import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import spinner, {name as spinnerName} from 'store/spinner-store';
import toast, {name as toastName} from 'store/toast-store';
import userinfo, {name as userInfoName} from 'store/userinfo-store';
import globalpopup, {name as globalPopupName} from 'store/globalpopup-store';
import layout, {name as layoutName} from 'store/layout-store';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [spinnerName],
};

export const reducer = combineReducers({
  [spinnerName]: spinner,
  [toastName]: toast,
  [userInfoName]: userinfo,
  [globalPopupName]: globalpopup,
  [layoutName]: layout,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export {spinnerName, userInfoName, toastName, globalPopupName, layoutName};

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
