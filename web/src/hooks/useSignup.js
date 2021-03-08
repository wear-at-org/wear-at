import React, { useState } from 'react';

const useSignup = ({ name, password, email, isAgree }) => {
  const [isOk] = useState(false);
  const errorType = useState('');

  return [isOk, errorType];
};

export default useSignup;
