import React, { useState, useEffect } from 'react';
import api from 'api';

const SnsLogin = () => {
  useEffect(() => {
    const getUserData = async () => {
      const data = await api.get('user');
      console.log(data);
    };
    getUserData();
  }, []);
  return <div className=""></div>;
};

export default SnsLogin;
