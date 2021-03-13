import { logoutProcess } from 'store/userinfo-store';
import store from '../store';

const LogoutHook = () => {
  const { dispatch } = store;
  const setLogout = () => {
    dispatch(logoutProcess());
  };
  return [setLogout];
};

export default LogoutHook;
