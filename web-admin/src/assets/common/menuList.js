import React from 'react';
import { CrownOutlined } from '@ant-design/icons';

const menuList = {
	route: {
		path: '/styleTest',
		routes: [
			{
				path: '/styleTest',
				name: '스타일 테스트',
				icon: <CrownOutlined />,
				component: 'views/styleTest',
			},
		],
	},
	location: {
		pathname: '/styleTest',
	},
};

export default menuList;
