import React from 'react';
import Routers from 'routers';
import Layout from 'components/layout';
import { useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';

const App = () => {
	const { pathname } = useLocation();
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
