import React from 'react';
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const UListBody = ({ item }) => {
	if (item)
		return (
			<>
				<Divider />
				<div className="w-250 mr30">
					<Title level={4} className="mr30">
						노출하고 싶은 곳
					</Title>
				</div>
				<div className="d-flex y-center">
					<Title level={4} className="mr30">
						{item.answer.length === 0 ? <div>없음</div> : <></>}
						{item.answer.map((i, index) => {
							if (i.queryId === 4) {
								return <span key={index + 'yy'}>{i.title},</span>;
							} else {
								return null;
							}
						})}
					</Title>
				</div>
				<Divider />
				<div className="w-250 mr30">
					<Title level={4} className="mr30">
						가리고 싶은 곳
					</Title>
				</div>
				<div className="d-flex y-center">
					<Title level={4} className="mr30">
						{item.answer.length === 0 ? <div>없음</div> : <></>}
						{item.answer.map((i, index) => {
							if (i.queryId === 5) {
								return <span key={index + 'nn'}>{i.title},</span>;
							} else {
								return null;
							}
						})}
					</Title>
				</div>
			</>
		);

	return null;
};

export default UListBody;
