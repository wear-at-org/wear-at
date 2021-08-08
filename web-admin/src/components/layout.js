import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import menuList from 'assets/common/menuList';
import logo from 'assets/img/logo192.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store, { userInfoName } from 'store';
import api from 'api';
import { logoutProcess } from 'store/userinfo-store';
import { Typography } from 'antd';
const { Title } = Typography;
const Layout = (props) => {
	const { loginStatus } = useSelector((state) => state[userInfoName]);
	const { dispatch } = store;
	const logout = async () => {
		try {
			await api.get(`auth/logout`, {
				provider: 'web',
			});
			dispatch(logoutProcess());
		} catch (e) {
			dispatch(logoutProcess());
		}
	};

	return loginStatus === 'login' ? (
		<div
			style={{
				height: '100vh',
			}}
		>
			<ProLayout
				menuFooterRender={() => {
					return (
						<Title
							style={{
								paddingLeft: '20px',
								color: 'white',
								fontSize: 20,
								position: 'absolute',
								bottom: '150px',
							}}
							onClick={logout}
						>
							logout
						</Title>
					);
				}}
				logo={logo}
				{...menuList}
				onMenuHeaderClick={(e) => console.log(e)}
				menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
			>
				<div style={{ minHeight: '100vh' }}>{props.children}</div>
			</ProLayout>
		</div>
	) : (
		<>{props.children}</>
	);
};

export default Layout;
