import { logoutProcess } from 'store/userinfo-store';
import store, { userInfoName } from '../store';
import api from 'api';
import { useSelector } from 'react-redux';

const LogoutHook = () => {
  const { dispatch } = store;
  const login = useSelector((state) => state[userInfoName]);
  const { info } = login;
  const setLogout = () => {
    api.get(`auth/logout`).then((item) => {
      dispatch(logoutProcess(info));
    });
  };
  return [setLogout];
};

export default LogoutHook;
