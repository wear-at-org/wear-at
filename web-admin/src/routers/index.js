import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'views/login';
import StyleTest from 'views/styleTest';
import StyleTestDetail from 'views/styleTest/Detail';
import StyleTestTemp from 'views/styleTestTemp';
import ProvideAuth from './ProvideAuth';

export default function routers() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<ProvideAuth path="/styleTest" exact>
				<Route path="/styleTest" exact component={StyleTest} />
			</ProvideAuth>
			<ProvideAuth path="/styleTest/detail/:id">
				<Route path="/styleTest/detail/:id" exact component={StyleTestDetail} />
			</ProvideAuth>
			<Route path="/styleTestTemp" exact component={StyleTestTemp} />
		</Switch>
	);
}
