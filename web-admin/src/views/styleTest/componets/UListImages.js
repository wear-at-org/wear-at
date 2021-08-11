import React from 'react';
import { Image, Typography, Row, Col, Divider } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { defaultImgBase64 } from 'utils';
const { Title } = Typography;

const uListImages = ({ item }) => {
	if (item)
		return (
			<>
				<div className="mb30">
					<Title level={4}>{item.title}</Title>
					<Row>
						{item.answer.map((i) => {
							return (
								<Col span={4} className="mr10" key={uuidv4()}>
									<Image width={100} height={100} src={i.url} fallback={defaultImgBase64} />
								</Col>
							);
						})}
					</Row>
				</div>
				<Divider />
			</>
		);

	return null;
};

export default uListImages;
