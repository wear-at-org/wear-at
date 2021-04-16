import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindIdPassword from 'views/findIdPassword';
import Introservice from 'views/introservice';
import Login from 'views/login';
import Main from 'views/main';
import Mypage from 'views/mypage';
import NotFound from 'views/notFound';
import Signup from 'views/signup';
import ProvideAuth from './ProvideAuth';
import SnsLogin from 'views/login/SnsLogin';

export default function routers() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/intro" component={Introservice} />
      <Route path="/findIdPassword" component={FindIdPassword} />
      <Route path="/sns-login" component={SnsLogin} />
      <ProvideAuth path="/mypage">
        <Mypage />
      </ProvideAuth>
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
