import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userInfoName } from '../store';

const ProvideAuth = ({ children, ...rest }) => {
  const { isLogin } = useSelector((state) => state[userInfoName]);
  console.log(children);
  console.log(rest);
  console.log('isLogin');
  console.log(isLogin);
  return (
    <Route
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

export default ProvideAuth;
