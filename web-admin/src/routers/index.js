import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'views/login';
import StyleTest from 'views/styleTest';
import StyleTestDetail from 'views/styleTest/Detail';
import ProvideAuth from './ProvideAuth';

export default function routers() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<ProvideAuth path="/styleTest" exact>
				<Route path="/styleTest" exact component={StyleTest} />
			</ProvideAuth>
			<ProvideAuth path="/styleTest/detail/:subscribeId">
				<Route
					path="/styleTest/detail/:subscribeId"
					exact
					component={StyleTestDetail}
				/>
			</ProvideAuth>
		</Switch>
	);
}
