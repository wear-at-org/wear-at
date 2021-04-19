import { useSelector } from 'react-redux';
import { loginProcess } from 'store/userinfo-store';
import api from 'api';
import store, { userInfoName } from '../store';
import toastHook from 'hooks/useToastHook';
import { LoginError } from 'assets/common/error.json';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const SnsLoginHook = () => {
  const history = useHistory();
  const login = useSelector((state) => state[userInfoName]);
  const { isLogin } = login;
  const { dispatch } = store;
  const [showToast, hideToast] = toastHook({ type: '', content: '' });
  const setIsSnsLogin = (email, password, saveId) => {
    return new Promise((res) => {
      api
        .post('auth/sign-in', {
          email,
          password,
        })
        .then((item) => {
          hideToast();
          if (item.status === 200) {
            if (saveId) {
              const cookies = new Cookies();
              cookies.set('saveEmail', email, { path: '/' });
            }
            const info = {
              email,
            };
            dispatch(loginProcess(info));
            history.push('/');
          }
        })
        .catch((e) => {
          showToast({ type: 'error', content: LoginError.loginError });
        });
    });
  };
  return [isLogin, setIsSnsLogin];
};

export default SnsLoginHook;
