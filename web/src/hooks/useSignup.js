import React, { useState } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';
import toastHook from 'hooks/useToastHook';

const useSignup = () => {
  const history = useHistory();
  const [result] = useState(false);
  const [showToast] = toastHook({ type: '', content: '' });
  const signupProcess = async ({ name, password, email, isAgree }) => {
    try {
      await api.post('auth/sign-up', {
        checkReceivingConsent: isAgree,
        email,
        name,
        password,

        gender: null,
        nickname: 'test',
        birthday: null,
        checkPrivacyPolicy: false,
        checkServiceTerms: false,
      });

      history.push('/');
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
