import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'views/login';
import StyleTest from 'views/styleTest';
import StyleTestDetail from 'views/styleTest/Detail';
import StyleTestTemp from 'views/styleTestTemp';

export default function routers() {
	return (
		<Switch>
			<Route path="/" exact>
				<Redirect to="/styleTest" />
			</Route>
			<Route path="/login" exact component={Login} />
			<Route path="/styleTest" exact component={StyleTest} />
			<Route path="/styleTest/detail/:id" exact component={StyleTestDetail} />
			<Route path="/styleTestTemp" exact component={StyleTestTemp} />
		</Switch>
	);
}
