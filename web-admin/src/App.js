import React, {useEffect} from 'react';
import Routers from 'routers';
import Layout from 'components/layout';
import { useLocation, useHistory } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';
import { setUnAuthorizedCallback} from 'api';

const App = () => {
	const history = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		// TODO remove, redux 활용
		setUnAuthorizedCallback(() => {
			history.push('/login');
		});
	});

	return (
		<div className="App">
			{pathname === '/' ? (
				<Routers />
			) : (
				<ConfigProvider locale={ko_KR}>
					<Layout>
						<Routers />
					</Layout>
				</ConfigProvider>
			)}
		</div>
	);
};

export default App;
