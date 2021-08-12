import React from 'react';
import { CrownOutlined } from '@ant-design/icons';

const menuList = {
	route: {
		routes: [
			{
				path: '/styleTest',
				name: '스타일 테스트',
				icon: <CrownOutlined />,
				component: 'views/styleTest',
			},
		],
	}
};

export default menuList;
