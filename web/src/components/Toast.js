import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { removeToast } from 'store/toast-store';
import store, { toastName } from '../store';
import errorWhite from 'assets/img/error-white.svg';

const Toast = () => {
  const toast = useSelector((state) => state[toastName]);
  const { dispatch } = store;
  const { isActive, type, content } = toast;
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        dispatch(removeToast());
      }, 2500);
    }
  }, [isActive, dispatch]);

  return (
    <div className={isActive ? `toast-container active ${type}` : 'toast-container'}>
      <div className="content">
        <div className="">
          <img src={errorWhite} alt="error-white" />
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Toast;
