import { useSelector } from 'react-redux';
import { loginProcess } from 'store/userinfo-store';
import api from 'api';
import store, { userInfoName } from '../store';
import toastHook from 'hooks/useToastHook';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const LoginHook = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state[userInfoName]);
  const { isLogin } = userInfo;
  const { dispatch } = store;
  const [showToast, hideToast] = toastHook({ type: '', content: '' });

  const getUserFromCookie = () => {
    const cookies = new Cookies();
    return cookies.get('_watu');
  };

  const saveEmail = (email) => {
    const cookies = new Cookies();
    cookies.set('saveEmail', email, { path: '/' });
  };

  const login = async (email, password, saveId) => {
    try {
      await api.post('auth/sign-in', {
        email,
        password,
      });

      const user = getUserFromCookie();
      if (!user) {
        throw new Error("user cookie doesn't exist");
      }

      dispatch(
        loginProcess({
          info: {
            id: user.id,
            nickname: user.nickname,
            email: email,
            prividerType: 'web',
          },
          loginStatus: 'login',
        }),
      );

      if (saveId) {
        saveEmail(email);
      }

      hideToast();
      history.push('/');
    } catch (e) {
      if (e.response && e.response.data) {
        showToast({ type: 'error', content: e.response.data.message });
      } else {
        showToast({ type: 'error', content: e.message });
      }
    }
  };
  return [isLogin, login];
};

export default LoginHook;
