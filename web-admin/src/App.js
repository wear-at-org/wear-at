import React from 'react';
import Routers from 'routers';
import Layout from 'components/layout';
import { ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';

const App = () => {
	return (
		<div className="App">
			<ConfigProvider locale={ko_KR}>
				<Layout>
					<Routers />
				</Layout>
			</ConfigProvider>
		</div>
	);
};

export default App;
