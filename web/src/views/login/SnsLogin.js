import React, { useState, useEffect } from 'react';
import api from 'api';
import snslogin from 'hooks/useSnsLoginHook';
const SnsLogin = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [preSnsLogin, snsLogin] = snslogin();
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await api.get('user');
      console.log(data);
    };

    getUserData();
  }, []);

  return (
    <div className="">
      <input type="text" value={email} />
      <input type="text" value={nickName} />
    </div>
  );
};

export default SnsLogin;
