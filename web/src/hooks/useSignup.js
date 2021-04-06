import React, { useState } from 'react';
import api from 'api';
import { Link, useHistory } from 'react-router-dom';

const useSignup = () => {
  const history = useHistory();
  const [result, setResult] = useState(false);
  const errorType = useState('');
  const signupProcess =async  ({name, password, email, isAgree}) => {
    const result = await api.post('auth/sign-up',{
      checkReceivingConsent: isAgree,
      email,
      name,
      password,

      gender : 'none',
      nickname : 'none',
      birthday : 'none',
      checkPrivacyPolicy: true,
      checkServiceTerms: true,
    })

    if(result.status === 200) {
      history.push('/');
    }
  }


  return [signupProcess, result];
};

export default useSignup;
