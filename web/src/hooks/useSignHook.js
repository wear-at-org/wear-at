import { useSelector } from 'react-redux';
import { loginProcess, logoutProcess } from 'store/userinfo-store';
import api from 'api';
import store, { userInfoName } from '../store';
import toastHook from 'hooks/useToastHook';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const SignHook = () => {
  let history = useHistory();
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

  const login = async (email, password, saveId, callbackUrl) => {
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
            profileImage: user.profileImage,
          },
          loginStatus: 'login',
        }),
      );

      if (saveId) {
        saveEmail(email);
      }

      if (callbackUrl) {
        hideToast();
        history.replace(callbackUrl);
      } else {
        hideToast();
        history.push('/');
      }
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

  const changePassword = async (password) => {
    await api.post('auth/update-password', { password });
  };

  const findPassword = async (password, token) => {
    await api.post('auth/find-password', { password, token });
  };

  const findEmail = async ({ birthday, birthmonth, birthyear, name }) => {
    try {
      const {
        data: { email },
      } = await api.post('auth/find-email', { birthday, birthmonth, birthyear, name });
      history.push('/findEmailSucess', { params: { email } });
    } catch (e) {
      showToast({ type: 'error', content: e.response.data.message });
    }
  };

  return { signup, login, logout, changePassword, findPassword, findEmail };
};

export default SignHook;
