import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'views/login';
import StyleTest from 'views/styleTest';
import StyleTestDetail from 'views/styleTest/Detail';

export default function routers() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/styleTest" exact component={StyleTest} />
			<Route path="/styleTest/detail/:id" exact component={StyleTestDetail} />
		</Switch>
	);
}
