import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userInfoName } from '../store';

const ProvideAuth = ({ children, ...rest }) => {
  const { isLogin } = useSelector((state) => state[userInfoName]);
  return (
    isLogin ? null : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    )
  );
};

export default ProvideAuth;
