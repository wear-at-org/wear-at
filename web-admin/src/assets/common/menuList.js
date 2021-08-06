import React from 'react';
import { CrownOutlined, LikeOutlined } from '@ant-design/icons';

const menuList = {
	route: {
		routes: [
			{
				path: '/styleTest',
				name: '스타일 테스트',
				icon: <CrownOutlined />,
				component: 'views/styleTest',
			},
			{
				path: '/styleTestTemp',
				name: '추천 [임시]',
				icon: <LikeOutlined />,
				component: 'views/styleTestTemp',
			},
		],
	}
};

export default menuList;
