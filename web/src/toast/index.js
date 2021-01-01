import store from 'store';
import { addToastAlert, removeToastAlert } from 'store/toast-store';

const { dispatch } = store;

/**
 * 토스트를 추가한다. 토스트는 3초 뒤에 꺼진다.
 * @param {*} type success|info|warning|danger
 * @param {*} key unique key
 * @param {*} title content
 */
export const addToast = async (type, key, title) => {
  dispatch(
    addToastAlert({
      key,
      title,
      variant: type,
    }),
  );

  setTimeout(() => dispatch(removeToastAlert({ key })), 3000);
};

export const success = async (content) => {
  addToast('success', new Date().getTime(), content);
};

export const error = async (content) => {
  addToast('danger', new Date().getTime(), content);
};

export const warning = async (content) => {
  addToast('warning', new Date().getTime(), content);
};

export const info = async (content) => {
  addToast('info', new Date().getTime(), content);
};

const toast = {
  success,
  error,
  warning,
  info,
};
export default toast;
