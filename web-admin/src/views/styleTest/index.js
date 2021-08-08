import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Radio } from 'antd';
import { Typography } from 'antd';
import api from 'api';
import { columns } from './componets/ListDataInfo';

const { Title } = Typography;

const StyleTest = () => {
	return (
		<ProTable
			pagination={{
				pageSize: 50,
			}}
			columns={columns}
			request={async (params = {}, sort, filter) => {
				const { data } = await api.get(
					`subscribe/not-recommended?size=${params.pageSize}&page=${
						params.current - 1
					}`,
				);
				console.log(data.content);
				if (data.content.length > 0) {
					return {
						data: data.content,
						total: data.totalElements,
						success: true,
					};
				} else {
					return { data: [], success: false };
				}
			}}
			search={false}
			toolBarRender={() => [
				<div className="mb10">
					<div className="mb20">
						<Title level={4}>스타일 테스트 리스트</Title>
					</div>
					<div className="d-flex">
						<Radio.Group>
							<Radio value={1}>신규 접수</Radio>
							<Radio value={2}>할당 됨</Radio>
							<Radio value={3}>완료</Radio>
						</Radio.Group>
					</div>
				</div>,
			]}
		/>
	);
};

export default StyleTest;
