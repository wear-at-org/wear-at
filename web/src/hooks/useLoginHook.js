import { useSelector } from 'react-redux';
import dummyData from 'assets/common/dummyData';
import { loginProcess } from 'store/userinfo-store';
import api from 'api';
import store, { userInfoName } from '../store';

const LoginHook = () => {
  const login = useSelector((state) => state[userInfoName]);
  const { isLogin } = login;
  const { dispatch } = store;
  const setIsLogin = (id, password) => {
    if (dummyData.login.id === id && dummyData.login.password === password) {
      const loginObj = { id, password };
      return new Promise((res) => {
        api
          .get('breeds/list/all')
          .then((item) => {
            dispatch(loginProcess(loginObj));
          })
          .then(() => {
            res(true);
          });
      });
    }
    return new Promise((res) => {
      res(false);
    });
  };
  return [isLogin, setIsLogin];
};

export default LoginHook;
