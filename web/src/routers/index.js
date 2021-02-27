import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Introservice from 'views/Introservice';
import Login from 'views/Login';
import Main from 'views/Main';
import NotFound from 'views/NotFound';
import Signup from 'views/Signup';

export default function routers() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/intro" exact component={Introservice} />
      <Route component={NotFound} />
    </Switch>
  );
}
