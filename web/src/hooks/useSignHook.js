import { useSelector } from 'react-redux';
import { loginProcess, logoutProcess } from 'store/userinfo-store';
import api from 'api';
import store, { userInfoName } from '../store';
import toastHook from 'hooks/useToastHook';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const SignHook = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state[userInfoName]);
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

  const signup = async (userInfo, isSns = false) => {
    try {
      if (isSns) {
        console.log(userInfo);
        await api.post('auth/sns-sign-up', {
          ...userInfo,
        });

        history.push('/');
      } else {
        await api.post('auth/sign-up', {
          ...userInfo,
        });

        history.push('/success');
      }
    } catch (e) {
      if (e.response && e.response.data) {
        showToast({ type: 'error', content: e.response.data.message });
      } else {
        showToast({ type: 'error', content: e.message });
      }
    }
  };

  const logout = async () => {
    try {
      const { info } = userInfo;
      await api.get(`auth/logout`, {
        provider: info.provider,
      });

      dispatch(logoutProcess());
      history.push('/');
    } catch (e) {
      if (e.response && e.response.data) {
        showToast({ type: 'error', content: e.response.data.message });
      } else {
        showToast({ type: 'error', content: e.message });
      }
    }
  };

  return { signup, login, logout };
};

export default SignHook;