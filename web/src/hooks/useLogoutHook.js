import { logoutProcess } from 'store/userinfo-store';
import store, { userInfoName } from '../store';
import api from 'api';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import toastHook from 'hooks/useToastHook';

const LogoutHook = () => {
  const history = useHistory();
  const { dispatch } = store;
  const login = useSelector((state) => state[userInfoName]);
  const {
    info,
  } = login;
  const [showToast] = toastHook({ type: '', content: '' });

  const logout = async () => {
    try {
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
  return [logout];
};

export default LogoutHook;
