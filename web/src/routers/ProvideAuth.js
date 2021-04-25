import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userInfoName } from '../store';

const ProvideAuth = ({ children, ...rest }) => {
  const { loginStatus } = useSelector((state) => state[userInfoName]);
  return (
    <Route
      render={({ location }) =>
        loginStatus === 'login' ? (
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
