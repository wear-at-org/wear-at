import { logoutProcess } from 'store/userinfo-store';
import store from '../store';
import api from 'api';
const LogoutHook = () => {
  const { dispatch } = store;
  const setLogout = () => {
    api.get('auth/logout');
    dispatch(logoutProcess());
  };
  return [setLogout];
};

export default LogoutHook;
