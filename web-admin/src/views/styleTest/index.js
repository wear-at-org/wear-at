import React, { useState, useEffect } from 'react';
import { Typography, Pagination } from 'antd';
import api from 'api';
import { columns } from './componets/ListDataInfo';
import { Table, Radio } from 'antd';
const { Title } = Typography;

const StyleTest = () => {
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState({
		pageSize: 20,
		current: 0,
		totalPages: 1,
		status: 'not-recommended',
	});
	useEffect(() => {
		const getData = async () => {
			let preurl = '';
			if (filter.status !== 'not-recommended') {
				preurl = `stylelist?${filter.status}&size=${filter.pageSize}&page=${filter.current}`;
			} else {
				preurl = `${filter.status}?size=${filter.pageSize}&page=${filter.current}`;
			}
			const { data } = await api.get(`subscribe/${preurl}`);
			setFilter({
				...filter,
				totalPages: data.totalPages,
			});
			setData(data.content);
		};
		getData();
	}, []);

	useEffect(() => {
		let preurl = '';
		if (filter.status !== 'not-recommended') {
			preurl = `stylelist?${filter.status}&size=${filter.pageSize}&page=${filter.current}`;
		} else {
			preurl = `${filter.status}?size=${filter.pageSize}&page=${filter.current}`;
		}
		const getData = async () => {
			const { data } = await api.get(`subscribe/${preurl}`);
			setData(data.content);
		};
		getData();
	}, [filter]);

	return (
		<div className="pl20 pr20">
			<div className="pt20 pb20">
				<Radio.Group
					value={filter.status}
					onChange={(e) => {
						setFilter({ ...filter, status: e.target.value });
					}}
				>
					<Radio value={'not-recommended'}>신규접수</Radio>
					<Radio value={'recommended=true'}>진행중</Radio>
					<Radio value={'recommended=false'}>완료</Radio>
				</Radio.Group>
			</div>

			<div className="mb50">
				<Table
					pagination={false}
					dataSource={data}
					rowKey="id"
					columns={columns}
					toolBarRender={() => [
						<div className="mb10">
							<div className="mb20">
								<Title level={4}>스타일 테스트 리스트</Title>
							</div>
							<div className="d-flex">
								<Radio.Group>
									<Radio value={'not-recommended'}>신규 접수</Radio>
									<Radio value={'false'}>할당 됨</Radio>
									<Radio value={'true'}>완료</Radio>
								</Radio.Group>
							</div>
						</div>,
					]}
				/>
			</div>

			<div className="d-flex x-end">
				<Pagination
					defaultPageSize={20}
					current={filter.current + 1}
					total={filter.totalPages}
					onChange={(e) => {
						setFilter({ ...filter, current: e - 1 });
					}}
				/>
			</div>
		</div>
	);
};

export default StyleTest;
