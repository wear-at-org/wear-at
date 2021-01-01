import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toastAlertName } from 'store';
import { removeToast } from 'store/toast-store';

const ToastAlertGroup = () => {
  const dispatch = useDispatch();
  const { alertList } = useSelector((state) => state[toastAlertName]);

  return (
    alertList.map((key) => <div onKeyPress={() => dispatch(removeToast({ key }))} role="button" />)
  );
};
export default ToastAlertGroup;
