import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import menuList from 'assets/common/menuList';
import logo from 'assets/img/logo192.png';
import { Link } from 'react-router-dom';

const Layout = (props) => {
	return (
		<div
			id="test-pro-layout"
			style={{
				height: '100vh',
			}}
		>
			<ProLayout
				logo={logo}
				{...menuList}
				onMenuHeaderClick={(e) => console.log(e)}
				menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
			>
				<div style={{ minHeight: '100vh' }}>{props.children}</div>
			</ProLayout>
		</div>
	);
};

export default Layout;
