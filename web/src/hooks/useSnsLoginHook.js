import { useSelector } from 'react-redux';
import { loginProcess } from 'store/userinfo-store';
import store, { userInfoName } from '../store';
import toastHook from 'hooks/useToastHook';
import { useHistory } from 'react-router-dom';

const SnsLoginHook = () => {
  const history = useHistory();
  const login = useSelector((state) => state[userInfoName]);
  const { isLogin } = login;
  const { dispatch } = store;
  const [showToast, hideToast] = toastHook({ type: '', content: '' });
  const snsLogin = () => {
    try {
      history.push('/');
    } catch (e) {
      if (e.response && e.response.data) {
        showToast({ type: 'error', content: e.response.data.message });
      } else {
        showToast({ type: 'error', content: e.message });
      }
    }
  };

  const preSnsLogin = ({ provider }) => {
    dispatch(
      loginProcess({
        info: {
          nickname: null,
          prividerType: provider,
        },
        loginStatus: 'ing',
      }),
    );
  };
  return [preSnsLogin, snsLogin];
};

export default SnsLoginHook;
