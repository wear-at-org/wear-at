import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Introservice from 'views/introservice';
import Login from 'views/login';
import Main from 'views/main';
import NotFound from 'views/notFound';
import Signup from 'views/signup';

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
