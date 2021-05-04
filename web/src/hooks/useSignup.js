import React, { useState } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';
import toastHook from 'hooks/useToastHook';

const useSignup = () => {
  const history = useHistory();
  const [result] = useState(false);
  const [showToast] = toastHook({ type: '', content: '' });
  const signupProcess = async (userInfo) => {
    console.log(userInfo);
    try {
      await api.post('auth/sign-up', {
        ...userInfo,
      });

      history.push('/success');
    } catch (e) {
      if (e.response && e.response.data) {
        showToast({ type: 'error', content: e.response.data.message });
      } else {
        showToast({ type: 'error', content: e.message });
      }
    }
  };

  return [signupProcess, result];
};

export default useSignup;
