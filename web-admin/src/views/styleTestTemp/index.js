import React, { useState, useEffect } from 'react';
import ProList from '@ant-design/pro-list';
import { Typography } from 'antd';
import api from 'api';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Button, message } from 'antd';

const { Title } = Typography;

const StyleTest = () => {
	const [stylesTestList, setStyleTestList] = useState([]);
	const [itemsStr, setItemsStr] = useState("");

	const getStyleTestList = async () => {
		const resp = await api.get(`subscribe/not-recommended?size=50&page=0`);
		if (resp && resp.data) {
			return resp.data.content;
		}
		return [];
	}

	const initializeItems = () => {
		const initialItems = [
			{
				"title":"test title 1",
				"imageUrl": "https://test-image.com",
				"linkUrl": "https://test-link.com",
				"brand": "test brand 1",
				"price": 1000
			},
			{
				"title":"test title 2",
				"imageUrl": "https://test-image.com",
				"linkUrl": "https://test-link.com",
				"brand": "test brand 2",
				"price": 2000
			},
		];

		setItemsStr(JSON.stringify(initialItems, null, 2));
	}

	const recommend = async (id) => {
		try {
			const items = JSON.parse(itemsStr);
			
			const payload = {
				subscribeId: id,
				completed: true,
				items: items,
			};
			await api.post(`recommend`, payload);

			message.info("성공적으로 처리되었습니다.");
			
			const result = await getStyleTestList();
			setStyleTestList(result);

		} catch (e) {
			message.error(e.response && e.response.data ? e.response.data.message : e.message);
		}
	}

	useEffect(() => {
    const loadItems = async () => {
			const result = await getStyleTestList();
			setStyleTestList(result);
		}
		loadItems();
		initializeItems();
  }, []);


	return (
		<div style={{
			display: "flex",
			flexDirection: "row",
			flex: "1 0 auto",
			height: "100%",
		}}>
			<div style={{
				
				flex: "1 0 auto",
				height: "100%",
				

			}}>
				<ProList
					pagination={{
						defaultPageSize: 10,
						showSizeChanger: true,
					}}
					metas={{
						title: { render: (text, row) => {
							return `style test ID: ${row.id}`;
						} },
						description: {
							render: (text, row) => {
								return `userID: ${row.user.id}, nickname: ${row.user.nickname}, date: ${row.subscribeAt}`;
							}
					}}}
					headerTitle={
						<div className="mb10">
							<Title level={4}>스타일 테스트 리스트</Title>
						</div>
					}
					dataSource={stylesTestList}
				/>
			</div>
			<div style={{
				flex: "1 0 auto",
				height: "100%",
				padding: "10px"
			}}>
				<ProForm
					onFinish={(values) => {
						recommend(values.id);
					}}
					submitter={{
						searchConfig: {
							submitText: '저장',
						},
						render: (_, dom) => dom.pop(),
						submitButtonProps: {
							size: 'large',
							style: {
								width: '100%',
							},
						},
					}}
				>
					<h1
						style={{
							textAlign: 'center',
						}}
					>
						추천 입력
					</h1>
					<ProFormText
						name="id"
						label="스타일테스트 아이디"
						placeholder="아이디"
						rules={[
							{
								required: true,
								message: '아이디를 입력해주세요.',
							},
						]}
					/>
					<ProFormTextArea
						style={{
							height: '500px',
							minHeight: '500px',
							maxHeight: '500px'
						}}
						name="data"
						label="추천아이템 입력"
						fieldProps={{
							autoSize:{ minRows: 20, maxRows: 20 },
							value: itemsStr,
							onChange: (e) => setItemsStr(e.target.value)
						}}	
						placeholder="data"
					/>
				</ProForm>
				<Button
					style={{
						width: '100%',
						marginTop:"5px"
					}}
					onClick={() => {
						initializeItems();
					}}
				>
					추천 아이템 초기화
				</Button>
			</div>
		</div>
	);
};

export default StyleTest;
