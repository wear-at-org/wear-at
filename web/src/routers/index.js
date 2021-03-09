import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Introservice from 'views/introservice';
import Login from 'views/login';
import Main from 'views/main';
import Mypage from 'views/mypage';
import NotFound from 'views/notFound';
import Signup from 'views/signup';
import ProvideAuth from './ProvideAuth';

export default function routers() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/intro" component={Introservice} />
      <ProvideAuth path="/mypage" component={Mypage} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
