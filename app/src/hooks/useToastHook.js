import store from '../store';
import {addToast, removeToast} from 'store/toast-store';

const toastHook = () => {
  const {dispatch} = store;
  const showToast = ({type = '', content = ''}) => {
    dispatch(addToast({type, content}));
  };

  const hideToast = () => {
    dispatch(removeToast());
  };
  return [showToast, hideToast];
};

export default toastHook;
