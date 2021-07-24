import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toastAlertName } from 'store';
import { removeToast } from 'store/toast-store';

const ToastAlertGroup = () => {
  const dispatch = useDispatch();
  const { alertList } = useSelector((state) => state[toastAlertName]);

  return alertList.map(({ key, title }) => (
    <div className="toast" onClick={() => dispatch(removeToast({ key }))}>
      {title}
    </div>
  ));
};
export default ToastAlertGroup;
