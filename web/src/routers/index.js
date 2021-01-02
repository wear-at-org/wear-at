import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from 'views/Overview/Overview';
import Subscribe from 'views/Subscribe/Subscribe';
import NotFound from 'views/NotFound';

export default function routers() {
  return (
    <Switch>
      <Route path="/" exact component={Overview} />
      <Route path="/subscribe" exact component={Subscribe} />
      <Route component={NotFound} />
    </Switch>
  );
}
