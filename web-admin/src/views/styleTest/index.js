import React from 'react';
import ProList from '@ant-design/pro-list';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;
const data = [
	{
		id: 2,
		imgList: [
			'https://t1.kakaocdn.net/friends/prod/main_tab/feed/media/media_0_20210715124629.jpg',
		],
		author: '라이언',
		updateAt: '2021.08.03 10:12:32',
		status: '신규 접수',
	},
	{
		id: 1,
		imgList: [
			'https://cdn.eyesmag.com/content/uploads/posts/2020/02/25/sundayryan_ep_01_thum-ea017180-076d-4970-b012-229cd996ea8a.jpg',
			'https://t1.kakaocdn.net/friends/prod/main_tab/feed/media/media_0_20210723165329.jpg',
		],
		author: '어피치',
		updateAt: '2021.08.03 10:12:32',
		status: '완료',
	},
].map((item) => ({
	title: (
		<Link to={`styleTest/detail/${item.id}`}>
			<div className="img-container">
				{item.imgList.map((img) => {
					return (
						<img key={uuidv4()} className="list-img-size" src={img} alt="img" />
					);
				})}
			</div>
		</Link>
	),
	content: (
		<div
			style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'flex-end',
			}}
		>
			<div className="mr20">
				<Title level={5}>{item.status}</Title>
			</div>
			<div className="mr20">
				<Title level={5}>{item.author}</Title>
			</div>
			<div className="mr20">
				<Title level={5}>{item.updateAt}</Title>
			</div>
		</div>
	),
}));

const StyleTest = () => {
	return (
		<div>
			<ProList
				pagination={{
					defaultPageSize: 10,
					showSizeChanger: true,
				}}
				metas={{
					title: {},
					content: {},
				}}
				headerTitle={
					<div className="mb10">
						<div className="mb20">
							<Title level={4}>스타일 테스트 리스트</Title>
						</div>
						<div className="d-flex x-end">
							<Radio.Group
								onChange={(e) => {
									console.log(e.target.value);
								}}
							>
								<Radio value={1}>신규 접수</Radio>
								<Radio value={2}>완료</Radio>
							</Radio.Group>
						</div>
					</div>
				}
				dataSource={data}
			/>
		</div>
	);
};

export default StyleTest;
