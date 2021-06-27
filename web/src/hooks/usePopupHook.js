import store from '../store';
import { addPopup, removePopup } from 'store/globalpopup-store';

const popupHook = () => {
  const { dispatch } = store;
  const showPopup = ({ title = '', btnMsg = '', goLink = '/' }) => {
    dispatch(addPopup({ title, btnMsg, goLink }));
  };

  const hidePopup = () => {
    dispatch(removePopup());
  };
  return [showPopup, hidePopup];
};

export default popupHook;
