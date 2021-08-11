import React from 'react';
import { Divider, Typography } from 'antd';

const { Title } = Typography;
const UListItems = ({ item }) => {
	if (item)
		return (
			<>
				<Title level={4}>{item.title}</Title>
				<div className="mt50 mb50 pr99">
					{item.answer.map((a, i) => {
						return (
							<div className="need-style-container mb20 mt20" key={i + 'UListItems'}>
								<span className="bold">{a.title} </span>입을 옷이 필요해요
							</div>
						);
					})}
				</div>
				<Divider />
			</>
		);

	return null;
};

export default UListItems;
