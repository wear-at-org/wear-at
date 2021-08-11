import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;
const UList2depItems = ({ item }) => {
	if (item)
		return (
			<>
				<Title level={4}>{item.title}</Title>
				{item.answer.map((i, index) => {
					return (
						<div className="d-flex y-center" key={index + 'UList2depItems'}>
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									{i.queryTitle}
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									{i.title}
								</Title>
							</div>
						</div>
					);
				})}
			</>
		);

	return null;
};

export default UList2depItems;
